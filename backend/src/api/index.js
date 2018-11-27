import express from 'express'
import {userRouter} from './routers/user'
import {movieRouter} from './routers/movie'
import {decodeToken} from './routers/utils/decodeToken'

export const restRouter = express.Router();

restRouter.use('/user', userRouter);

restRouter.use('/movie', decodeToken, movieRouter);

const axios = require('axios');
restRouter.route('/movies').get((req, res, next) => axios.get('https://tv-v2.api-fetch.website/movies').then(data => res.json(data.data)).catch(err => next(err)));
restRouter.route('/movies/:page').get((req, res, next) => axios.get('https://tv-v2.api-fetch.website/movies/' + req.params.page, {params: {sort: req.query.sort,order: -1}}).then(data => res.json(data.data)).catch(err => next(err)));
