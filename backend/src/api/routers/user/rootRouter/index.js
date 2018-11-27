import {createUser} from './create'
import {data} from './data'
import {checkEmail} from "./check-email"
import {activateUser} from "./activate"
import {sendActivation} from "./send-activation";
import {login} from "./login"
import {beforeUserSave, User} from '../models'
import {decodeToken} from "../../utils/decodeToken";
import express from "express";

export const rootRouter = express.Router();

rootRouter.route('/create').post(beforeUserSave, createUser(User));

rootRouter.route('/check-email/:email').get(checkEmail(User));

rootRouter.route('/activate').post(activateUser(User));

rootRouter.route('/send-activation').post(sendActivation(User));

rootRouter.route('/login').post(login(User));

rootRouter.route('/data').get(decodeToken, data(User));
