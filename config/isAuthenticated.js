// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  console.log('in auth');
  // If the user is logged in, continue with the request to the restricted route
  if (req.session.user) {
    console.log("is authenticated");
    return next();
  }

  console.log("isn't authenticated");
  // If the user isn't logged in, redirect them to the login page
  return res.redirect('/');
};
