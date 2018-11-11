import express from 'express'
import userController from './controllers'
import {beforeUserSave} from './models'

export const userRouter = express.Router();

userRouter.route('/create').post(beforeUserSave, userController.createUser);

userRouter.route('/check-email-exist').post(userController.emailExist);

//userRouter.route('/activate').post(userController.updateOne);
