	var defaults = {

		// general
                // TODO: add the NRS server as one of parameters.
		// TODO: have the NRS and the proxy server URLS defines in one place
		//       now they are also defined in config.json
 		recipient: 0,
		server: 'http://nxt.sx:2000/nxtbutton.php',
		nrs: 'http://nxt.sx:7876',
                amount: '1.0',
		fee: '1.0',
		title: 'Sample NXT payment',

		// images
		mainButton: 'http://nxt.sx/nxtbutton/code/images/pay_with_nxt_blue.png',
		payButton: 'http://nxt.sx/nxtbutton/code/images/pay_button.png',
		okButton: 'http://nxt.sx/nxtbutton/code/images/ok_button.png',
		confirmButton: 'http://nxt.sx/nxtbutton/code/images/confirm_button.png',

		// callback
		success: function() {} 	
	
	};

	$.fn.nxtButton = function(config) {

		// TODO: need do add proper check of all the supplied parameters

		if (typeof config.recipient === "undefined") {
			console.error("NxtButton error: Please define the recipient");
			config.recipient = "Invalid recipient";
		}
		if (typeof config.amount === "undefined") {
			console.error("NxtButton error: Please define an amount");
			config.amount = 5.0;
		}

		var div = document.getElementById(this.selector);
 	        
		// merge user-supplied options with the defaults
		div.config = $.extend({}, defaults, config);
		
                div.innerHTML = '<img selector=\"'+this.selector+'\" '
			+ 'onclick="$(\''+this.selector+'\').nxtButtonOpenPaymetWindow()" '
			+ 'src="' + div.config.mainButton + '" />';

		div.innerHTML = div.innerHTML + "<div id='"+div.id+"_panel_outer_div' class='dim-panel' "
			+ "onclick=\"$('#"+div.id+"_panel_inner_div').css('display', 'none'); $('#"+div.id+"_panel_outer_div').css('display', 'none');\"></div>"
			+ "<div id='"+div.id+"_panel_inner_div' class='payment-panel'>"
			+ "<div class='payment-title-panel'><p>"+div.config.title+"</p></div>"
			+ "<div class='payment-data-panel'>"
			+ "<p>AMOUNT</p>" 
			+ "<p><input id='"+div.id+"_amount' type='text' value='"+div.config.amount+"' size='8' placeholder='NXT' class='amount' /> "
			+ "&nbsp;&nbsp;&nbsp;&nbsp;FEE <input id='"+div.id+"_fee' type='text' value='"+div.config.fee+"' size='8' placeholder='NXT' class='fee' /></p>"
			+ "<p><input id='"+div.id+"_secret_phase' type='password' size='70' placeholder='Secret Phrase' class='secret' />"
			+ "<img id='"+div.id+"_button' onclick=\"$('"+div.id+"').nxtButtonSendTransaction()\" class='submit' />"
			+ "</p></div>"
			+ "<p class='small-text'>The transaction is signed locally, the password does not leave your computer."
			+ "<br />See <a href=\"https://github.com/droppen/nxtbutton\">https://github.com/droppen/nxtbutton</a> for details."
			+ "<br />"
			+ "<br /> Merchant NXT account: " + div.config.recipient + ""
			+ "<br />NRS: " +div.config.nrs + "</p>"
			+ "<div class='message-outer-panel' id='"+div.id+"_message_outer_div'>"
			+ "<div class='message-inner-panel' id='"+div.id+"_message_inner_div'></div>";
	};
	
	$.fn.nxtButtonOpenPaymetWindow = function() {
		var div = document.getElementById(this.selector);
		$('#'+div.id+'_panel_outer_div').css('display', 'block');
		$('#'+div.id+'_panel_inner_div').css('display', 'block');
		$('#'+this.selector+'_button').attr("src", div.config.payButton );
	};

	$.fn.nxtButtonHide = function() {
		var div = $(this.selector);
		$('#'+div.attr('id')+'_panel_outer_div').css('display', 'none');
		$('#'+div.attr('id')+'_panel_inner_div').css('display', 'none');
		$('#'+div.attr('id')+'_message_outer_div').css('display', 'none');
	};
	
	$.fn.nxtButtonMessage = function(message) {
		var div = $(this.selector);
		$('#'+div.attr('id')+'_message_outer_div').css('display', 'block');
		// TODO: the okButton graphic should come from config and not from the default
		$('#'+div.attr('id')+'_message_inner_div').html(message+"<br><img onclick=\"$('#"+div.attr('id')+"').nxtButtonHide();\" alt=\"\" src=\"" + defaults.okButton + "\" /></div></div>");
	};
	
	$.fn.nxtButtonSendTransaction = function() {
		var div = document.getElementById(this.selector);
		var secretPhrase = $('#'+this.selector+'_secret_phase').val();
		var fee = parseFloat($('#'+this.selector+'_fee').val());
		var amount = parseFloat($('#'+this.selector+'_amount').val());
		$('#'+this.selector+'_button').attr("src", div.config.confirmButton ); 
		
		fee = parseInt(fee * 100000000);
		amount = parseInt(amount * 100000000);
		if (secretPhrase.length == 0) {
			$('#'+this.selector).nxtButtonMessage("Please enter your secret phrase");
			return;
		}
		secretPhrase = toHex(secretPhrase);
		var publicKey = nxtCrypto.getPublicKey(secretPhrase);
		var request = div.config.server
			+ '?requestType=sendMoney'
			+ '&recipient=' + div.config.recipient
			+ '&amountNQT=' + amount
			+ '&feeNQT=' + fee
			+ '&deadline=' + 1440
			+ '&publicKey=' + publicKey;
		CrossDomainRequest(request, 
			function(data) {
				
				if (data.errorDescription) {
					$('#'+div.id).nxtButtonMessage(data.errorDescription);
					console.info('NxtButton: '+data.errorDescription);
					return;
				}
				
				function parseTransactionBytes(bytes) {
					console.log(bytes);
					function h2d(h) {console.log(h); return parseInt(h,16);} 
					function hex2a(hexx) {
						var hex = hexx.toString();//force conversion
						var str = '';
						for (var i = 0; i < hex.length; i += 2)
							str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
						return str;
					}
					var ret       = {};
					
					/* Referenced topic: https://bitcointalk.org/index.php?topic=313082.340
						All numbers r little-endian.
					
000036a62601a00597e35e46bc448387f64937d3707c958479646091f8b11e2a7ded488a887d658b4cceecb195d700240065cd1d0000000000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000					
36a62601
a005
97e35e46bc448387f64937d3707c958479646091f8b11e2a7ded488a887d658b
4cceecb195d70024
0065cd1d
						01 B - type (00)
						01 B - subtype (00)
						04 B - timestamp (671e7400)
										  36a62601
						02 B - deadline (3c00)
										 a005
						32 B - sender public key (b1c9e22befa06aee2eb0ac2d13ad03df02abf7cdd5fb8c9903b74f65819eb84d)
												  97e35e46bc448387f64937d3707c958479646091f8b11e2a7ded488a887d658b
						08 B - recipient (252ab2f000b58ef7)
										  4cceecb195d70024
						04 B - amount (e8030000)
									   0065cd1d
						04 B - fee (01000000)
									00000000
						08 B - referenced transaction (0000000000000000)
						64 B - signature (a56d7368c792df694c72fcaf731544c4b710c9de4e906105cdb25b15fc10d1052c9fac66383c553 6500cea0782db28535c25095758029cb4d465b13f8850cf1e)					
					*/
					ret.type      = h2d(bytes.substring(0, 2));
					ret.subtype   = h2d(bytes.substring(2, 4));
					ret.timestamp = h2d(bytes.substring(4, 12));
					ret.deadline  = h2d(bytes.substring(12, 16));
					ret.sender    = h2d(bytes.substring(16, 80));
					ret.recepient = h2d(bytes.substring(80, 96));
					ret.amount    = h2d(bytes.substring(96, 104));
					ret.fee       = h2d(bytes.substring(104, 112));
					//ret.referenced_transaction = h2d(bytes.substring(120, 136));
					//ret.signature = h2d(bytes.substring(136, 264));
					console.log(bytes);
					return ret;
				}
				//var ret = parseTransactionBytes(data.unsignedTransactionBytes);
				//console.log(ret);

				var unsigned = data.unsignedTransactionBytes;
				var signature = nxtCrypto.sign(unsigned, secretPhrase);
				
				// I have no idea why you need to embed the signature into unsigned bytes. Seems like cryptographic elitism.
				var transactionBytes = unsigned.substr(0, 192) + signature + unsigned.substr(320);
				
				CrossDomainRequest(div.config.server+'?requestType=broadcastTransaction&transactionBytes='+transactionBytes, function (r) {
					$('#'+div.id).nxtButtonMessage('Transaction complete!');
					if (typeof div.config.success == "function") {
						div.config.success(r.fullHash, r.transaction);
					}
					console.info('NxtButton: Transaction complete!');
				});
			}
		);
	}

	function CrossDomainCallback(data) {
		CrossDomainCallbackFunction(data);
	}
	
	function CrossDomainRequest(url, callback) {
		CrossDomainCallbackFunction = callback;
		script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	function d2h(d) {return d.toString(16);}
	
	function toHex(data) {
		var str = "";
		for (var i = 0; i < data.length; i ++) {
			str = str += data.charCodeAt(i).toString(16);
		}
		return str;
	}

