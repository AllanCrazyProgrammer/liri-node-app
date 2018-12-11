require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");

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
                console.log(JSON.stringify(response.data[1].offers, null, 2));
                console.log(queryUrl);
            }
        )


        break;

    default:
        break;
}