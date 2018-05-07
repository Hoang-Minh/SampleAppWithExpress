// link ref: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters

var express = require("express");
var bodyparser = require("body-parser");
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// routes will go here

// req.param: param and not params !!!!
app.get("/api/users", function (req, res) {
    var userId = req.param("id");
    var token = req.param("token");
    var geo = req.param("geo");

    res.send(userId + " " + token + " " + geo);
})

//// http://localhost:8080/api/1
// req.params : there is an s in the param !!!
app.get('/api/:version', function (req, res) {
    res.send(req.params.version);
});

// parameter middleware that will run before the next routes
app.param("name", function(req, res, next, name){
    // check if the user with that name exists
    // do some validation
    // add -due to the name
    var modified = name + "-dude";

    // save name to the request
    req.name = modified;
    next();
});

//// http://localhost:8080/api/users/chris
app.get("/api/users/:name", function(req, res){
    // the user was found and is available in req.user
    res.send("What is up " + req.name + "!");
})

// POST http://localhost:8080/api/users
// parameters sent with 
app.post("/api/users", function(req, res){
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + " " + token + " " + geo);
})

//start the sever
app.listen(port, function (e) {
    if (e) throw e;
    console.log("Server is listening at port " + port);
});