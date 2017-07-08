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

stream.on('follow', followed);

//my followed function - this is what happens when I follow/get followed basically:

function followed(eventMsg) { //need eventMsg from api doc to get the name of the person 
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	if (screenName !== 'dev_meelosh') {
		tweetIt('.@' + screenName + ' thanks for following!')
	} else {
		console.log("Something went wrong! Oops!");
	}
	console.log("Followed event triggered!");
}