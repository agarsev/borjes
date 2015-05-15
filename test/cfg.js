"use strict";

var util = require('util');
var fs = require('fs');
var yaml = require('js-yaml');

var Parser = require('../src/parser');
var Read = require('../src/reader');

var grammar = Read.CFG(yaml.safeLoad(fs.readFileSync('english.cfg.yml')));
var sentences = fs.readFileSync('sentences.txt', 'utf8').split('\n');

var p = Parser(grammar);

function test(i) {
    if (sentences[i] === '') { return; }
    var sentence = sentences[i].split(' ');
    var parse = Parser.parse(p, sentence);
    if (!parse[0]) {
        console.log("Wrong parse for '"+sentences[i]+"'");
        console.log(util.inspect(p.table, { depth: null, colors: true }));
    } else {
        console.log("OK '"+sentences[i]+"'");
        console.log(parse[0].node.s);
    }
}

for (var i=0; i<sentences.length; i++) {
    test(i);
}