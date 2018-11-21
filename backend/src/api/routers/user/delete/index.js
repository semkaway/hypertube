import express from 'express'
import {pendingEmail} from "./pending-email";
import {decodeToken, User} from "../models";

export const deleteRouter= express.Router();

deleteRouter.route('/pending-email/:token').delete(decodeToken, pendingEmail(User));
