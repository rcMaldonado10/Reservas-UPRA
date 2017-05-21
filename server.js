var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var admin = require("./routes/admin");
var reservations = require("./routes/reservations");

var port = 3000;

var app = express();

//View Engine
app.set("views", path.join(__dirname, "src"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, "client")));

//Body Body Parser MW (Middle Ware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use("/", index);
app.use("/api", admin);
app.use("/api", reservations); 

app.listen(port, function() {
    console.log("Started on port " + port);
});