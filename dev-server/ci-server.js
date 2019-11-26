const app = require('./mock-routes');
const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 8000;

app.use('/assets', express.static(path.join(__dirname, '..', 'frontend_development')));

app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(fs.readFileSync(path.join(__dirname, '/../frontend_development/index.html')));
    res.end();
});

const server = app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== ci-server startet på http://localhost:%s/', port);
});

process.on('SIGTERM', function() {
    server.close();
});
