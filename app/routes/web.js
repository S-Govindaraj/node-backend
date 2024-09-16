const express = require('express');

const web = express.Router();

web.get('/', (req, res) => {
    // rendering the ejs file
    res.render('welcome', {
        // passing the values to the ejs template file
        heading: 'Welcome to MVC!',
    })
});

module.exports = web;