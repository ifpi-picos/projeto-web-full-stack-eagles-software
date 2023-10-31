const { item } = require('../models');


class ItemService{
    constructor(ItemModel){
        this.item = ItemModel
    }

    async get(){
        const itens = await item.findAll()
        return itens
    }

    async adicionar(itemDTO){
        // verifica se o item já existe
        const item = await this.item.findOne({
            where: {
                detalhes: itemDTO.detalhes
            }
        })
        if(item != null){
            throw new Error('Já existe um item cadastrado com esses detalhes!')
        }
        try{
        await this.item.create(itemDTO)
        }catch(erro){
            console.error(erro.message)
            throw erro

        }
    }

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
}

module.exports = ItemService