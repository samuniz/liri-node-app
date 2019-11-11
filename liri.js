require("dotenv").config();
var keys= require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify); 
var axios = require("axios"); 

// capture the comand that user puts in 

// argv 
var userCommand = process.argv[2]; 

console.log(userCommand); 

// if or switch statement to check user command 
// check if user command is "concert-this"
// check if user command is "spotify-this-song"
// check if user commands is "movie-this"
// check if user command is "do-what-it-says"

// otherwise, display message to the user "Try again"
