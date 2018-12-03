import express from 'express'
import {restRouter} from './api'
import {dbConnect} from './db'
import config from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
// Declare an app from express
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({limit: '500kb', extended: true}));
app.use(bodyParser.json({limit: '500kb'}));

dbConnect();

app.set('config', config);

// Logger to console
app.use(function (req, res, next) {
    var d = new Date;
    var time = '['+ d.getHours() + ':' + d.getMinutes() + ']';
    var method = req.method;
    var url = 'URL: ' + req.originalUrl;
    var logger = time + '   ' + method + '   ' + url;
    console.log(logger) 
    next();
});

// setup basic routing for index route
app.use('/api', restRouter);

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
