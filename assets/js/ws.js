var ws = null;

$(function($) {
	
	ws = new WebSocket(ws_url);

	ws.onopen = function(e) {
	    
	    // Entrando no cannal
	    ws.send(JSON.stringify({acao: 'entrar', login: usuario_login, senha: usuario_senha, canal: canal_nome}));
	};
	
	ws.onmessage = function(e) {
		
		// Decodificando retorno
		var dados = JSON.parse(e.data);
		
		// Se houver ação
		if (dados.acao != null)
		{
			// Definindo ação
			switch (dados.acao)
			{
				// Nova mensagem
			    case "mensagem":
			    
			    	$('#mensagem ul').prepend($('<li class="' + dados.estilo + '">' + sprintf(mensagem_formato, dados.usuario.imagem, dados.usuario.nome, dados.usuario.login, $.format.date(dados.data.sec*1000, 'dd/MM/yyyy HH:mm:ss'), dados.texto) + '</li>').fadeIn('slow'));
					break;
					
				// Mudança usuário
				case "usuario":
				
					// Usuários
		    		$('#usuario ul').empty();
		    
					$.each(dados.clientes, function() {
			       		$('#usuario ul').append($('<li>' + sprintf(usuario_formato, this.usuario.imagem, this.usuario.nome, this.usuario.login, this.usuario.login) + '</li>'));
			        });
			        
			        break;
			}
		}

	};
	
	// Enviar mensagem
    $('#nova_mensagem').bind('keypress', function(e) {
       
       	// Se pressionado ENTER
        if (e.keyCode == 13)
        {
        	// Salvando mensagem
            ws.send(JSON.stringify({acao: 'enviar_mensagem', texto: $('#nova_mensagem').val(), canal: canal_nome}));
            
            // Limpando
            $('#nova_mensagem').val('');
        }
        
    });
		
});
