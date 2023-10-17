import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: '1234',
  database: 'Eagles_Software',
  port: 5432,
});

export default sequelize;
