import { DataTypes } from 'sequelize';
import sequelize from './configure.js';
import _users from './users.js';
import _data from './data.js';

function initModels() {
  const users = _users(sequelize, DataTypes);
  const data = _data(sequelize, DataTypes);

  return {
    users,
    data,
  };
}

export default initModels;
