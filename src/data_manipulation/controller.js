import {
  createDataService,
  deleteDataService,
  getDataService,
  updateDataService,
} from './service.js';
import sendHttpResponse from '../response/send_http_response.js';

export const createData = async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || key.length === 0 || key.length > 100) {
      return sendHttpResponse({
        res,
        statusCode: 400,
        success: false,
        code: 'INVALID_KEY',
        message: 'The provided key is not valid or missing.',
      });
    }
    if (!value || value.length === 0 || value.length > 100) {
      return sendHttpResponse({
        res,
        statusCode: 400,
        success: false,
        code: 'INVALID_VALUE',
        message: 'The provided value is not valid or missing.',
      });
    }
    const data = await createDataService({ key, value });
    if (!data) {
      return sendHttpResponse({
        res,
        statusCode: 409,
        success: false,
        code: 'KEY_EXISTS',
        message:
          'The provided key already exists in the database. To update an existing key, use the update API.',
      });
    }
    return sendHttpResponse({
      res,
      success: true,
      statusCode: 200,
      message: 'Data stored successfully.',
      data: {},
    });
  } catch (error) {
    console.log(
      '------data_manipulation controller.js createData error-------',
      error
    );
    return sendHttpResponse({ res, statusCode: 500, success: false });
  }
};

export const getData = async (req, res) => {
  try {
    const { key } = req.params;
    const data = await getDataService(key);
    if (!data) {
      return sendHttpResponse({
        res,
        statusCode: 404,
        success: false,
        code: 'KEY_NOT_FOUND',
        message: 'The provided key does not exist in the database.',
      });
    }
    return sendHttpResponse({
      res,
      success: true,
      statusCode: 200,
      message: 'Data found.',
      data,
    });
  } catch (error) {
    console.log(
      '------data_manipulation controller.js getData error-------',
      error
    );
    return sendHttpResponse({ res, statusCode: 500, success: false });
  }
};

export const updateData = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const [data] = await updateDataService({ key, value });
    if (data === false) {
      return sendHttpResponse({
        res,
        statusCode: 404,
        success: false,
        code: 'KEY_NOT_FOUND',
        message: 'The provided key does not exist in the database.',
      });
    }
    return sendHttpResponse({
      res,
      success: true,
      statusCode: 200,
      message: 'Data updated successfully.',
      data: {},
    });
  } catch (error) {
    console.log(
      '------data_manipulation controller.js updateData error-------',
      error
    );
    return sendHttpResponse({ res, statusCode: 500, success: false });
  }
};

export const deleteData = async (req, res) => {
  try {
    const { key } = req.params;
    const data = await deleteDataService(key);
    if (!data) {
      return sendHttpResponse({
        res,
        statusCode: 404,
        success: false,
        code: 'KEY_NOT_FOUND',
        message: 'The provided key does not exist in the database.',
      });
    }
    return sendHttpResponse({
      res,
      success: true,
      statusCode: 200,
      message: 'Data deleted successfully.',
      data: {},
    });
  } catch (error) {
    console.log(
      '------data_manipulation controller.js deleteData error-------',
      error
    );
    return sendHttpResponse({ res, statusCode: 500, success: false });
  }
};
