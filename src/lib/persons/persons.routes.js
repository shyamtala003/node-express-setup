import { Router } from 'express';
import getAllPerson from './controllers/getAllPerson.controller.js';

const personRoutes = Router();

personRoutes.get('/', getAllPerson);

export default personRoutes;
