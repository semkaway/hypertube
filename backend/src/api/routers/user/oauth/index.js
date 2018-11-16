import express from 'express'
import {intra} from "./intra";
import {github} from "./github";
import {User} from "../models";

export const oauthRouter = express.Router();

oauthRouter.route('/intra').post(intra(User));

oauthRouter.route('/github').post(github(User));

