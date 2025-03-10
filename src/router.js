import { Router } from 'express';
import accountRoutes from './lib/accounts/accounts.routes.js';
import personRoutes from './lib/persons/persons.routes.js';

const router = Router();
router.use('/accounts', accountRoutes);
router.use('/persons', personRoutes);

export default router;
