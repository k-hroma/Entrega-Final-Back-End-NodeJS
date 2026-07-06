import { Router } from 'express';
import { login } from '../controllers/authControllers.js';

const authRouter = Router();

authRouter.post("/login", login );

export { authRouter };