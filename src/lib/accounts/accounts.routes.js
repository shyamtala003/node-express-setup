import { Router } from 'express';
import createAccount from './controllers/createAccount.controller.js';

const accountRoutes = Router();
accountRoutes.post('/create', createAccount);

export default accountRoutes;
