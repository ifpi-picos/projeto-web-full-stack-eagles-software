const { usuario } = require('../models');


class UsuarioService{
    constructor(UsuarioModel){
        this.usuario = UsuarioModel
    }

    async get(){
        const usuarios = await usuario.findAll()
        return usuarios
    }

    async adicionar(usuarioDTO){
        // verifica se usuário já existe
        const usuario = await this.usuario.findOne({
            where: {
                email: usuarioDTO.email
            }
        })
        if(usuario != null){
            throw new Error('Já existe um usuário cadastrado com esse e-mail!')
        }
        try{
        await this.usuario.create(usuarioDTO)
        }catch(erro){
            console.error(erro.message)
            throw erro

        }
    }

    async atualizar(usuarioId, updatedUsuario) {
        try {
            const usuario = await this.usuario.findByPk(usuarioId);

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            await usuario.update(updatedUsuario);

            return usuario;
        } catch (erro) {
            console.error(erro.message);
            throw erro;
        }
    }

    async excluir(usuarioId) {
        try {
            const usuario = await this.usuario.findByPk(usuarioId);

            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            await usuario.destroy();

            return 'Usuário excluído com sucesso!';
        } catch (erro) {
            console.error(erro.message);
            throw erro;
        }
    }
}

module.exports = UsuarioService