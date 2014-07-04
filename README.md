This is a public open source project, NxtButton, funded by NXT community, and the FIMK project.
Copyleft by konsta gogoljuk, konsta.gogoljuk@gmail.com

usage:

<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" src="http://localhost:80/nxtbutton.php?includeJsFile=true"></script>
<script>
	// A $( document ).ready() block.
	$( document ).ready(function() {
		$('nxt_button').nxtButton({
			'address' : 'FIM-XSWR-RK57-AE2P-A6U2H',
			'fee'     : '1.0',
			'amount'  : '5.0',
			'title'   : 'Example payment'});
	});

	</script>
	</head>
	<body>
	<div id='nxt_button'></div>
</body>

If you want to use your own proxy server for NXT requests, here is the installation instructions:

first configure your config.json to fit your server.

Nodejs:
npm install
node server.js

PHP:
- please have these 4 files in same folder: nxtbutton.php, config.json, crypto_browser.js nxtbutton.js
- PHP needs curl