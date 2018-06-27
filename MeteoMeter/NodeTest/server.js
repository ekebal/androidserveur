const express = require('express');
const http = require('http');
const Database = require('./database');

const port = process.env.PORT || 3000;

displayLogo();

let app = express();

console.log('Initializing database...');
const db = new Database();
db.initialize(function (err) {
    if (err) {
        console.error(err);
        process.exit(0);
    }

    console.log('Connected to database and initialized.');

    console.log('Configuring server...');
    const serverConfiguration = require('./server/configuration');
    app = serverConfiguration(app);
    console.log('Server configuration completd.');

    console.log('Starting server...');
    let server = http.createServer(app);
    server.on('listening', onListening);
    server.on('error', onError);
    server.listen(port);
});

function onListening() {
   console.log('Server started on', port);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(port + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(port + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function displayLogo() {
    console.log('');
    console.log('#----------------------------#');
    console.log('#                            #');
    console.log('#   Mobioos Node.JS Server   #');
    console.log('#      (Version 0.0.1)       #');
    console.log('#                            #');
    console.log('#----------------------------#');
    console.log('');
}