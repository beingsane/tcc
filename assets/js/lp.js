// Quando carregada a página
$(function($) {
	
	// Atualização inicial
	atualizar();
	
});

function atualizar()
{
	// Última mensagem recebida
	var maior_que = $('#mensagem ul li').first().attr('id');
	
	var n = $('#usuario ul li').length;
	var usuario_online = '';
	
	if (n > 0)
	{
		$('#usuario ul li span.usuario_login').each(function(index, value){
			usuario_online += $(this).html() + ((index < n) ? ',' : '');
		});
	}

	// Atualizando
    $.post(base_url + 'canal/lp_atualizar/' + canal_nome, {maior_que: maior_que, usuario_online: usuario_online}, function(data) {
    	
    	// Mensagens
	  	$.each(data.mensagem, function() {
            $('#mensagem ul').prepend($('<li id="' + this._id.$id + '">' + sprintf(mensagem_formato, this.usuario.imagem, this.usuario.nome, this.usuario.login, $.format.date(this.data.sec*1000, 'dd/MM/yyyy HH:mm:ss'), this.texto) + '</li>').fadeIn('slow'));
        });
		
		// Limpando
        $('#usuario ul').html('');
        
        // Usuários
        $.each(data.usuario, function() {
        	$('#usuario ul').append($('<li id="' + this._id.$id + '">' + sprintf(usuario_formato, this.usuario.imagem, this.usuario.nome, this.usuario.login, this.usuario.login) + '</li>'));
        });
		
		// Latência e memória
        $('#latencia').html(data.latencia + 'ms');
        $('#memoria').html(data.memoria + 'mb');
        
        // Continua atualização
        atualizar();
        
	}, 'json');
}