const express = require('express');
const app = express();

const config = require('./config');
const routesSetup = require('./routes');
const { logErrors, ormErrorHandler, boomErrorHandler, generalErrorHandler } = require('./utils/middlewares/errorHandlers');

app.use(express.json());
routesSetup(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(generalErrorHandler);

require('./utils/auth');

const server = app.listen(config.port, ()  => {
    console.log('listening on port '+config.port);
})

module.exports = { app, server };