import express from 'express'
import {mainRouter} from './controllers'
import {passwordRouter} from "./password";
import {oauthRouter} from "./oauth";
import {changeRouter} from "./change";
import {decodeToken} from "./models";
import {addRouter} from "./add";
import {deleteRouter} from "./delete";

export const userRouter = express.Router();

userRouter.use(mainRouter);

userRouter.use('/password', passwordRouter);

userRouter.use('/oauth', oauthRouter);

userRouter.use('/change', decodeToken, changeRouter);

userRouter.use('/add', decodeToken, addRouter);

userRouter.use('/delete', decodeToken, deleteRouter);
