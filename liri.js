require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");


var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "concert-this":
        concertThis(value);
        break;

    case "spotify-this-song":
        spotifyThisSong(value);
        break;

    case "movie-this":
        movieThis(value);
        break;

    case "do-what-it-says":
        doWhatItSays(value);
        break;

    default:
        outputData("That is not a command that I recognize, please try again.")
}
console.log("searching for: " + action);

// movie function
function movieThis(value) {

    var queryUrl = "http://www.omdbapi.com/?s=" + value + "&y=&plot=short&apikey=43f7938d";

    request(queryUrl, function (err, response, body) {
        if (!value) {
            value = "Mr Nobody";
        }

        var results = JSON.parse(body);

        if (!err && response.statusCode === 200) {
            console.log("Title: " + results.Tile);
            console.log("Release Year: " + results.Year);
        }

    })
}

// song function
function spotifyThisSong(value) {

    var spotify = new Spotify(keys.spotify);

    if (!value) {
        value = "Gold On The Ceiling"
    }

    spotify.search({ type: "track", query: value, limit: 1 }, function (err, data) {
        // If there is an error log it.
        if (err) {
            console.log(err);
        }
        // console.log(data);
        var songInfo = data.tracks.items;
        console.log("Artist(s): " + songInfo[0].artists[0].name);
        console.log("Song: " + songInfo[0].name);
    });
}

