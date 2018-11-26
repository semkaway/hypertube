import express from 'express'
import {pendingEmail} from "./pending-email";
import {self} from "./self";
import {User} from "../models";

export const deleteRouter= express.Router();

deleteRouter.route('/pending-email').delete(pendingEmail(User));

deleteRouter.route('/self').delete(self(User));
