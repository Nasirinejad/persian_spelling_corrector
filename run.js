const http = require('http');
const path = require('path');
const pr = require('./lib/core.js');
const ui = require('./ui/core.js');
var server = http.createServer(function(req, res) {
    pr.set(req, res);
    ui.set(req, res);
    Commentator(req);
});

server.listen(3000, '127.0.0.1');

function Commentator(req) {
    ext = path.extname(req.url);
    if (ext == '.prc') {
        pr.prcRequests();
    }else {
        ui.interpreter();
    }
}