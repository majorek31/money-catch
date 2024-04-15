const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use((req, res, next) => {
    res.set("X-Server", "express");
    next();
});
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', require('./routes'));
app.listen(8080, () => {
    console.log("Listening on port 8080");
});