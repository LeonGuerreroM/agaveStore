const express = require('express');
const app = express();
const cors = require('cors');

const config = require('./config');
const routesSetup = require('./routes');
const { logErrors, ormErrorHandler, boomErrorHandler, generalErrorHandler } = require('./utils/middlewares/errorHandlers');

app.use(express.json());
routesSetup(app);

const whitelist = ['http://localhost:3000', '0.0.0.0']; //fully open for demonstration purposes
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error('Access denied'));
        }
    }
}
app.use(cors(options));

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(generalErrorHandler);

require('./utils/auth');

const server = app.listen(config.port, ()  => {
    console.log('listening on port '+config.port);
})

module.exports = { app, server };