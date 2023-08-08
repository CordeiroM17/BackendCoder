import express from 'express';
import passport from 'passport';
import { userController } from '../controllers/users.controller.js';

export const userRouter = express.Router();

userRouter.get('/session', userController.sessionInformation);

userRouter.get('/register', userController.registerGet);
userRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), userController.registerPost);

userRouter.get('/login', userController.loginGet);
userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), userController.loginPost);

userRouter.get('/logout', userController.logout);

userRouter.get('/failregister', userController.failRegister);

userRouter.get('/faillogin', userController.failLogin);

userRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

userRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/' }), userController.githubLogin);
