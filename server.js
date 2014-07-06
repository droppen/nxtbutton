var express    = require('express')
var bodyParser = require('body-parser')
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var request = require('request');
var config = require('./config.json');

var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/nxtbutton.php', function(req, res){
	var url = req.url.split('nxtbutton.php');
	
	if (req.url.substr(-('?includeJsFile=true'.length)) == '?includeJsFile=true') {
		res.send(ejs.render(fs.readFileSync("./nxtbutton.js", "utf8"), { server: config.publicPathToProxy })+fs.readFileSync("./crypto_browser.js", "utf8"));
		return;
	}
	
	if (url[1].length > 1) {
		request.post(config.nxtNRS+'nxt'+url[1], function (err, httpResponse, body) {
			res.end('CrossDomainCallback('+body+');');
		});
	} else {
		res.end();
	}
});
console.log('Server started at 2000');
app.listen(2000);
