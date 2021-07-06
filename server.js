const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const routes = require("./routes");
const cors = require("cors");
const results = require('dotenv').config();

// if(results.error) console.log(results.error)
// else console.log(results.parsed);

app.use(express.json());

// to-do: might need this uncommented for heroku; also in animalsController.js
// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config();
// };

// app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// api routes before all else
app.use(routes);

// create a GET route   to-do: delete this later
app.get('/connectToServer', (req, res) => {
  res.send({ express: 'The backend is connect to the frontend' });
});

app.use(express.static(path.join(__dirname, 'client/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// start server
app.listen(port, function() {
  console.log("Server listening on port ", port);
});