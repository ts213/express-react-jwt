import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware.js';

export const router = new Router({ caseSensitive: true });

router.post('/reg',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);

// router.post('/login', userController.login);
// router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/test', (req, res, n) => {
  res.json(123);
});
