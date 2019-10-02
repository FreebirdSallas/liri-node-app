require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");


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

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=43f7938d";

    request(queryUrl, function (err, response, body) {
        if (!value) {
            value = "Mr Nobody";
        }

        var results = JSON.parse(body);

        if (!err && response.statusCode === 200) {
            console.log("Title: " + results.Title);
            console.log("Release Year: " + results.Year);
        }
    });
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

function doWhatItSays(value){
    fs.readFile("random.txt", "utf-8", function(err, buf){
        console.log(buf.toString());
    });
}

// concert search
// the api page for the link in the homework page is not working
// function concertThis(value) {

//     var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=43f7938d";

//     request(queryUrl, function (err, response, body) {
//         if (!value) {
//             value = "Burning Man";
//         }

//         var results = JSON.parse(body)[0];

//         if (!err && response.statusCode === 200) {
//             console.log("City: " + results.venue.city);
//             console.log("Venue Name: " + results.venue.name);
//         }
//     });

// }