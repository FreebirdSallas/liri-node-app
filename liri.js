require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api")


var runAction = function(func, parm) {
    switch (func) {
        case "concert-this":
            concertThis(parm)
            break
        case "spotify-this-song":
            spotifyThisSong(parm)
            break
        case "movie-this":
            movieThis(parm)
            break
        case "do-what-it-says":
            doWhatItSays()
            break
        default:
            outputData("That is not a command that I recognize, please try again.") 
    }
}

var spotifyThisSong = function(song){
    // Default should be "Gold on the cieling" by The Black Keys
    if (!song){
        song = "Gold On The Ceiling The Black Keys"
    }

var spotify = new Spotify(keys.spotify);

spotify.search({ type: "track", query: song, limit: 1}, function(err, result) {

    // If there is an error log it.
    if (err) {
      console.log(err);
    }
  
    console.log(JSON.stringify(result, null, 2));
  
  });
}

runAction(process.argv[2],process.argv[3]);
