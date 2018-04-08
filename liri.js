require("dotenv").config();


 var keys = require("./keys");

 var spotifyid = keys.spotify.id;
 var spotifysecret = keys.spotify.secret;
console.log(spotifysecret);
//  var client = new Twitter(keys.twitter);

var command = process.argv[2];

var args = process.argv;

 var userInput ='';

 for (var i = 3; i < args.length; i++) {

  // Build a string with the address.
  userInput = userInput + " " + args[i];  
}

 switch (command) {
  case "my-tweets":
  tweets();
    break;
 }
//   case "spotify-this-song":
//     spotify();
//     break;
  
//   case "movie-this":
//     movie();
//     break;
  
//   case "do-what-it-says":
//     dowhat();
//     break;
//   }

  // function tweets() {
    
  // } 


