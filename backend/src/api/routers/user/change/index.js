import express from 'express'
import {locale} from "./locale";
import {image} from "./image";
import {User} from "../models";

export const changeRouter = express.Router();

changeRouter.route('/locale').put(locale(User));

changeRouter.route('/image').put(image(User));
