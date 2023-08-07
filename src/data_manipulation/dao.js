import initModels from '../models/init-models.js';

const models = initModels();

export const createDataDao = async ({ key, value }) =>
  await models.data.findOrCreate({
    where: {
      key,
    },
    defaults: {
      key,
      value,
    },
  });

export const getDataDao = async (key) => await models.data.findByPk(key);

export const updateDataDao = async ({ key, value }) =>
  await models.data.update(
    {
      value,
    },
    {
      where: {
        key,
      },
    }
  );

export const deleteDataDao = async (key) =>
  await models.data.destroy({
    where: {
      key,
    },
  });
