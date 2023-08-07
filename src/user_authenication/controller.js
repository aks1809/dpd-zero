import sendHttpResponse from '../response/send_http_response.js';
import { loginService, registerService } from './service.js';

export const login = async (req, res) => {
  try {
    const loginRes = await loginService(req, res);
    sendHttpResponse({
      res,
      success: true,
      statusCode: 200,
      message: 'Access token generated successfully.',
      data: loginRes,
    });
  } catch (error) {
    console.log(
      '------user_authentication controller.js login error-------',
      error
    );
    sendHttpResponse({ res, statusCode: 500, success: false });
  }
};

export const register = async (req, res) => {
  try {
    const [created, data, code, message] = await registerService(req.body);
    if (created) {
      sendHttpResponse({
        res,
        statusCode: 200,
        code,
        message,
        success: true,
        data,
      });
    } else {
      sendHttpResponse({ res, statusCode: 400, code, message, success: false });
    }
  } catch (error) {
    console.log(
      '------user_authentication controller.js register error-------',
      error
    );
    sendHttpResponse({ res, statusCode: 500, success: false });
  }
};
