var result;
var words = require('./pr_words.json');
function replaces(term){
    term = term.replace(/[ذ ض ظ]/g, 'ز');
    term = term.replace(/[ث ص]/g, 'س');
    term = term.replace(/[ح]/g, 'ه');
    term = term.replace(/[ط]/g, 'ت');
    term = term.replace(/[غ]/g, 'ق');
    term = term.replace(/[ع]/g, 'ا');
    return term;
}
function fixing(reped, term){
    if(typeof words[reped] !== 'undefined'){
        return words[reped];
    }
    if(term == '' || term == ' '){
        return {
            "true": '',
            "type": "skip"
        };        
    }
    return {
        "true": term,
        "type": "non"
    };
}
function spasing(fixed, lterm){
    if(lterm.type == 'verb'){
        if(fixed.type != 'the'){
            return ' .';
        }
        if(fixed.type == 'end'){
            return '.';
        }
    }
    if(lterm.type == 'non'){
        if(fixed.type == 'sum'){
            return '‌';
        }
    }
    if(lterm.type == 'skip'){
        return '';
    }
    return ' ';
}
function wordparse(term, lterm){
    term = term.toString();
    reped = replaces(term);
    fixed = fixing(reped, term);
    sp = spasing(fixed, lterm);
    result += sp+fixed.true;
    return fixed;
}
this.run = function(tokens){
    var lastterm = '';
    result = '';
    tokens.forEach(term => {
        term = wordparse(term, lastterm);
        lastterm = term;
    });
    return spasing({type: "end"}, lastterm)+result;
}
