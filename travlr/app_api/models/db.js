const mongoose = require('mongoose');
const readline = require('readline');

// Database URI
const dbURI = process.env.DB_HOST || 'mongodb://127.0.0.1:27017/travlr';

// Connect to MongoDB
mongoose.connect(dbURI);

// Connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Graceful shutdown - CORRECTION
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close().then(() => {  // ← CORRECTION : utiliser .then()
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    }).catch(err => {
        console.log('Error during shutdown:', err);
        callback();
    });
};

// Windows support
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Application termination
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('hosting shutdown', () => {
        process.exit(0);
    });
});

// Load models
require('./travlr');
require('./user');

module.exports = mongoose;