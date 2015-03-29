$(document).ready(function(){
	var myid=0;
	var mycount=1;
	$("#submit").click(function(){
		if($("#name").val().length<1)
		{
			alert("Please enter a value");
			return false;
		}
		var initUrl="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+$("#name").val()+"&count=200&truncated=false&exclude_replies=true";
		var consumerKey="tdp9qTeoh2zsilPnRiwgXHG9y";
		var consumerSecret="auFbADQ3XeFkVwxn7E6Qx5Y4aOrndCmTMfgslmPHuWA3Lg2Xhy";
		var accessToken="1222227554-LeJsVW3qO6TdxmXBghb2mxMThjM0U0KcUNW0wnJ";
		var accessTokenSecret="YozXDcwnT4qj00VrLMSc5dRF4pYvz6mFkUDEFOpXpNX2Z";
		var nonce=exports.nonce(32);
		var ts=Math.floor(new Date().getTime()/1000);
		var timestamp=ts.toString();
		var accessor={
			"consumerSecret":consumerSecret,
			"tokenSecret":accessTokenSecret
		};

		var params={
			"oauth_version": "1.0",
        	"oauth_consumer_key": consumerKey,
        	"oauth_token": accessToken,
        	"oauth_timestamp": timestamp,
        	"oauth_nonce": nonce,
        	"oauth_signature_method": "HMAC-SHA1"
		};
		var message={
			"method":"GET",
			"action":initUrl,
			"parameters":params
		};
		exports.SignatureMethod.sign(message,accessor);
		var normPar=exports.SignatureMethod.normalizeParameters(message.parameters);
		console.log("Normalized parameters : "+normPar);
		var baseString=exports.SignatureMethod.getBaseString(message);
		console.log("Base String dude : "+baseString);
		var sig=exports.getParameter(message.parameters,"oauth_signature")+"=";
		console.log("Non-Encoded signature : "+sig);
		var encodedSig=exports.percentEncode(sig);
		//console.log("Finally Yo Yo honey sigggggggggggg : "+encodedSig);
		//console.log("Value "+ts);
		var content="<div id='content'>";
		$.ajax({
			url : initUrl,
			type : 'GET',
			crossDomain: true,
			headers: {
            	"Authorization": 'OAuth oauth_consumer_key="'+consumerKey+'", oauth_nonce=' + nonce + ', oauth_signature=' + encodedSig + ', oauth_signature_method="HMAC-SHA1", oauth_timestamp=' + timestamp + ',oauth_token="'+accessToken+'", oauth_version="1.0"'
        	},
        	success:function(data){
        		//console.log("Success Dude "+data);
        		$.each(data,function(){
        			content=content+"<p>"+this['text']+"</p>";
        			$("#content").append("<p>"+this['text']+"</p>");
        			//console.log(" "+content);
        			myid=this['id'];
        			mycount=mycount+1;
        			console.log("processing... Please wait "+myid+" "+mycount);
        		});
        			console.log("Hello World-----------------------------------------------------------------");
        		//console.log(content);
        		//content=content+"</div>";
        		//$("#content").replaceWith(content);
        	},
        	error:function(){
        		console.log("Error executed at ajax");
        	}
		});//  AJAX ends here ---------------------------------------------------------------------------------------------------------------------
		/*console.log("1Ajax ends here=----------------------------------------------------------------------------");
		var initUrl1="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+$("#name").val()+"&count=200&truncated=false&max_id="+myid;
		var nonce1=exports.nonce(32);
		var ts1=Math.floor(new Date().getTime()/1000);
		var timestamp1=ts1.toString();
		var accessor1={
			"consumerSecret":consumerSecret,
			"tokenSecret":accessTokenSecret
		};

		var params1={
			"oauth_version": "1.0",
        	"oauth_consumer_key": consumerKey,
        	"oauth_token": accessToken,
        	"oauth_timestamp": timestamp1,
        	"oauth_nonce": nonce1,
        	"oauth_signature_method": "HMAC-SHA1"
		};
		var message1={
			"method":"GET",
			"action":initUrl1,
			"parameters":params1
		};
		exports.SignatureMethod.sign(message1,accessor1);
		var normPar1=exports.SignatureMethod.normalizeParameters(message1.parameters);
		console.log("Normalized parameters : "+normPar1);
		var baseString1=exports.SignatureMethod.getBaseString(message1);
		console.log("Base String dude : "+baseString1);
		var sig1=exports.getParameter(message1.parameters,"oauth_signature")+"=";
		console.log("Non-Encoded signature : "+sig1);
		var encodedSig1=exports.percentEncode(sig1);
		//console.log("Finally Yo Yo honey sigggggggggggg : "+encodedSig);
		//console.log("Value "+ts);
		//var content="<div id='content'>";
		$.ajax({
			url : initUrl1,
			type : 'GET',
			crossDomain: true,
			headers: {
            	"Authorization": 'OAuth oauth_consumer_key="'+consumerKey+'", oauth_nonce=' + nonce1 + ', oauth_signature=' + encodedSig1 + ', oauth_signature_method="HMAC-SHA1", oauth_timestamp=' + timestamp1 + ',oauth_token="'+accessToken+'", oauth_version="1.0"'
        	},
        	success:function(data){
        		//console.log("Success Dude "+data);
        		$.each(data,function(){
        			content=content+"<p>"+this['text']+"</p>";
        			//console.log(" "+content);
        			$("#content").append("<p>"+this['text']+"</p>");
        			myid=this['id'];
        			mycount=mycount+1;
        			console.log("processing... Please wait"+myid+" "+mycount);
        		});
        		//content=content+"</div>";
        		//$("#content").replaceWith(content);
        	},
        	error:function(){
        		console.log("Error executed at ajax");
        	}
		});//  AJAX ends here ---------------------------------------------------------------------------------------------------------------------
		console.log("2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222");
		// */
	});
});