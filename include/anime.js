module.exports = function (anime) {
    // ExpressJS
    const express = require('express');
    const app = express();
    const port = process.env.SERVER_PORT;

    // Node-color-log
    const log = require('node-color-log');
    log.bold(true);
    log.setDate(() => (new Date()).toLocaleTimeString());

    // Jikan-node
    const lookup = require('jikan-node');


    // Get anime info by {id}
    app.get('/an/:id', (req, res) => {
        // Output hello world in json format
        res.json({
            hello: 'world'

        });
    });
};