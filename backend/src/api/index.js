import express from 'express'
import {userRouter} from './routers/user'

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
