require('dotenv').config();

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DB_URL,
        timezone: 'UTC',
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    pool: {
        min: 1,
        max: 100
    }
};
