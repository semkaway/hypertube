import express from 'express'
import {tokenGenerate} from "./token-generate";
import {tokenCheck} from "./token-check";
import {change} from "./change";
import {User} from "../models";

export const passwordRouter = express.Router();

passwordRouter.route('/token-generate').post(tokenGenerate(User));

passwordRouter.route('/token-check/:token').post(tokenCheck(User));

passwordRouter.route('/change').post(change(User));
