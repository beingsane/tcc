<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario extends CI_Controller {

	/**
	 * Página principal do usuário, caso não esteja logado, 
	 * carrega página para logar
	 *
	 * @return void
	 */
	public function index()
    {
        if (!$this->login->verificar())
        {
        	$this->js = array('lib/jquery.form.js');
            $this->layout->view('usuario/entrar');
        }
        else
        {
            $this->layout->view('usuario/index');
        }
    }
    
	/**
	 * Loga o usuário no sistema
	 *
	 * @return void
	 */
    public function entrar()
    { 
        if ($this->login->logar($this->input->post('usuario', true), md5($this->input->post('senha', true))))
        {
        	// Setando tecnologia
			$this->session->set_userdata('tecnologia', $this->input->post('tecnologia'));
			
			// Sucesso
        	echo false;
        }
        else
            echo 'Usuário ou senha inválido';
    }
    
	/**
	 * Desloga o usuário do sistema
	 *
	 * @return void
	 */
    public function sair()
    {
        $this->login->logout('usuario');
    }

}

/* End of file usuario.php */
/* Location: ./application/controllers/usuario.php */