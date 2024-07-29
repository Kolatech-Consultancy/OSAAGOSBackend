import { Router } from 'express';
import { login, create } from '../controllers/authController.js';
import { validateRequestBody } from '../middleware/system.js';
import { validateLogin, validateCreateUser } from '../validators/user.js';
const router = Router();

router.post('/signup', validateRequestBody(validateCreateUser), create);
router.post('/login', validateRequestBody(validateLogin), login);
export default router;
