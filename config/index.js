require('dotenv').config();

const config = {
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    suPassword: process.env.SAMPLE_USER_PASSWORD,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = config;