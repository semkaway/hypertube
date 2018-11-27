import express from "express";
import {User} from "../user/models";
import {watched} from "./watched";

export const movieRouter = express.Router();

movieRouter.use('/watched', watched(User));
