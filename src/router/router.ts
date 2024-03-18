import { Router } from 'express';
import auth from './auth';

/**
 * The router object for handling routes.
 * @remarks
 * This router object is responsible for defining and handling routes in the application.
 * It is an instance of the Express Router class.
 */
export const router: Router = Router();

router.use('/auth', auth);
