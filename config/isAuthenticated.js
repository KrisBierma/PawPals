// This is middleware to check if a user is logged in or not
// returns next function if logged in, rtns false if not

module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.session.passport && req.session.passport.user) {
    return next();
  }

  return res.send(false);
};
