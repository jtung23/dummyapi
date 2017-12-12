var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
// Initialize Express
var app = express();
var mongoose = require("mongoose");

var db = require("./models");

var PORT = 3000;

app.get("/reviews", function(req, res) {
  // Grab every document in the Review collection
  db.Review
    .find({})
    .then(function(dbReview) {
      // If we were able to successfully find Reviews, send them back to the client
      res.json(dbReview);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/createreviews", function(req, res){

	let result = {};

	result.title = 'testing out this review title';
	result.link = 'testing out this review link';

	db.Review
        .create(result)
        .then(function(dbReview) {
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Review Created");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
})

app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article
    .find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/createarticle", function(req, res){

	let result = {};

	result.title = 'testing out this title create route2';
	result.link = 'testing out this link create route2';

	db.Article
        .create(result)
        .then(function(dbArticle) {
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Article Created");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
})

app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article
    .find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/createarticle", function(req, res){

	let result = {};

	result.title = 'testing out this title create route2';
	result.link = 'testing out this link create route2';

	db.Article
        .create(result)
        .then(function(dbArticle) {
          // If we were able to successfully scrape and save an Article, send a message to the client
          res.send("Article Created");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });
})

APIlookup = (url, params, header) => {
    return axios.get(url, {
        params: params,
        headers: header
      }
    )
  };

runGoogleAPI = () => {
    // add URL here
    const url = "https://maps.googleapis.com/maps/api/place/details/json";

    const params = {
      // input api key here and edit/add params
      "key": "AIzaSyAI3ZBCPyqDGRp9S20p7xisIcIfJrHhSGI",
      "placeid": "ChIJG11cU-_Kj4AR3fVk1bLWsYQ"
    };

    APIlookup(url, params)
      .then(res => {
        // console.log(res);
        console.log(res.data.result.id);
        console.log(res.data.result.name);

        let result = {};
        
        result.title = res.data.result.id;
		result.link = res.data.result.name;

        db.Article
        .create(result)
        .then(function(dbArticle) {
          // If we were able to successfully scrape and save an Article, send a message to the client
          console.log("Google places object created");
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          // res.json(err);
          console.log("error" + err)
        });
      })
      .catch(err => console.log(err))
};

runGoogleAPI();

//database connections to pass through to mongoose.connect
const mlab = "mongodb://admin:bootcamp123@ds125113.mlab.com:25113/trendingreviewapp"
const local = "mongodb://localhost/trendingreviewapp"

//add mongoose promise features
mongoose.Promise = Promise;
//mongodb connection with error catch if unable to connect
const url = local;
mongoose.connect(url, {
  useMongoClient: true
}).then(
  () => { console.log('connected to mongodb') },
  err => { console.log('error trying to connect to mongodb ' + err) }
);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
