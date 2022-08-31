require('dotenv').config();
const app = require('./src/app');
const port = process.env.PORT || '8000';
const sequelize = require('./src/api/database/connection.js');

let server;
async function run() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        server = app.listen(port, () => {
            console.info(`Listening to port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

run().catch((error) => console.log(error.stack));
