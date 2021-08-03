// required modules
const { urlencoded } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
var axios = require("axios").default;
const querystring = require('querystring');
const { URLSearchParams } = require("url");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());


// get methods
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/sucess", function (req, res) {
    res.render("sucess");
});

app.get("/database", function (req, res) {
    axios.get("https://newsletter-rest-api.herokuapp.com/users")
        .then(function (response) {
            // console.log(response.data);
            res.render("database", { data: response.data });
        })
        .catch(function (error) {
            console.error(error);
        });
})


// post methods
app.post("/", function (req, res) {
    var options = {
        method: 'POST',
        url: 'https://newsletter-rest-api.herokuapp.com/users',
        headers: {
            'content-type': "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams(req.body)
    };

    axios.request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });

    res.redirect("/sucess");
})

// server listening
app.listen(process.env.PORT || 3000, () => console.log("server is running on port 3000"))
