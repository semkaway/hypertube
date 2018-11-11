import express from 'express'
import userController from './controllers'
import {beforeUserSave} from './models'
import {passwordRouter} from "./controllers/password";

export const userRouter = express.Router();

userRouter.use('/password', passwordRouter);

userRouter.route('/create').post(beforeUserSave, userController.createUser);

userRouter.route('/check-email-exist').post(userController.emailExist);

userRouter.route('/activate').post(userController.activateUser);
