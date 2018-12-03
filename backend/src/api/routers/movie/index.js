import express from "express";
import {User} from "../user/models";
import {watched} from "./watched";
import {stream} from "./stream";
import {one} from "./one";
import {decodeToken} from "../utils/decodeToken";
import {comment} from "./comment";
import {subtitle} from './subtitle'

export const movieRouter = express.Router();

movieRouter.route('/watched').get(decodeToken, watched);

movieRouter.route('/one/:id').get(decodeToken, one(User));

movieRouter.route('/stream/:id').get(stream(User));

movieRouter.route('/comment').post(decodeToken, comment);

movieRouter.route('/subtitle').post(subtitle)
