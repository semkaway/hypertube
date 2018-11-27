import express from 'express'
import {rootRouter} from './rootRouter'
import {passwordRouter} from "./password";
import {oauthRouter} from "./oauth";
import {changeRouter} from "./change";
import {decodeToken} from "../utils/decodeToken";
import {addRouter} from "./add";
import {deleteRouter} from "./delete";

export const userRouter = express.Router();

userRouter.use(rootRouter);

userRouter.use('/password', passwordRouter);

userRouter.use('/oauth', oauthRouter);

userRouter.use('/change', decodeToken, changeRouter);

userRouter.use('/add', decodeToken, addRouter);

userRouter.use('/delete', decodeToken, deleteRouter);
