var respawn = require('respawn');

var monitor = respawn(['node', 'server.js'], {
    env: {}, // set env vars
    cwd: '.',              // set cwd
    maxRestarts:10,        // how many restarts are allowed within 60s
    sleep:1000,            // time to sleep between restarts
});

monitor.start(); // spawn and watch