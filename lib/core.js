const pr = require('./persian.js');
var req, res;
var resives = new Array();
this.set = function(reqi, resi) {
    req = reqi;
    res = resi;
    result = new Array();
    if (req.method == 'POST') {
        req.on('data', function(data) {
            result = data.toString().split(',');
            result = result[0].split('&');
            l = result.length;
            for (i = 0; i < l; i++) {
                tmp = result[i].split('=');
                resives[tmp[0]] = tmp[1];
            }
        });
    }
}
this.proccess = function(){
    req.on('data', function(data) {
        data = data.toString();
        if(typeof data != 'undefined'){
            tokens = data.replace(/[. ‌ ، , * + ? ^ $ { } ( ) | [ \] \\]/g, ' ').split(' ');
            result = pr.run(tokens);
            res.end(result);
        }else{
            console.log(resives);
        }
    });
}
this.prcRequests = function() {
    switch (req.url) {
        case '/proccess.prc':
            this.proccess();
            break;
    
        default:
            res.end(req.url);
            break;
    }
}
