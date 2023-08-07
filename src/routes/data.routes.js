import { Router } from 'express';
import {
  createData,
  deleteData,
  getData,
  updateData,
} from '../data_manipulation/controller.js';

const routes = new Router();

routes.get('/:key', getData);

routes.put('/:key', updateData);

routes.post('/', createData);

routes.delete('/:key', deleteData);

export default routes;
