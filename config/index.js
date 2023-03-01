require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL
}

module.exports = config;