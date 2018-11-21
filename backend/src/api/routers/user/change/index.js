import express from 'express'
//import {tokenGenerate} from "./token-generate";
//import {tokenCheck} from "./token-check";
import {locale} from "./locale";
import {User} from "../models";

export const changeRouter = express.Router();

changeRouter.route('/locale').put(locale(User));

//changeRouter.route('/token-check/:token').get(tokenCheck(User));

//changeRouter.route('/change').post(change(User));
