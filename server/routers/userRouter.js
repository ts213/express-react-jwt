import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { loginSchema, refreshTokenSchema, registrationSchema, activationLinkSchema } from '../schema/validationSchema.js';
import { validateRequest } from './utils.js';

export const router = new Router({ caseSensitive: true });

router.post('/reg',
  validateRequest(registrationSchema, ['body']),
  userController.registration
);

router.post('/login',
  validateRequest(loginSchema, ['body']),
  userController.login
);

router.post('/logout',
  validateRequest(refreshTokenSchema, ['cookies']),
  userController.logout
);

router.get('/activate/:activationLink',
  validateRequest(activationLinkSchema, ['params']),
  userController.activate
);

router.get('/refresh',
  validateRequest(refreshTokenSchema, ['cookies']),
  userController.refresh
);

router.get('/users',
  authMiddleware,
  userController.getUsers
);
