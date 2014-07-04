	$.fn.nxtButton = function(config) {
		if (typeof config.address === "undefined") {
			console.error("NxtButton error: Please define the recipient");
			config.address = "Invalid address";
		}
		if (typeof config.fee === "undefined") {
			config.fee = 1;
		}
		if (typeof config.amount === "undefined") {
			console.error("NxtButton error: Please define an amount");
			config.amount = 5.0;
		}
		if (typeof config.title === "undefined") {
			config.title = "NXT Transaction";
		}
		
		config.server = "<%=server %>";
		document.getElementById(this.selector).innerHTML = '<img selector=\"'+this.selector+'\" onclick="$(\''+this.selector+'\').nxtButtonOpenPaymetWindow()" src="data:image/png;base64,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" />';
		document.getElementById(this.selector).config = config;
		var div = document.getElementById(this.selector);
			div.innerHTML = div.innerHTML+"<div id='"+div.id+"_panel_outer_div' style=\""
			+ "background: #0000ff;"
			+ "width: 100%;"
			+ "height: 100%;"
			+ "position: absolute;"
			+ "left: 0px;"
			+ "top: 0px;"
			+ "opacity: 0.30;"
			+ "filter: alpha(opacity = 30);"
			+ "display:none;"
			+ "\" onclick=\"$('#"+div.id+"_panel_inner_div').css('display', 'none'); $('#"+div.id+"_panel_outer_div').css('display', 'none');\">"
			+ "</div>"
			+ "<div id='"+div.id+"_panel_inner_div' style=\""
			+ "background: white;"
			+ "border: 1px solid;"
			+ "width:450px;"
			+ "height:275px;"
			+ "position: relative;"
			+ "left: 400px;"
			+ "top: 0px;"
			+ "opacity: 1;"
			+ "filter: alpha(opacity = 100);"
			+ "padding: 20px;"
			+ "display:none;"
			+ "\">"
			+ "<b>"+div.config.title+"</b><br><br>"
			+ "Payment: <input id='"+div.id+"_amount' type='text' value='5.0' size='4' /> NXT &nbsp;&nbsp;&nbsp;&nbsp; Fee: <input id='"+div.id+"_fee' size='4' type='text' value='"+div.config.fee+"' /> NXT<br>"
			+ "<br>"
			+ "Enter your NXT password here: <br><input id='"+div.id+"_secret_phase' type='password' size='70' /> <br>"
			+ "The transaction will be signed locally, the password will never leave your device. See <a href=\"http://www.github.com\">github/nxtbutton</a> for more details"
			+ "<br><br>"
			+ "<img onclick=\"$('"+div.id+"').nxtButtonSendTransaction()\" src=\"data:image/png;base64,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\" />"
			+ "<br>Using NXT NRS Proxy: '"+div.config.server+"'<br>Merchant account: "+div.config.address+"</div>"
			 + "<div style='width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;display:none' id='"+div.id+"_message_outer_div'>"
			   + "<div style='background: white; width:200px; height:80px; margin-left: auto; margin-right: auto; margin-top: 100px; padding:10px; border: 1px solid; text-align:center;' id='"+div.id+"_message_inner_div'>";
	};
	
	$.fn.nxtButtonOpenPaymetWindow = function() {
		var div = document.getElementById(this.selector);
		$('#'+div.id+'_panel_outer_div').css('display', 'block');
		$('#'+div.id+'_panel_inner_div').css('display', 'block');
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
		$('#'+div.attr('id')+'_message_inner_div').html(message+"<br><img onclick=\"$('#"+div.attr('id')+"').nxtButtonHide();\" alt=\"\" style=\"padding-top:20px\"src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAhCAYAAAAvdw6LAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYeFSUTrcbyUQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEOklEQVRo3u2be0xbdRTHP4VboLCtjPKoAwrMwRDdClEWN0DFTQkIwek/GP8QMhOXLAaHJs44E/xvahafMSRLZuJj2UYkJszgxhQGmEFIBgx5dRMKwmjXMsqjvPq4/kFwYxSN/gE/4v0kN2lvTm96zun3nNPTW5UsyzIKwiAtPegdsdHUZ2Z4bIIFt0eJzBoQIPkTo9OSuTOe5OgIAFSyLMuXOm7wS9fvSoTWkacffpBnjYlIPSO3qe28qURknantvEmMTotU3z2AV2kjQnClZwDJbBvH4/Uq0RAAs20cyTnvUiIhCO55F5KiDsHGXrdHSYhYCRFYIZsC1eQYkzDG6YnYHAKAbcpJx6CFix0mpn2U268OvwhAScX3y87rNmk4fjCb0BANNe0mzjd3Kgr5NyREbOXN/Ey0wUHLzsfqQonVhZKVHM/JC00M2MZ91+N7/NIESBzNyyA0RENjr5kzTe2gUomZEJeACtGoJUpz96INDsI0aufc1U5uWOwAJOrDKdq3i0R9OKW5e3nru5+YdblXXGPJL38/FUfzMogO09JmvsWXtS3IAIKO+kIqJNuYgG5zCP3WO7xXeRmP927wOoYsdA1bOVGUQ3zkVp5KSaD6Wp9vhcgyr+dl8FB0JKZROx9VN+ISvGdKIr7Bx7bHAHC2uZM518q9mssDZ69e51jhkzyaEE1Va48PGy/FT6SRsTOO4bEJ3q+qw7ngFr+pi5iQmLAtAFwftKz6iW4fsgJg0Gl92uTs3sHB9BTsU07ePX+ZcefcRhl7xdvsBgeqAXDMzOJdpdQ7nDN/2fry4bX96QBYHNNYJ6Y3zHpISIU4511og/0JlCQm5xZ82mg1gQBMzy34VMjtSSfzLjePxEZxeH86n15s3iAJEXDKMtsdGA16UmIjaewb8mmTEhsJwIBtHF8+lH1bg1eWOfVqIc+np9AzaufHdpOikP9CQ48Zo0HPK1lpNPQO4r6vbqn9/SjOSgOgvsfsUyH9NgcAxyt/5uOXcynL3YdpdIzuWzahE+Ln9ngQ7ahs+Q3rxBTJ2yKoKCkgzRCFvwr8VZBmiKKipICkB8KxOKaoau1a9tq7Y+/i819NQ3xe20ygWuKDomfYEqRGRJ+XDiEV4pidp/TrGr4ofo5dBj0VhwpX2NinnLzxTQ0Ts757zL1+nb7SRpI+nLzUJD58KYdDp35YoTqlZP0DHX9YKTh5huKsVLJTEogJ24JKpWLkziT1vWZO119jfGb1UfZ+v945V0tceChp8dt4uyCL8qp6If1W7Sj7RPm5UJmyFDbULuv/nRBFIYpCFP4mIZoAielV1hMKa0tIYADSboOeht5BJRoCYIzTIx05sIe67gElGgJw5MCexXt7y6vqOHGhSYnIOnIsP5PyF7IXEwJQ3dbHZ5daaO0fQbl5bq16hpr07dGU5jxOfmrS4jd15f8hYvEnMOS66Yapk8cAAAAASUVORK5CYII=\" /></div></div>");
	};
	
	$.fn.nxtButtonSendTransaction = function() {
		var div = document.getElementById(this.selector);
		var secretPhrase = $('#'+this.selector+'_secret_phase').val();
		var fee = parseFloat($('#'+this.selector+'_fee').val());
		var amount = parseFloat($('#'+this.selector+'_amount').val());
		fee = parseInt(fee * 100000000);
		amount = parseInt(amount * 100000000);
		if (secretPhrase.length == 0) {
			$('#'+this.selector).nxtButtonMessage("Please enter your secret phase");
			return;
		}
		secretPhrase = toHex(secretPhrase);
		var publicKey = nxtCrypto.getPublicKey(secretPhrase);
		CrossDomainRequest(div.config.server
			+ '?requestType=sendMoney'
			+ '&recipient=' + div.config.address
			+ '&amountNQT=' + amount
			+ '&feeNQT=' + fee
			+ '&deadline=' + 1440
			+ '&publicKey=' + publicKey, 
			function(data) {
				
				if (data.errorDescription) {
					$('#'+div.id).nxtButtonMessage(data.errorDescription);
					console.info('NxtButton: '+data.errorDescription);
					return;
				}
				
				function parseTransactionBytes(bytes) {
					function h2d(h) {return parseInt(h,16);} 
					var ret       = {};
					
					ret.type      = h2d(bytes.cut(two, knifes));
					ret.subtype   = h2d(bytes.cut(2, 4));
					ret.timestamp = h2d(bytes.cut(4, 8));
					ret.deadline  = h2d(bytes.cut(8, 10));
					ret.sender    = h2d(bytes.cut(10, 42));
					ret.recepient = h2d(bytes.cut(42, 50));
					ret.amount    = h2d(bytes.cut(50, 54));
					ret.fee       = h2d(bytes.cut(54, 58));
					ret.referenced_transaction = h2d(bytes.cut(58, 66));
					ret.signature = h2d(bytes.cut(66, 152));
					
					return ret;
				}
				
				console.log(ret);

				var unsigned = data.unsignedTransactionBytes;
				var signature = nxtCrypto.sign(unsigned, secretPhrase);
				
				// I have no idea why you need to embed the signature into unsigned bytes. Seems like cryptographic elitism.
				var transactionBytes = unsigned.substr(0, 192) + signature + unsigned.substr(320);
				
				CrossDomainRequest(div.config.server+'?requestType=broadcastTransaction&transactionBytes='+transactionBytes, function (r) {
					$('#'+div.id).nxtButtonMessage('Transaction complete!');
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
