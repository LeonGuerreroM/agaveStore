const express = require('express');
const app = express();

const config = require('./config');
const routesSetup = require('./routes');

app.use(express.json());
routesSetup(app);



app.listen(config.port, ()  => {
    console.log('listening on port '+config.port);
})