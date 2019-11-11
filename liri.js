require("dotenv").config();
var keys= require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify); 
var axios = require("axios"); 

// capture the comand that user puts in 

// argv 
var userCommand = process.argv[2]; 
// var userRequest = process.argv[3]

console.log(userCommand); 


// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var userRequest = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    userRequest = userRequest + "+" + nodeArgs[i];
  } else {
    userRequest += nodeArgs[i];

  }
} 

console.log("This is user Request ", userRequest); 

// if or switch statement to check user command 
  // run API call using Axios to bands in town API
  // inject the user's search term i que queryURL
    // see instructions
    // Display name of venue, venue location and the date of the event(use moment to format the date  MM/DD/yyyt)

// check if user command is "concert-this"

// check if user command is "spotify-this-song"

// check if user commands is "movie-this"

// check if user command is "do-what-it-says"


// fallback function 
// otherwise, display message to the user "Try again"
