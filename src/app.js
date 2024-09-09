const express = require('express')
const routers = require('./api')
const {sequelize} = require('./models')
const cors = require('cors');

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); 

app.use(cors()); 
app.use(express.json());
app.use('/', routers);

sequelize.sync().then(() => {
    console.log('conectado com o banco de dados!')
})

app.listen(3000, () => {
    console.log('App online!')
})

module.exports = app;

//teste