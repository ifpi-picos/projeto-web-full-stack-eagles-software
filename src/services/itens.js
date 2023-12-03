const { item } = require('../models');
const { Sequelize } = require('sequelize');


class ItemService{
    constructor(ItemModel){
        this.item = ItemModel
    }

    async get(){
        const itens = await item.findAll()
        return itens
    }

    //Adicionar Item
    async adicionar(itemDTO){
        try{
            await this.item.create(itemDTO);
        } catch(erro) {
            console.error(erro.message);
            throw erro;
        }
    }

    //Atualizar Item
    async atualizar(itemId, updatedItem) {
        try {
            const item = await this.item.findByPk(itemId);

            if (!item) {
                throw new Error('Item não encontrado');
            }

            await item.update(updatedItem);

            return item;
        } catch (erro) {
            console.error(erro.message);
            throw erro;
        }
    }

    //Excluir item
    async excluir(itemId) {
        try {
            const item = await this.item.findByPk(itemId);

            if (!item) {
                throw new Error('Item não encontrado');
            }

            await item.destroy();

            return 'Item excluído com sucesso!';
        } catch (erro) {
            console.error(erro.message);
            throw erro;
        }
    }

    //Pesquisa que retorna itens com base no campo "AchadoPor"
    async pesquisarPorAchadoPor(nome) {
        try {
            const itens = await this.item.findAll({
                where: {
                    achadoPor: {
                        [Sequelize.Op.iLike]: `%${nome}%`
                    }
                }
            });
            return itens;
        } catch (erro) {
            throw new Error(`Erro ao pesquisar por achadoPor: ${erro.message}`);
        }
    }
    
    //Pesquisa que retorna itens com base no campo "Armazenado"
    async pesquisarPorArmazenado(armazenado) {
        try {
            const itens = await this.item.findAll({
                where: {
                    armazenado: {
                        [Sequelize.Op.iLike]: `%${armazenado}%`
                    }
                }
            });
            return itens;
        } catch (erro) {
            throw new Error(`Erro ao pesquisar por armazenado: ${erro.message}`);
        }
    }

    //Pesquisa que retorna itens com base no campo "Local"
    async pesquisarPorLocal(local) {
        try {
            const itens = await this.item.findAll({
                where: {
                    local: {
                        [Sequelize.Op.iLike]: `%${local}%`
                    }
                }
            });
            return itens;
        } catch (erro) {
            throw new Error(`Erro ao pesquisar por local: ${erro.message}`);
        }
    }    

    //Pesquisa que retorna itens com base no campo "Detalhes"
    async pesquisarPorDetalhes(termo) {
        try {
            const itens = await this.item.findAll({
                where: {
                    detalhes: {
                        [Sequelize.Op.iLike]: `%${termo}%`
                    }
                }
            });
            return itens;
        } catch (erro) {
            throw new Error(`Erro ao pesquisar por detalhes: ${erro.message}`);
        }
    }
}

module.exports = ItemService