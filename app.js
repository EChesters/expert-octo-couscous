
var express = require('express');
var app = express();
var lib = require("./src/Parser.js");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function (req, res) {
	  res.send('Hello Worldd:!');
});
app.post('/api', function (req, res) {
	  res.send(lib.foo(JSON.stringify(req.body),req.query.q));
});

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

