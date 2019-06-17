'use strict';
module.exports = function() {
  const fs = require('fs');
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
  
  // Configuration
  const BUILD_DIRECTORY = path.resolve('..', 'client', 'build');
  const WEBPACK_CONFIG = path.resolve(BUILD_DIRECTORY, '..', 'webpack.config.js');

  // Instantiate the express server
  const app = express();

  // initialize Hot Module Replacement
  require('./hmr.js')(app, WEBPACK_CONFIG);

  //app.use(require('helmet')());
  app.use(express.static(BUILD_DIRECTORY, { index: false }));
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/img|/js|/css', (req, res) => {
  	// Express.static already handles serving static assets
	res.status(404).send();
  });

  app.post('/echo', (req, res) => {
    console.log(req.body);
	res.status(200).send(req.body);
  });

  app.get('*', (req, res) => {
    res.sendFile(`${BUILD_DIRECTORY}/index.html`);
  });

  return app;
}
