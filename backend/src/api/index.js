import express from 'express'
import {userRouter} from './routers/user'
import {streamRouter} from './routers/stream'

export const restRouter = express.Router();

restRouter.use('/user', userRouter);

restRouter.use('/stream', streamRouter);
