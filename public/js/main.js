var lastObjectId = "";

$(function() {
	reloadTimeline();
});

$('#readMore').click(function (){
	reloadMoreTimeline();
});

$('#post_update').click(function (){
	console.log("post new tweet");
	postTweet();
});


// タイムライン取得
function reloadTimeline() {
	$('#container').text("");

	$.ajax({
		type: "GET",
		url: "/v1/twitter",
		data: "count=20",
		success: function(data) {
			console.log(data);
			renderTimeline(data);
		},
		error: function(err) {
			console.log("error: "+err);
		}
	});
}

// タイムライン取得（read more）
function reloadMoreTimeline() {
	console.log("readmore max_id: "+lastObjectId);

	$.ajax({
		type: "GET",
		url: "/v1/twitter",
		data: "max_id="+lastObjectId+"&count=20",
		success: function(data) {
			console.log(data);
			renderTimeline(data);
		},
		error: function(err) {
			console.log("error: "+err);
		}
	});
}

// タイムライン描画
function renderTimeline(data) {
	$.each(data, function() {
		var templateHtml = $('#tweetTemplate').html(),
	        template = $.templates(templateHtml),
	        html = template.render(this),
	        $div = $('#container');
	    $div.append(html);
	});

	lastObjectId = data[data.length-1].id;
	console.log("lastObjectId = "+lastObjectId);
}

// ツイートの投稿
function postTweet() {
	var newTweet = $('input[name="new_tweet"]').val();

	$.ajax({
		type: "POST",
		url: "/v1/twitter",
		data: {
			content: newTweet
		},
		success: function(data) {
			console.log(data);
		},
		error: function(err) {
			console.log("error: "+err);
		}
	});
}
