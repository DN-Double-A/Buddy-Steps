const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// including cookies, urlencoder, and express.json
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

// if we need to serve any static files, serve them here:

// insert routes here, please specify specific routes / what they will do:

// catch all error handler
app.use('/', (req, res) => {
  res.status(404).send('Not Found');
});

// global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler has caught an unknown middleware error',
    status: 400,
    message: { err: 'an error occured.' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server:
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
