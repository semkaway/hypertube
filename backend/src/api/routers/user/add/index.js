import express from 'express'
import {email} from "./email";
import {password} from "./password";
import {User} from "../models";

export const addRouter = express.Router();

addRouter.route('/email').post(email(User));

addRouter.route('/password').post(password(User));
