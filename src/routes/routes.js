import { Router } from 'express';
import HTTPStatus from 'http-status';

import { login, register } from '../user_authenication/controller.js';
import validationMiddleware from '../user_authenication/joi_validation.js';
import { authJwt, authLocal } from '../user_authenication/middleware.js';

import DataRoutes from './data.routes.js';

const routes = new Router();

routes.post('/token', validationMiddleware('login'), authLocal, login);

routes.post('/register', validationMiddleware('register'), register);

routes.use('/data', authJwt, DataRoutes);

routes.all('*', (req, res, next) => {
  console.error(req.originalUrl);
  next(console.error('Route Not Found!', HTTPStatus.NOT_FOUND, true));
});

export default routes;
