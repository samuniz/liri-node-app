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

// Create an empty variable for holding the user request
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

// console.log("This is user Request ", userRequest); 


// if or switch statement to check user command 
switch (userCommand) {
  case "concert-this":
     var queryUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp"; 
     console.log(queryUrl);
      
     axios.get(queryUrl).then(
       function(response) { 

      //loop to show me how many, inside the loop I log the date, venue ... (same for spotify)
      for (i= 0; i < response.data.length; i++) {
        var jsonData = response.data[i];
        var concertData = 
          "Venue: " + jsonData.venue.name +
          "\nLocation: " + jsonData.venue.country + jsonData.venue.region + jsonData.venue.country +
          "\nDate: " + jsonData.venue.date;
       

        console.log(concertData);
        }
        
       });
    break;

  case "spotify-this-song":
    console.log("This is the spotify switch case");
      spotify.search({ type: 'track', query: 'All the Small Things' }, 
      function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0]); 
      });
       break; 


  case "movie-this":
      var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";
      // This line is just to help us debug against the actual URL.
      console.log(queryUrl);
      
      axios.get(queryUrl).then(
        function(response) {
          console.log("Title: " + response.data.Title)
          console.log("Release Year: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log("Rotten Tomatoes: ", response.data.Ratings[1]); 
        })

        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    break; 
    
  default: 
    console.log("no command"); 
    
}  
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
