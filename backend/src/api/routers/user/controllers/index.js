import {createUser} from './create'
import {data} from './data'
import {checkEmail} from "./check-email"
import {activateUser} from "./activate"
import {sendActivation} from "./send-activation";
import {login} from "./login"
import {beforeUserSave, decodeToken, User} from '../models'
import express from "express";

export const mainRouter = express.Router();

mainRouter.route('/create').post(beforeUserSave, createUser(User));

mainRouter.route('/check-email/:email').get(checkEmail(User));

mainRouter.route('/activate').post(activateUser(User));

mainRouter.route('/send-activation').post(sendActivation(User));

mainRouter.route('/login').post(login(User));

mainRouter.route('/data/:token').get(decodeToken, data(User));
