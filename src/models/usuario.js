const usuario = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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
        }
    }, {
        tableName: 'usuario',
        timestamps: false 
    });
    return Usuario;
}

module.exports = usuario;