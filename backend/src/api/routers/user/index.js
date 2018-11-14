import express from 'express'
import userController from './controllers'
import {beforeUserSave} from './models'
import {passwordRouter} from "./password";

export const userRouter = express.Router();

userRouter.use('/password', passwordRouter);

userRouter.route('/create').post(beforeUserSave, userController.createUser);

userRouter.route('/check-email').get(userController.checkEmail);

userRouter.route('/activate').post(userController.activateUser);

userRouter.route('/resend-activation').post(userController.resendActivation);

userRouter.route('/login').post(userController.login);
