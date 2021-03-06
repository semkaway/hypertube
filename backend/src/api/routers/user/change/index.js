import express from 'express'
import {locale} from "./locale";
import {image} from "./image";
import {email} from "./email";
import {data} from "./data";
import {User} from "../models";

export const changeRouter = express.Router();

changeRouter.route('/locale').put(locale);

changeRouter.route('/image').put(image);

changeRouter.route('/email').put(email(User));

changeRouter.route('/data').put(data);
