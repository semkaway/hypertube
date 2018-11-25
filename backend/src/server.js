import express from 'express'
import {restRouter} from './api'
import {dbConnect} from './db'
import config from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
// Declare an app from express
const app = express();

app.use(bodyParser.urlencoded({limit: '500kb', extended: true}));
app.use(bodyParser.json({limit: '500kb'}));
app.use(cors());

dbConnect();

app.set('config', config);

// setup basic routing for index route
app.use('/api', restRouter);

// catch all
app.all('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.append('Access-Control-Allow-Origin', ['*']);
    res.status(500).json({
        "error": {
            "message": error.message
        }
    });
});

export default app;
