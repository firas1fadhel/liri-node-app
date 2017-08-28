var keys = require("./keys.js");
var request = require('request')
var fs = require('fs');
var spotify = require('spotify');
var action = process.argv[2];
var value = process.argv[3];
var movieName = value ;
var movieDefault = "Mr. Nobody";
if(movieName == null){movieName = movieDefault};


var params = {screen_name: 'FirasteeS',count: 20};
switch(action){
case 'my-tweets':
 twitter();
break;
case 'spotify-this-song':
spotifySong();
break;
case 'movie':
movie(movieName);
break;
case 'do-what-it-says':
whateverThisIs();
break;
default:
console.log("I can't Understand You. Please try again.");
break;



};
function twitter(){
    var Twitter = require('twitter');
    
   var client = new Twitter(keys.twitterKeys)
    
  
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
        console.log('My Last 20 Tweets: ');
         for(var i =0 ; i<20 ;i++){
            
            console.log('--------------------------');
            console.log(tweets[i].text);
            console.log('Time Posted: ' + tweets[i].created_at)
            

         }
       
     }
     else {console.log(error);}
   });
}


function spotifySong(value) {
    if (value === undefined){
      value = "The Sign by Ace of Base"; 
    }
  
    spotify.search(
      {
        type: "track", 
        query:  value 
      }, 
  
       function(err, data) {
        console.log('data',data)
          if (err) {
            console.log('Error occurred: ' + err);
            return;
          }
  
      
        var spotifyCall = data.tracks.items;
  
        for (var i =0; i<spotifyCall.length; i++){
            
            console.log("Spotify Song Information");
            var artist = spotifyCall.artists.name;
            console.log("Artist: " + artist);
            var song = spotifyCall.name;
            console.log("Song name: " + song);
            var preview = spotifyCall.preview_url;
            console.log("Preview Link: " + preview);
            var album = spotifyCall.album.name;
            console.log("Album: " + album);
  
      }
      
      });
  }
  var movieName = value ;
  var movieDefault = "Mr. Nobody";
  if(movieName == null){movieName = movieDefault};
  
  function movie (argument){
      console.log("_______"+ argument)
      
      
     request("http://www.omdbapi.com/?t="+argument+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        
          // If the request is successful (i.e. if the response status code is 200)
          if (!error && response.statusCode === 200) {
        
            console.log("OMDB Movie Information")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            

          }
        });
  }
  function whateverThisIs(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
      var i = Math.floor(Math.random() * 4)
      movieName=txt[i]
      console.log(movieName);
  
      movie(movieName);
    });
  }

  