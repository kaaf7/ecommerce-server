/* * 👇
 *This authentication rout will be used in index.js
 *It is responsible for authentication of users in case of registeration or login
 *It also creates cart and favorite list when new user is registered
 */

// require express router
const router = require("express").Router();
// require jasob web tomen
const jsonwebtoken = require("jsonwebtoken");
// import User Schema
const User = require("../models/User");
//import Cart Schema
const Cart = require("../models/Cart");
// import Favorite Schema
const Favorite = require("../models/Favorite");
// import CryptoJS to hash passwords
const CryptoJS = require("crypto-js");
// dotenv to hide impoetant keys in .env
const dotenv = require("dotenv");
// activate dotenv
dotenv.config();
// secret jason web token key in .env
const JWT_KEY = process.env.JWT_KEY;
// cryptoJS secret key for password hashing
const SECRET_KEY = process.env.SECRET_KEY;

//post method for registeration using router
router.post("/register", async (req, res) => {
  // use User Schema and assign password to request body.password, body.email, body.password
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    // hash password using cryptoJS and secret Key
    password: CryptoJS.AES.encrypt(req.body.password, SECRET_KEY).toString(),
  });
  try {
    // save new user
    const savedUser = await user.save();
    // get new user id
    const userId = savedUser._id;
    // then asign a new cart schame wth new user id
    const cart = new Cart({
      userId: userId,
    });
    // then asign a new favorite schema wth new user id
    const favorite = new Favorite({
      userId: userId,
    });
    // save new cart
    const savedCart = await cart.save();
    // save new favorites
    const savedFavorite = await favorite.save();
    // send response of new user
    res.status(201).json(savedUser);
  } catch (err) {
    // send response of new user
    return res.status(500).json(err);
  }
});

// post method for login
router.post("/login", async (req, res) => {
  //find user with similar a username like in the request body
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    // if user is not found then send wrong username
    if (!user) {
      return res.status(401).json("wrong username");
    } else {
      // asign accessToken to username and id
      const accessToken = jsonwebtoken.sign(
        {
          id: user._id,
          username: user.username,
          //isAdmin: user.isAdmin,
        },
        // use JWT_KEY and expires in 3 days
        JWT_KEY,
        {
          expiresIn: "3d",
        }
      );
      // decrypt passwword to using secret key and then next will compare it with request body password
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      // switch decrypted Password to original password usingy Utf8 protocol
      const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
      // compare original password with rquest password if not the same then send error
      if (originalPassword !== req.body.password) {
        return res.status(401).json("wrong  password");
      } else if (
        // else if password is not the same and user is not the same
        originalPassword !== req.body.password &&
        user.username !== req.body.username
      ) {
        // return error
        return res.status(401).json("wrong username and password");
      }
      // send all the user data and exlude the password
      const { password, ...others } = user._doc;
      // responde with all data and accessToken
      res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    // respond with error
    return res.status(401).json("something went wrong");
  }
});

module.exports = router;
