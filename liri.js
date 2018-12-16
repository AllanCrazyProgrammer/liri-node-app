require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require('fs-extra');


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

                console.log("\n Concert date: " + moment(response.data[1].datetime).format("MM-DD-YYYY"));
            }
        )
        break;

    case "spotify-this-song":

        var song = process.argv[3];
        var defaultSong = "The sign";

        if (song === undefined) {
            song = defaultSong;
        }

        spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
        });
        break;

    case "movie-this":
        var movie = process.argv[3];
        var defaultMovie = "Mr. Nobody";
        if (movie === undefined) {
            movie = defaultMovie;
        }
        var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&type=movie&t=" + movie;

        axios.get(queryUrl).then(
            function (response) {
                console.log(queryUrl);
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("Rating: " + response.data.imdbRating);
                console.log("Rotten tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
        break;

    case "do-what-it-says":

        fs.readFile("random.txt", "utf-8", function (err, data) {
            console.log(data);
            var dataArray = (data.split('"'));
            var command = dataArray[0];
            
            if (command == "spotify-this-song") {
                console.log("here");

                var song = '"' + dataArray[1] + '"';
                var defaultSong = "The sign";

                if (song === undefined) {
                    song = defaultSong;
                }

                spotify.search({ type: 'track', query: song, limit: 5 }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Album: " + data.tracks.items[0].album.name);
                    console.log("Preview: " + data.tracks.items[0].preview_url);
                });

            }

            //console.log("node liri.js " + command + " " + '"' + instruction + '"');
        })

        break;
    default:
        break;
}