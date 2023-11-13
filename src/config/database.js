const { DB_DIALECT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD
};