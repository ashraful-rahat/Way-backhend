import { Router } from 'express';
import { registerUser } from '../controller/auth.controller';
import { loginUser } from '../controller/login.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
