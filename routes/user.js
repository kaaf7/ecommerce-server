/* * 👇
 *This user rout will be used in index.js
 *It register a new user using post method
 *It is responsible for getting single user
 *It is responsible for updating or deleting a signle user
 */



// require express router
const router = require("express").Router();
// import CryptoJS to hash passwords
const CryptoJS = require("crypto-js");
// dotenv to hide impoetant keys in .env
const dotenv = require("dotenv");
// activate dotenv
dotenv.config();
// import User Schema
const User = require("../models/User");
// password secret key from .env
const SECRET_KEY = process.env.SECRET_KEY;

// import verify token, Authorization, and Admin
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifytoken");

// get user by id using GET request
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json("error");
  }
});

// update user using PUT request
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      SECRET_KEY
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json("error");
  }
});

// delete user using DELETE request
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    res.status(600).json("error");
  }
});
module.exports = router;
