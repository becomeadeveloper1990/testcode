const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// Set up the partials page for static partials (header, footer, etc)
hbs.registerPartials(__dirname + "/views/partials");
// Set up a view engine for Handlebars
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintenance");
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// Set up a folder for static files.  Such as stylesheets and JavaScript files
app.use(express.static(__dirname + '/public'));
// Express route for the root folder
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my home page!"
  });
});

// app.get("/search", (req, res) => {
//   res.render("search");
// })
//
// app.get("/cardinfo", (req, res) => {
//   var name = req.body.cardName;
//   console.log(name);
  // request("https://www.ygohub.com/api/card_info?name=" + name, (error, response, body) => {
    // res.render("cardview", {
    //   pageTitle: name.card[0].name,
//       welcomeMessage: "Card view!",
//       img: name.card[0].image_path,
//       currentYear: new Date().getFullYear()
//     });
//   });
// });

// Express route for the about page
app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page",
    welcomeMessage: "Welcome to my about page!"
  });
});
// Express router for the bad page
app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "This page is non-existent, nerd!"
  });
});
// Express will run on port 3000
app.listen(port, () => {
  console.log(`The server has started on ${port}`);
});
