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
            allowNull: false
        },
        usuario_IMG: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    }, {
        tableName: 'usuario'
    })

    return Usuario
}

module.exports = usuario