const express = require('express')

const usuariosRouter = require('./usuarios')
const itensRouter = require('./itens')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('App online!')
})

router.use('/usuarios', usuariosRouter)
router.use('/itens', itensRouter)

module.exports = router