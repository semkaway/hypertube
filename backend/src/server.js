import express from 'express'
import {restRouter} from './api'
import {dbConnect} from './db'
import bodyParser from 'body-parser'
import cors from 'cors'
// Declare an app from express
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

dbConnect();
// setup basic routing for index route

app.use('/api', cors(), restRouter);

// catch all
app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        "error": {
            "message": error.message
        }
    });
});

export default app;
