// Don't forget to do npm install with no args from top uglify-js dir before testing
// To run test, cd to test directory, type node doctest.js and verify all three comments present
var jsp = require('uglify-js').parser;
var fs = require('fs');

module.exports = {
    getAST :  function(filename, callback) {
	fs.readFile(filename, 'UTF-8',function(err, code) {
		var ast = jsp.parse(code);
		callback(false, ast);
	    });
    },
    test: function() {
	this.getAST('data/doctest_sample1.js', function(err, ast) {
	    console.log("\n=====\n"+JSON.stringify(ast[1][0][1][3][1][0],null,3));
	    console.log("\n=====\n"+JSON.stringify(ast[1][1],null,3));
	    console.log("\n=====\n"+JSON.stringify(ast[1][2][1][3][1][0],null,3));
	    //console.log("\n=====\n"+JSON.stringify(ast,null,3));
	    });
    }

}

ug = module.exports;
ug.test();
