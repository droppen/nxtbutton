This is a public open source project, NxtButton, funded by NXT community, and the FIMK project.
Copyleft by konsta gogoljuk, konsta.gogoljuk@gmail.com

usage:
```html
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" src="http://nxt.sx:80/nxtbutton/code/nxtbutton.php?includeJsFile=true"></script>
<script>
	$( document ).ready(function() {
		$('nxt_button').nxtButton({
			'recipient' : 'NXT-XSWR-RK57-AE2P-A6U2H',
			'server'  : 'http://nxt.sx:2000/nxtbutton.php',
			'fee'     : '1.0',
			'amount'  : '5.0',
			'title'   : 'Example payment',
			'success' : function (hash, transaction) {
				console.log('Transaction1 is complete, transaction id '+transaction);
			}});
		$('nxt_button2').nxtButton({
			'recipient' : 'NXT-XSWR-RK57-AE2P-A6U2H',
			'server'  : 'http://nxt.sx:2000/nxtbutton.php',
			'fee'     : '1.0',
			'amount'  : '6.0',
			'title'   : 'Payment2',
			'success' : function (hash, transaction) {
				console.log('Transaction2 is complete, transaction id '+transaction);
			}});
	});

	</script>
	</head>
	<body>
	<div id='nxt_button'></div>
	<div id='nxt_button2'></div>
</body>
```

If you want to use your own proxy server for NXT requests, here is the installation instructions:

first configure your config.json to fit your server.

Nodejs:
npm install
node server.js

PHP:
- please have these 4 files in same folder: nxtbutton.php, config.json, crypto_browser.js nxtbutton.js
- PHP needs curl