var fs = require('fs');
var Spotify = require('spotify-web-api-node');
var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');


var arg2 = process.argv[2];
var arg3 = process.argv[3];

function differentParamFunction() {
    switch (arg2) {
        case "my-tweets":
            twitter();
            break;
        case "movie-this":

            if(arg3 == undefined){
                arg3 = 'The Town';
            }
            movie();
             break;
             // i changed the name of the do-what-it-says cause i kept forgetting what i was trying to do there
        case "read-random":
            readMeRandom();
            break;
        case "spotify-this-song":
            console.log(arg3)
            break;
        default:
            console.log('invalid entry');
    }
}

// function to read what is in the random.txt file
function readMeRandom() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log(error);
        } else {
            var dataArray = data.split(",");
            arg2 = dataArray[0];
            arg3 = dataArray[1];
        }
        differentParamFunction();

    }); //fs ends here
}

// function to grab my info from my favorite movie the town
function movie() {
        var query_url = "http://www.omdbapi.com/?t=" + arg3 + "&y=&plot=long&tomatoes=true&r=json";

        request(query_url, function (error, data, body) {
            if (error) {
                console.log(error)
            }
            // parses all JSON data and grabs what i need from the body which is the Title
            console.log("Title: " + JSON.parse(body).Title);
            // same as above but release date
            console.log("Release Date: " + JSON.parse(body).Released);
            // etc
            console.log("Country: " + JSON.parse(body).Country);
            //etc
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            console.log("********************" + "\n");

        });
}

function twitter(){
    var client = new Twitter({
    	// this code grabs my info from the keys.js file
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret:  keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    //twitter params
    var parameters = {
        twitterHandle: 'JaeGomez_',
        count: 21
    };
    //get tweets from twitter
    client.get("statuses/user_timeline", parameters, function(error, tweets, response){
        if (!error && response.statusCode == 200) {
            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text + "Written on:" + tweets[i].created_at + "\n");
            }
            console.log("__END__" + "\n");
        } else {
            console.log(error);
        }

    });
}

//call main function 
differentParamFunction();