// To add protected endpoints, we are leveraging the middleware pattern Express uses. For that we will create the authentication middleware first
// has only one role if the user is authenticated (has the right cookies); it simply calls the next middleware. Otherwise it redirects to the page where the user can log in.

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  };
}

module.exports = authenticationMiddleware;