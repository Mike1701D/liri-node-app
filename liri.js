//Code to grab data
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var client = new twitter(keys.twitterKeys);
var inquirer = require("inquirer");
var fs = require("fs");

// Prompt the user to accept:  My-tweets OR Spotify-this-song OR Movie-this OR Do-what-it-says
inquirer.prompt([{
        type: "list",
        name: "userInput",
        message: "Choose one of the following:",
        choices: ["My-tweets", "Spotify-this-song", "Movie-this", "Do-what-it-says"]
    }

    // After the prompt, store the user's response in user.userInput
]).then(function(user) {

    // Response based on user.userInput
    switch (user.userInput) {
        case "My-tweets":
            // Function call **twentyTweets**
            twentyTweets();
            // console.log(user.userInput);
            break;

        case "Spotify-this-song":
            // Function call **spotifySong**
            spotifySong();
            // console.log(user.userInput);
            break;

        case "Movie-this":
            // Function call **movie**
            movie();
            // console.log(user.userInput);
            break;

        case "Do-what-it-says":
            // Function call **doThis**
            doThis();
            // console.log(user.userInput);
            break;
    }

    function twentyTweets() {
        var userName = { screen_name: "Multitronic5" };
        var i;
        client.get("statuses/user_timeline", userName, function(error, tweets, response) {
            if (!error) {
                for (i = 0; i < 20; i++) {
                    console.log(tweets[i].text);
                }
            } else { console.log("Error:  " + error); }
        })
    }

    function spotifySong() {
        inquirer.prompt([{
            type: "input",
            name: "spotifyName",
            message: "Which song would you like to Spotify?"
        }]).then(function(user) {
            if (user.spotifyName === "") {
                user.spotifyName = "The Sign";
            }
            var songTitle = user.spotifyName;
            console.log("Spotifying:  " + songTitle);
            var client = new spotify({
                id: "cb6d39f8c56049a4b3cf12d71262a002",
                secret: "3dcea1da91bc4729a2f3f5e2426be695"
            });
            client.search({ type: "track", query: songTitle }, function(error, data) {
                if (!error) {
                    console.log("Artist Name:  " + data.tracks.items[0].artists[0].name);
                    console.log("Song Name:  " + data.tracks.items[0].name);
                    console.log("Preview Link:  " + data.tracks.items[0].external_urls.spotify);
                    console.log("Album:  " + data.tracks.items[0].album.name);
                } else { console.log("Error:  " + error); }
            })
        });
    }

    function movie() {
        inquirer.prompt([{
            type: "input",
            name: "movieName",
            message: "Which movie would you like to search?"
        }]).then(function(user) {
            if (user.movieName === "") {
                console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
            } else {
                var queryURL = "https://www.omdbapi.com/?t=" + user.movieName + "&y=&plot=short&apikey=40e9cece";
                request(queryURL, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var body = JSON.parse(body);
                        console.log("Movie Title:  " + body.Title);
                        console.log("Year:  " + body.Year);
                        console.log("IMDB Rating:  " + body.imdbRating);
                        console.log("Rotten Tomatoes Rating:  " + body.tomatoRating);
                        console.log("Country of Origin:  " + body.Country);
                        console.log("Language:  " + body.Language);
                        console.log("Movie Plot:  " + body.Plot);
                        console.log("Actors:  " + body.Actors);
                    } else { console.log("Error:  " + error); }
                })
            }
        });
    }

    function doThis() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log("Error:  " + error);
            }
            var spotifyN = data;
            console.log("Spotifying:  " + spotifyN);
            var client = new spotify({
                id: "cb6d39f8c56049a4b3cf12d71262a002",
                secret: "3dcea1da91bc4729a2f3f5e2426be695"
            });

            client.search({ type: "track", query: spotifyN }, function(error, data) {
                if (!error) {
                    console.log("Artist Name:  " + data.tracks.items[0].artists[0].name);
                    console.log("Song Name:  " + data.tracks.items[0].name);
                    console.log("Preview Link:  " + data.tracks.items[0].external_urls.spotify);
                    console.log("Album:  " + data.tracks.items[0].album.name);
                } else { console.log("Error:  " + error); }
            })
        })
    }
});