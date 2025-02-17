import { Router } from 'express';
import createAccount from './controllers/createAccount.controller.js';
import login from './controllers/login.controller.js';

const accountRoutes = Router();
accountRoutes.post('/create', createAccount);
accountRoutes.get('/login', login);

export default accountRoutes;
