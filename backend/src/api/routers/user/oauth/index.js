import express from 'express'
import {intra} from "./intra";
import {User} from "../models";

export const oauthRouter = express.Router();

oauthRouter.route('/intra').post(intra(User));

