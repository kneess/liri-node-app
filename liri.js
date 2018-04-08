require("dotenv").config();

//importing information from keys file
 var keys = require("./keys");
//spotify keys 
//  var spotifyid = keys.spotify.id;
//  var spotifysecret = keys.spotify.secret;
//  var Tkey = keys.twitter.consumer_key;
//  var Tsecret = keys.twitter.consumer_secret;
//  var Ttoken = keys.twitter.access_token_key;
//  var Ttokensecret = keys.twitter.access_token_secret;
//  var spotify = new Spotify(keys.spotify);
//  var client = new Twitter(keys.twitter);
//  console.log(spotify);
//taking input from the console
var command = process.argv[2];

var args = process.argv;
//save the user input
 var userInput ='';
//for loop to take all words in after the command
 for (var i = 3; i < args.length; i++) {

  // Build a string with the user input
  userInput = userInput + " " + args[i];  
}

 switch (command) {
  case "my-tweets":
  tweets();
    break;
 
  case "spotify-this-song":
    spotify();
    break;
 }
//   case "movie-this":
//     movie();
//     break;
  
//   case "do-what-it-says":
//     dowhat();
//     break;
//   }
   
  function tweets() {
  
  var Twitter = require('twitter');
  var client = new Twitter(keys.twitter);
  var params = {screen_name: '@Anibalicz', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log("Tweets: " +tweets[i].text + "\nCreated at: " +tweets[i].created_at);
    }
    // console.log(tweets[0].text);
  }
});

  } 

  function spotify() {
    
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify(keys.spotify);
 
    spotify.search({ type: 'track', query: 'milkshake', limit: 1 })
    .then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });
  }


