const mime = require('mime');
const fs = require('fs');
const path = require('path');
var req, res, post;
this.set = function(reqi, resi) {
    req = reqi;
    res = resi;
}
this.interpreter = function() {
    if (req.url == '/') {
        inc = 'ui/html/index.html';
    } else {
        inc = 'ui'+req.url;
    }
    if (fs.existsSync(inc)) {
        var file = fs.readFileSync(inc, 'binary');
        var ext = mime.lookup(inc);
        res.writeHead(200, { 'Content-Type': ext });
        res.write(file, 'binary');
        res.end();
    }else{
        this.requestdenied(404);
    }
}

this.requestdenied = function(err) {
    console.log('requestdenied: ' + err);
    switch (err) {
        default: inc = 'ui/html/pages/404.html';
        break;
        case 403:
                case '403':
                inc = 'ui/html/pages/404.html';
            break;
        case 404:
                case '404':
                inc = 'ui/html/pages/404.html';
            break;
        case 405:
                case '405':
                inc = 'ui/html/pages/404.html';
            break;
        case 410:
                case '410':
                inc = 'ui/html/pages/404.html';
            break;
        case 503:
                case '503':
                inc = 'ui/html/pages/404.html';
            break;

    }
    var file = fs.readFileSync(inc, 'binary');
    res.writeHead(err, { 'Content-Type': 'HTML' });
    res.end(file, 'binary');
}