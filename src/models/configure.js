import Sequelize from 'sequelize';
import network from '../config/network.js';

const sequelize = new Sequelize(
  `mysql://${network.DB_USER}:${network.DB_PASSWORD}@${network.DB_DOMAIN}:${network.DB_PORT}/${network.DB_NAME}`,
  {
    dialect: 'mysql',
    dialectOptions: {},
    timezone: '+05:30',
    retry: {
      max: 5,
      timeout: 1000,
      match: [/ECONNREFUSED/, /ETIMEDOUT/, /EHOSTUNREACH/, /EAI_AGAIN/],
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
