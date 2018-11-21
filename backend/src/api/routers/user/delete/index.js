import express from 'express'
import {pendingEmail} from "./pending-email";
import {self} from "./self";
import {decodeToken, User} from "../models";

export const deleteRouter= express.Router();

deleteRouter.route('/pending-email/:token').delete(decodeToken, pendingEmail(User));

deleteRouter.route('/self/:token').delete(decodeToken, self(User));
