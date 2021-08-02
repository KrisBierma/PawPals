const  db = require('../controllers/postgresPool');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { authQ } = require('../controllers/queries.js');

// messages
const invalidUsername = 'The username is incorrect or not registered.';
const invalidPass = 'The password is incorrect.';

function validPassword(pass1, pass2) {
  if(pass1.localeCompare(pass2) === 0) 
    return true;
  return false;
}

passport.use('local-login', new LocalStrategy(
  function(username, password, done) {
    db.query(authQ.login, [username], (error, user) => {
      // db error
      if(error) {
        return done(error);
      };

      // user error - username
      if(user.rowCount === 0) {
        return done(null, false, { statuscode: 401, message: invalidUsername})
      }

      if (!validPassword(password, user.rows[0].password)) {
        return done(null, false, { statuscode: 401, message: invalidPass });
      }

      // success
      return done(null, user.rows[0], { statuscode: 200, message: 'Success' });
    })
  }
));

passport.use('local-signup', new LocalStrategy(
  {
    passReqToCallback: true
  },
  function(req, username, password, done) {
    const {role, email} = req.body;
    db.query(authQ.addUser, [role, username, password, email], (error, user) => {
      if(user === undefined) 
        return done(null, false, {statuscode: 401, message: invalidUsername});

      // db error
      if(error) {
        return done(error);
      };

      // fill in user details (only id gets returned from db)
      // so session will have necessary info
      var userOut = {};
      userOut.id = user.rows[0].id;
      userOut.userroleid = role;
      userOut.username = username;
      userOut.email = email;

      // success
      return done(null, userOut, { statuscode: 200, message: 'Yup' });     
    })
  }
));

// In order to help keep authentication state across HTTP requests,
// Just consider this part boilerplate needed to make it all work
// accesses the user obj, determines what data should be stored in session
// the result is attached to the session as req.session.passport.user = {serialised obj}
// result also attached to req.user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// invoked every req by passport.session; enables loading additional user info
// on every req
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;