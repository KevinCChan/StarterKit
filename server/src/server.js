'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const networks = Object.values(require('os').networkInterfaces());

let address = null;

PortScanner:
for (const intf of networks) {
  for (const { family, internal, ipAddress } of intf) {
    if (family === 'IPv4' && !internal) {
      address = ipAddress;
      break PortScanner;
    }
  } 
}

if (!address) throw new Error('No viable IPv4 interface was found');

const app = require('./app.js')();

http.createServer(app).listen(8080, address, function() {\
  console.log(`Application listening on ${address}:${port}`);
});
