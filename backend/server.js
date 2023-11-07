const dotenv = require('dotenv');
const db = require('./src/models')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err, err.name, err.message);
    process.exit(1);
});

dotenv.config({path: './config.env'});
const app = require('./app');


const port = process.env.PORT || 3000;
let server;
db.sequelize.sync().then(() => {
    server = app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });

    process.on('unhandledRejection', err => {
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });

    process.on('SIGTERM', () => {
        console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
            console.log('💥 Process terminated!');
        });
    });
})
