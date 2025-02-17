import { Router } from 'express';
import accountRoutes from './lib/accounts/accounts.routes.js';

const router = Router();
router.use('/accounts', accountRoutes);

export default router;
