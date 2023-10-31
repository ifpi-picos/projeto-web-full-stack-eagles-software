const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

const Usuario = require('./usuario')
const Item = require('./item')

const usuario = Usuario(sequelize, Sequelize.DataTypes)
const item = Item(sequelize, Sequelize.DataTypes)

const db = {
    usuario,
    item,
    sequelize
}

module.exports = db