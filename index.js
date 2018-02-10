const http = require('http');

const request = require('./request');
const methods = require('./methods');

const web = () => Object.assign(http.createServer(request), methods.methods);

module.exports = web;
