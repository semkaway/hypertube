import express from "express";
import {User} from "../user/models";
import {watched} from "./watched";
import {one} from "./one";

export const movieRouter = express.Router();

movieRouter.use('/watched', watched(User));

movieRouter.use('/one/:id', one(User));
