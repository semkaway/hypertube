import express from 'express'
import {userRouter} from './routers/user'
import {movieRouter} from './routers/movie'

export const restRouter = express.Router();

restRouter.use('/user', userRouter);

restRouter.use('/movie', movieRouter);
