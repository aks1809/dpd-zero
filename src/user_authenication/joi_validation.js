import { Joi } from 'express-validation';
import sendHttpResponse from '../response/send_http_response.js';

const getErrorCode = (field_name, validator) => {
  if (validator === 'login') {
    return [
      'MISSING_FIELDS',
      'Missing fields. Please provide both username and password.',
    ];
  }
  switch (field_name) {
    case 'password':
      return [
        'INVALID_PASSWORD',
        'The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.',
      ];
    case 'age':
      return [
        'INVALID_AGE',
        'Invalid age value. Age must be a positive integer.',
      ];
    case 'gender':
      return [
        'GENDER_REQUIRED',
        'Gender field is required. Please specify the gender (e.g., male, female, non-binary).',
      ];
    default:
      return [
        'INVALID_REQUEST',
        'Invalid request. Please provide all required fields: username, email, password, full_name.',
      ];
  }
};

const Validators = {
  login: Joi.object({
    username: Joi.string().required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required!',
    }),
    password: Joi.string().required().messages({
      'string.base':
        'Password must contain a mix of uppercase and lowercase letters, numbers, and special characters.',
      'string.empty':
        'Password must contain a mix of uppercase and lowercase letters, numbers, and special characters.',
    }),
  }),

  register: Joi.object({
    username: Joi.string().required().messages({
      'string.base': 'Username must be a string',
      'string.empty': 'Username is required',
    }),
    full_name: Joi.string().required().messages({
      'string.base': 'Full_Name must be a string',
      'string.empty': 'Full_Name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required!',
      'string.email': 'Please provide a valid email!',
    }),
    password: Joi.string()
      .min(8)
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      )
      .messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base':
          'Password must contain a mix of uppercase and lowercase letters, numbers, and special characters',
      }),
    age: Joi.number().integer().positive().messages({
      'number.base': 'Invalid age value. Age must be a positive integer.',
      'number.integer': 'Invalid age value. Age must be a positive integer.',
      'number.positive': 'Invalid age value. Age must be a positive integer.',
    }),
    gender: Joi.string()
      .valid('male', 'female', 'non-binary')
      .required()
      .messages({
        'string.base':
          'Gender field is required. Please specify the gender (e.g., male, female, non-binary).',
        'any.required':
          'Gender field is required. Please specify the gender (e.g., male, female, non-binary).',
        'any.only':
          'Gender field is required. Please specify the gender (e.g., male, female, non-binary).',
      }),
  }),
};

const validationMiddleware = (validator) => {
  if (!Validators.hasOwnProperty(validator)) throw new Error(`'${validator}' validator is not exist`);

  return async (req, res, next) => {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      return next();
    } catch (err) {
      if (err.isJoi) {
        const [err_code, err_message] = getErrorCode(
          err?.details[0]?.path[0],
          validator
        );
        return sendHttpResponse({
          res,
          statusCode: 422,
          success: false,
          message: err_message,
          code: err_code,
        });
      }
      return sendHttpResponse({ res, statusCode: 500, success: false });
    }
  };
};

export default validationMiddleware;
