'use strict';
module.exports = function() {
  const fs = require('fs');
  const path = require('path');
  const express = require('express');
  const bodyParser = require('body-parser');
  
  // Configuration
  const BUILD_DIRECTORY = resolve('..', 'client', 'build');
  const WEBPACK_CONFIG = resolve(BUILD_DIRECTORY, '..', 'webpack.config.js');

  // Instantiate the express server
  const app = express();
