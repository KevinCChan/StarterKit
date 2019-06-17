'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const networks = Object.values(require('os').networkInterfaces());

let host = null;

PortScanner:
for (const intf of networks) {
  for (const { family, internal, address } of intf) {
    if (family === 'IPv4' && !internal) {
      host = address;
      break PortScanner;
    }
  } 
}

if (!host) throw new Error('No viable IPv4 interface was found');

const app = require('./app.js')();
const port = 8080;
http.createServer(app).listen(port, host, function() {
  console.log(`Application listening on ${host}:${port}`);
});
