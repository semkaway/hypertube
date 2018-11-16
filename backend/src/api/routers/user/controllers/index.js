import {createUser} from './create'
import {checkEmail} from "./check-email"
import {activateUser} from "./activate"
import {resendActivation} from "./resend-activation";
import {login} from "./login"
import {beforeUserSave, User} from '../models'
import express from "express";

export const mainRouter = express.Router();

mainRouter.route('/create').post(beforeUserSave, createUser(User));

mainRouter.route('/check-email/:email').get(checkEmail(User));

mainRouter.route('/activate').post(activateUser(User));

mainRouter.route('/resend-activation').post(login(User));

mainRouter.route('/login').post(resendActivation(User));
