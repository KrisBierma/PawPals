const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");
const routes = require('./animalRoutes');

// API Routes
// router.use("/api", apiRoutes);
router.use(routes);

// If no API routes are hit, send the React app 
// to-do: move all routes here or leave some in server??
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;