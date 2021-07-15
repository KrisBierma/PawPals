const passport = require('../config/passport');
const router = require('express').Router();

router.post('/login2', passport.authenticate('local-login', function(err, req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log('user authenticated');
  // console.log(req);
  console.log("err: ",err);
  console.log("res: ", res);
  if(err) {
    res.json(err);
  }
  console.log("req.session: ",req.session);
  res.json(res.session.user);
}))

// order of events:
// 1. click btn on loginSignUp.jsx
// 2. api comes here
// 3. inside this router.post func
// 4. passport.js strategy
// 5. return here

router.post('/login', function(req, res, next) {
  // step #3 is here
  console.log('----------------------');
  console.log('res.session: ',res.session); // undefined
  console.log('req.session: ',req.session);
  console.log('req.body: ', req.body);  // username and pass


  passport.authenticate('local-login', function(err, user, info) {
    console.log('come here no matter what');
    // step #5 is here
    console.log("err: ",err);
    console.log("user: ", user);
    console.log("info: ", info);

    // db error
    if (err) { 
      return next(err); 
    }

    // no user: invalid or non-registered username/pass
    // info is the error message
    if (!user) {
      return res.json(info); 
    }
    

    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }

      // successful login in, returning success msg
      return res.json(info);
      // return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});



router.post(
  '/login4',
  function (req, res, next) {
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body);
      // step #3
      next()
  },
  passport.authenticate('local-login'),
  (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
          username: req.user.username
      };
      res.send(userInfo);
  }
)

// router.post('/login', (req, res, next) => {
//   console.log("in authRoutes");
//   console.log(req, res, next);
//   passport.authenticate('local-login', function(err, user, info) {
//     console.log(`err: ${err} data: ${user} info: ${info}`);

//     if (err) {
//         res.json(err);
//     } else {
//         req.session.user = user;
//         res.json(req.session.user);
//     }
// })(req, res, next);

//   // usersModel.getUser([req.params.id])
//   //   .then(res => results.status(200).send(res))
//   //   .catch(error => results.status(500).json(error));
// });

module.exports = router;


// other methods attached to req:
// req.login()
// req.logout()
// req.isAuthenticated()
// req.isUnAuthenticated()