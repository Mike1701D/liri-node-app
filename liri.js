//Code to grab data
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("spotify");
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
    
    function twentyTweets(){
    	var userName = {screen_name:  "Multitronic5"};
    	var i;
	    client.get("statuses/user_timeline", userName, function(err, tweets, response){
    		if(!err){
    			for (i = 0; i < 20; i++){
    				console.log(tweets[i].text);
    			}
    		} else {console.log("Error");}
   		})
	}

    function spotifySong() {
  		inquirer.prompt([{
                    type: "input",
                    name: "spotifyName",
                    message: "Which song would you like to Spotify?"
                }
        ]).then(function(user) {
        	if (user.spotifyName === "") {
        		user.spotifyName = "The Sign";
        	}
        	console.log("Spotifying:  " + user.spotifyName);
   			var queryURL = "https://api.spotify.com/v1/search?q=name:" + user.spotifyName + "&type=artist Authorization: Bearer {6575ba0fd5a44e01a5fd2d41a7feb659}";
        	request(queryURL, function (error, response, body){
    			if(!error){
      			console.log("Artist Name:  " + body.artist);
      			console.log("Song Name:  " + body.song);
      			console.log("Preview Link:  " + body.preview_url);
      			console.log("Album:  " + body.album);
      			} else {console.log("Error");}
      		})
        });
    }

    function movie() {
        inquirer.prompt([{
                    type: "input",
                    name: "movieName",
                    message: "Which movie would you like to search?"
                }
        ]).then(function(user) {
        	if (user.movieName === "") {
        		console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
        		console.log("It's on Netflix!");        		
        	} else {
        		var queryURL = "https://www.omdbapi.com/?t=" + user.movieName + "&y=&plot=short&apikey=40e9cece";
        		request(queryURL, function (error, response, body){
    			
    				if(!error && response.statusCode == 200){
      				var body = JSON.parse(body);
      				console.log("Movie Title:  " + body.Title);
      				console.log("Year:  " + body.Year);
      				console.log("IMDB Rating:  " + body.imdbRating);
      				console.log("Rotten Tomatoes Rating:  " + body.tomatoRating);
      				console.log("Country of Origin:  " + body.Country);
      				console.log("Language:  " + body.Language);
      				console.log("Movie Plot:  " + body.Plot);
      				console.log("Actors:  " + body.Actors);
      				} else {console.log("Error");}
      			})
          	}
        });
    }

    function doThis() {
		fs.readFile("random.txt", "utf8", function(err, data) {
    		if (err) {
      		return console.log(err);
    		}
    	var spotifyN = data;
		console.log("Spotifying:  " + spotifyN);
        var queryURL = "https://api.spotify.com/v1/search?q=name:" + spotifyN + "&type=artist Authorization: Bearer {6575ba0fd5a44e01a5fd2d41a7feb659}";
        request(queryURL, function (error, response, body){
    		if(!error){
      		console.log("Artist Name:  " + body.artist);
      		console.log("Song Name:  " + body.song);
      		console.log("Preview Link:  " + body.preview_url);
      		console.log("Album:  " + body.album);
      		} else {console.log("Error");}
      	});
    	});
    }
});