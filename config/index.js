require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    suPassword: process.env.SAMPLE_USER_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = config;