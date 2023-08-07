import { Op } from 'sequelize';
import initModels from '../models/init-models.js';

const models = initModels();

export const getUser = async (obj) =>
  await models.users.findOne({
    where: {
      ...obj,
    },
  });

export const createUser = async (body) =>
  await models.users.findOrCreate({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.eq]: body.username,
          },
        },
        {
          email: {
            [Op.eq]: body.email,
          },
        },
      ],
    },
    defaults: {
      ...body,
      created_at: new Date().getTime(),
    },
  });
