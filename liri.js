require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');


var commands = process.argv[2];

var spotifyId = process.env.SPOTIFY_ID;
var spotifySecret = process.env.SPOTIFY_SECRET;

var spotify = new Spotify({
    id: spotifyId,
    secret: spotifySecret
});

switch (commands) {
    case "concert-this":
        var artist = process.argv[3];
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

        axios.get(queryUrl).then(
            function (response) {
                console.log("\n Name of the concert: " + response.data[1].venue.name);
                
                console.log("\n Location of the concert: " + response.data[1].venue.country + ", " + response.data[1].venue.city);

                console.log("\n Concert date: " + moment( response.data[1].datetime).format( "MM-DD-YYYY"));

            }
        )


        break;

    default:
        break;
}