var express = require("express");
// Initialize Express
var app = express();
var mongoose = require("mongoose");

var db = require("./models");

var PORT = 3000;

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

const mlab = "mongodb://admin:bootcamp123@ds125113.mlab.com:25113/trendingreviewapp"
const local = "mongodb://localhost/week18Populater"

mongoose.Promise = Promise;
mongoose.connect(mlab, {
  useMongoClient: true
}).then(
  () => { console.log('connected to mongodb') },
  err => { console.log('error trying to connect to mongodb ' + err) }
);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
