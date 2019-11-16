require("dotenv").config();
var keys= require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify); 
var axios = require("axios"); 
var moment = require('moment');
var fs = require("fs");

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
/* FUNCTIONS */
function mySpotify(){
  spotify.search({ type: 'track', query: userRequest }, 
  function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for (var i= 0; i < data.tracks.items.length; i++) {
      var spotifyData = data.tracks.items[i];
      var songData = 
      "------------------------------------------" +
      "\nArtist: " + spotifyData.artists[0].name + 
      "\n Song: " + spotifyData.name + 
      "\n Spotify Link: " + spotifyData.album.spotify +
      "\nAlbum: " + spotifyData.album.name + 
      "\n------------------------------------------";

      console.log(songData); 
    }
    
  });
};

// if or switch statement to check user command 
switch (userCommand) {
  case "concert-this":
     var queryUrl = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp"; 
     console.log(queryUrl);
      
     axios.get(queryUrl).then(
       function(response) { 

      //loop to show me how many, inside the loop I log the date, venue ... (same for spotify)
      for (var i= 0; i < response.data.length; i++) {
        var jsonData = response.data[i];
        var concertData = 
        "------------------------------------" +
          "\nVenue: " + jsonData.venue.name +
          "\nLocation: " + jsonData.venue.country + jsonData.venue.region + jsonData.venue.country +
          "\nDate: " + moment(jsonData.venue.datetime).format("MM/DD/YYYY") + 
          "\n------------------------------------";
        console.log(concertData);
        }
        
       });
    break;

  case "spotify-this-song":
    // console.log("This is the spotify switch case");
       console.log("This is the user request", userRequest);
       if(userRequest.length == 0){
         userRequest= "The Sign Ace of Base";
       }
      mySpotify();
       
       break; 



  case "movie-this":
      if(userRequest.length == 0){
        userRequest= "Mr Nobody";
      }
      var queryUrl = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";
      // This line is just to help us debug against the actual URL.
      console.log(queryUrl);
      
      axios.get(queryUrl).then(
        function(response) {
          var movieData =
          "------------------------------------------" +
          "\nTitle: " + response.data.Title +
          "\nRelease Year: " + response.data.Year +
          "\nIMDB Rating: " + response.data.imdbRating +
          "\nCountry: " + response.data.Country +
          "\nLanguage: " + response.data.Language +
          "\nPlot: " + response.data.Plot +
          "\nActors: " + response.data.Actors +
          "\nRotten Tomatoes: " + response.data.Ratings[1] + 
          "\n------------------------------------------";

          console.log(movieData); 

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
  
   case "do-what-it-says":
      fs.readFile('./random.txt',"utf-8", function (err, data) {
        
        if (err) throw err;
        // console.log(data.split(","));
        userRequest= data.split(",")[1];
        console.log(userRequest);
        mySpotify();
      });
     break; 
      

  default: 
    console.log("Try again!"); 
    
}  

/* function that logs the user request */
var fs = require("fs");
fs.appendFile("log.txt", userRequest + "\n", function(error) {
  if (error) {
    return console.log(error);
  }
  console.log("log.txt was updated!");

});
  

