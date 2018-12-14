require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require('fs');
var moment = require('moment');

var getKeys = require("./keys.js");

var spotify = new Spotify(getKeys.spotify);

var spotifyThis = function(search) {
    var songSearch;
    if (!search) {
        songSearch = "The Sign";
    } else {
        songSearch = search;
    } 

    spotify.search({ type: 'track', query: songSearch, limit:1 }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
        console.log("Song Name: " + data.tracks.items[0].name); //fix to get song name 
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name); //fix to get artist name 
        console.log("Album: " + data.tracks.items[0].album.name); //fix to get album name 
        console.log("Link: " + data.tracks.items[0].external_urls.spotify); //fix to get preview link

    });
}

var movieThis = function(search) {
    var movieName;
    if (!search) {
        movieName = "Mr. Nobody";
    } else {
        movieName = search.replace(" ", "+");
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl)
    .then(function (response) {
        console.log("\nMovie Title: " + response.data.Title);
        console.log("Released Date: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Countries Released: " + response.data.Country);
        console.log("Languages: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    })
    .catch(function (error) {
        console.log(error);
    });
}

var concertThis = function(search) {
    var artistName = search;
    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    
    axios.get(queryUrl)
    .then(function (response) {
        var dateMoment = moment(response.data[0].datetime).format("MM/DD/YYYY");
        console.log(artistName + "'s " + "next concert is at...");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
        console.log("Date: " + dateMoment);
    })
    .catch(function (error) {
        console.log(error);
    });
}

var doWhat = function() {
    var content;

    fs.readFile("./random.txt", 'utf8', function read(err, data) {

        if (err) {

            throw err;

        }

        content = data.split(",");

        if (content[0] == "spotify-this-song") {
            spotifyThis(content[1]); 
            console.log(content[1])
        } else if (content[0] == "movie-this") {
            movieThis(content[1]);
        } else if (content[0] == "concert-this") {
            concertThis(content[1]);
        }
    });
}

switch(process.argv[2]) {
    case "movie-this": //case to console log information about a given movie
        movieThis(process.argv[3]);

        break;

    case "concert-this": //case to find the next concert this artist plays
        concertThis(process.argv[3]);

        break;

    case "spotify-this-song":
        spotifyThis(process.argv[3]);

        break;

    case "do-what-it-says":
        doWhat();
        break;
}