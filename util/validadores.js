module.exports = app =>{

    function validarPagamento(value){
        let erros = []
        !value.nome.trim() ? erros.push('nome: Obrigatório') : null
        !value.cpf.trim() ? erros.push('cpf: Obrigatório') : null
        !value.banco.trim() ? erros.push('banco: Obrigatório'): null,
        !value.valor ? erros.push('valor: Obrigatório'): null
        return erros
    }

    return { validarPagamento }
}


