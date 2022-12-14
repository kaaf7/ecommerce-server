/* * 👇
 *This verifytoken.js
 *It is responsible for verifying token on login, updating or deleting data
 */

// require jason web token
const jwToken = require("jsonwebtoken");
// verify token taking request, response, and next middlware arguments
const verifyJwtToken = (req, res, next) => {
  // get token from request headers
  const authHeader = req.headers.token;
  // if token exists then verify it with jsonwebtoken using the secret key in .env
  // if verified it means that user is the authenticated user
  // next middlware
  if (authHeader) {
    jwToken.verify(authHeader, process.env.JWT_KEY, (err, user) => {
      //error 403
      if (err) res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } else {
    // error 401
    return res.status(401).json("you are not authenticated");
  }
};
// verify if the user the authenticated user
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyJwtToken(req, res, () => {
    if (req.user._id === req.params.id) {
      next();
    } else {
      res.status(403).json("access is not allowed");
    }
  });
};

// verify if the user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyJwtToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("access is not allowed");
    }
  });
};

module.exports = {
  verifyJwtToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
