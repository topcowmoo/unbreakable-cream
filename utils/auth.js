
const withAuth = (req, res, next) => {
    
    if (!req.session.logged_in) {
      // If the user is not logged in, redirect them to the login page
      res.redirect("/login");
    } else {
      // If the user is logged in, continue with the next middleware
      next();
    }
  };
  module.exports = withAuth;