require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'ivs',
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        dialect: 'mysql',
    },
};
