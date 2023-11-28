const item = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
        achadoPor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false
        },
        armazenado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        detalhes: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem_URL: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    }, {
        tableName: 'item'
    })

    return Item
}

module.exports = item