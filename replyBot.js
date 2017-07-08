console.log('The npm bot is starting!');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

//getting, searching for a tweets, parsing the T.get process into a params var and a function; this is all using TWIT npm that connects with their API easily.

var params = {
	q: 'rainbow',
	count: 5
};

function gotData(err, data, response) {
	var tweets = data.statuses;
	for (var i = 0; i < tweets.length; i++) {
		console.log(i + 1 + '. ' + tweets[i].text);
	}
};

T.get('search/tweets', params, gotData);


//POSTing a tweet, need to call it via tweetIt() to work, but interval is set below so it will work through that.

function tweetIt(txt) { //wrapping it up in a function for later use

	var tweet = {
		status: txt,
	};

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log('Something went wrong!');
		} else {
			console.log('It worked! You also tweeted something! Check it out on Twitter!');
		}
	}
}



//scheduling tweets with SET INTERVAL, the miliseconds can work below through the calculations, remove comment from line below to try	

// setInterval(tweetIt, 1000 * 20) //every 20 secs just to see if it will run. 


//STREAM, the one demonstrated below is the one called the "user" stream. 

//setting up a USER stream
var stream = T.stream('user');

//anytime someone follows me

stream.on('tweet', tweetEvent);

//my followed function - this is what happens when I follow/get followed basically:

// function tweetEvent(eventMsg) { //***THIS PARTICULAR CODE IS USED TO CHECK THE JSON RESPONSE SENT BY A TWEET EVENT***, so that we can find data we need and create different functions to filter tweets(example, the ones sent to me only and reply to them.)
// 	console.log("Tweet event triggered!");

// 	var fs = require('fs');
// 	var json = JSON.stringify(eventMsg, null, 2);
// 	fs.writeFile('tweetEvent.json', json);
// }

function tweetEvent(eventMsg) {

	var replyTo = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name; 

	if(replyTo === 'dev_meelosh') {
		var newTweet = '@' + from + ' thank you for tweeting me! #codingrainbow';
		tweetIt(newTweet);
	}
}