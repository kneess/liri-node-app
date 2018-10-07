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
var userInput = '';
//for loop to take all words in after the command
for (var i = 3; i < args.length; i++) {

  // Build a string with the user input
  userInput = "'<" + userInput+ " " + args[i] + ">'";
}

switch (command) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify(userInput);
    break;

    case "movie-this":
    movie();
    break;
    
  
  case "do-what-it-says":
    dowhat();
    break;
  }

function tweets() {

  var Twitter = require('twitter');

  var client = new Twitter(keys.twitter);

  var params = { screen_name: '@Anibalicz', count: 20 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Tweets: " + tweets[i].text + "\nCreated at: " + tweets[i].created_at);
      }
      // console.log(tweets[0].text);
    }
  });

}

function spotify() {

  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify);
  //if user doesnt search anything then it searches this song
  if(userInput === '') {
    userInput = "The Sign Ace"
  }

  spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log('Artists: ' + data.tracks.items[0].album.artists[0].name + '\nSong: ' + data.tracks.items[0].name +
      '\nPreview: ' + data.tracks.items[0].preview_url + '\nAlbum: ' + data.tracks.items[0].album.name);
  });
}

function movie() {
  var request = require("request");

  if(userInput === '') {
    userInput = "Mr. Nobody"
  }

  request("http://www.omdbapi.com/?t="+ userInput  +"&plot=short&apikey=trilogy", function(error, response, body) {

    if (!error && response.statusCode === 200) {
      //convenience variable
      var json = JSON.parse(body)
      // console.log(json.Ratings[1].Value)
      console.log('Title: ' +json.Title + '\nYear: ' + json.Year + '\nimdbRating: ' + json.imdbRating + '\nRotten Tomamtoes Rating: ' + json.Ratings[1].Value +
    '\nCountry: ' + json.Country + '\nLanguage: ' + json.Language + '\nPlot: ' + json.Plot + '\nActors: ' + json.Actors);

    }
})
}

function dowhat() {
  var fs = require("fs");

  fs.readFile("random.txt","utf8", function(error,data) {
    if(error) {
      return console.log(error);
    }
    var textFile = data.split(",");
    var command = textFile[0];
    var userInput = textFile[1];
    if(command === "spotify-this-song") {
      spotify(userInput);
    } else if(command === "my-tweets") {
      tweets()
    } else if (command === "movie-this") {
      movie()
    }
  } )
}