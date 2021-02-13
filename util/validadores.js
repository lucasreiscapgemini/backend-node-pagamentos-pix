module.exports = app =>{


    let mensagem = [];

    function validarPagamento(value){
        let erros = []
        !value.nome.trim() ? erros.push('nome: inválido') : null
        !value.cpf || !(value.cpf.length == 11) || isNaN(value.cpf) ? erros.push('cpf: inválido') : null
        !value.banco.trim() ? erros.push('banco: Obrigatório'): null,
        !value.chave_pix.trim() ? erros.push('chave_pix: inválida'): null,
        !value.valor && !isNaN(value.valor) ? erros.push('valor: inválido'): null
        return erros
    }
    
    function setMensagem(msg){
        mensagem.push(msg)
    }

    function getMensagem(){
        return mensagem;
    }

    function validarCadastro(dados){

        const cpf = validarCpf(dados.cpf)
        const senha = validarSenha(dados)
        const chave = validarChave(dados.chave_pix)

        const mensagems = getMensagem()
        mensagem = []

        return {
           valido: cpf &&  senha && chave,
           msg: mensagems
        }
    }

    function validarSenha(dados){
        if(dados.senha == dados.confirmarSenha){
            return true
        }else{
            setMensagem('Senhas não conferem.')
            return false
        }
    }


    function validarCpf(value){
        if(value && value.length == 11 && !isNaN(value)){
            return true
        }else{
            setMensagem('CPF inválido')
            return false
        }
    }

    function validarChave(value){
        if(value && value.trim()){
            return true
        }else{
            setMensagem('Informe sua chave pix')
            return false
        }
    }

    return { validarPagamento , validarCadastro }
}


