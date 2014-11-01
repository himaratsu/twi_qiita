var util = require('util'),
    twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'fJ50758leFGPFnPKToay8MLc4',
    consumer_secret: 'HpaXPC4mBSqhmCuOskCqc8B8m3MT61AqL1AtiyRqudnwUcGEh8',
    access_token_key: '98292907-mOJLdSyuGKIyny3fCxp5824V9ASM73cV74HPtLeuW',
    access_token_secret: 'koNVIAJPrhBuuuyYfgjWEBwkqXsRxzfiwEgNX9BrTm7Wi'
});

exports.get = function(req, res) {
	timeline(req, res);
};

exports.post = function(req, res) {
	console.log("post made kita");
	statusUpdate(req, res);
}

function search(req, res) {
	console.log("search");

	//キーワードで検索
	twit.get('/search/tweets.json', {"q":"#Node"}, function(data) {
	    console.log(data);

	    res.json(200, "success");
	});
}

function timeline(req, res) {
	var count = req.query["count"];
	var max_id = req.query["max_id"];

	if (max_id != undefined) {
		//タイムライン最新20件
		twit.get('/statuses/home_timeline.json', {include_entities:true, count:count, max_id:decStrNum(max_id)}, function(data, error) {
			if (error) {
				res.json(500, error)
			}
			else {
				res.json(200, data);
			}
		});
	}
	else {
		twit.get('/statuses/home_timeline.json', {include_entities:true, count:count}, function(data, error) {
			if (error) {
				res.json(500, error)
			}
			else {
				res.json(200, data);
			}
		});	
	}
}

function statusUpdate(req, res) {
	var content = req.body.content
	console.log("your new tweet content is " + content);

	twit.updateStatus(content, function(data, error) {
		if (error) {
			res.json(500, error)
		}
		else {
			res.json(200, data);
		}
	});
	
}

function decStrNum (n) 
{ 
    n = n.toString(); 
    var result=n; 
    var i=n.length-1; 
    while (i>-1) 
    { 
        if (n[i]==="0") 
        { 
            result=result.substring(0,i)+"9"+result.substring(i+1); 
            i --; 
        } 

        else 
        { 
            result=result.substring(0,i)+(parseInt(n[i],10)-1).toString()+result.substring(i+1); 
            return result; 
        } 
    } 
    return result; 
}

