const usuario = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, {
        tableName: 'usuario'
    })

    return Usuario
}

module.exports = usuario