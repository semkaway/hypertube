import express from 'express'
import {pendingEmail} from "./pending-email";
import {self} from "./self";

export const deleteRouter= express.Router();

deleteRouter.route('/pending-email').delete(pendingEmail);

deleteRouter.route('/self').delete(self);
