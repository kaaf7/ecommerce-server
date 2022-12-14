/* * 👇
 *This favorite rout will be used in index.js
 *It creates favorite list for the new user on registeration
 *It is responsible for getting favorite products on login
 *It is responsible for updating favorites when product is being added or removed
 */

// require express router
const router = require("express").Router();
// import Favorite schema
const Favorite = require("../models/Favorite");
// import Verify token and Authorization
const { verifyTokenAndAuthorization } = require("./verifytoken");

//add favorite using POST request after verefication and authroization
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
  const qUserId = req.query.id;
  const favorite = new Favorite({
    userId: qUserId,
    favorites: req.body.favorites,
    _id: qUserId,
  });

  try {
    const savedFavorite = await favorite.save();
    res.status(200).json(savedFavorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get favorite using GET request
router.get("/findfavorite", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.query.id });
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update favorite using PUT request
router.put("/updatefavorite", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateFavorite = await Favorite.findOneAndUpdate(
      { userId: req.query.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateFavorite);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete favorite using DELETE request
router.delete("/get/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({ userId: req.query.id });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
