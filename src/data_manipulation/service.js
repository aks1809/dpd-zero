import {
  createDataDao,
  deleteDataDao,
  getDataDao,
  updateDataDao,
} from './dao.js';

export const createDataService = async (inputData) => {
  try {
    const data = await createDataDao(inputData);
    return data[1];
  } catch (error) {
    console.log(
      '------data_manipulation service.js createDataService error-------',
      error
    );
    return [false];
  }
};

export const getDataService = async (key) => {
  try {
    const data = await getDataDao(key);
    return data;
  } catch (error) {
    console.log(
      '------data_manipulation service.js getDataService error-------',
      error
    );
    return [false];
  }
};

export const updateDataService = async ({ key, value }) => {
  try {
    const keyExists = await getDataDao(key);
    if (!keyExists) return [false];
    const data = await updateDataDao({ key, value });
    return data;
  } catch (error) {
    console.log(
      '------data_manipulation service.js updateDataDao error-------',
      error
    );
    return [false];
  }
};

export const deleteDataService = async (key) => {
  try {
    const data = await deleteDataDao(key);
    return data;
  } catch (error) {
    console.log(
      '------data_manipulation service.js deleteDataDao error-------',
      error
    );
    return [false];
  }
};
