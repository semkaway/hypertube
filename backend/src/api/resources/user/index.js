import express from 'express'
import userController from './user.controller'
import {beforeSaveValidation} from './user.validation'

export const userRouter = express.Router();

userRouter.route('/create').post(
    beforeSaveValidation,
    userController.createUser);

userRouter.route('/check-email-exist').post(userController.emailExist);

//userRouter.route('/activate').post(userController.updateOne);
