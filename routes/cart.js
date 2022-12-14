/* * 👇
 *This cart rout will be used in index.js
 *It creates cart for the new user on registeration
 *It is responsible for getting cart data on login
 *It is responsible for updating cart when product is being added or removed
 */

// require express router
const router = require("express").Router();
// import cart schema
const Cart = require("../models/Cart");
// import Verify token and Authorization after verefication and authroization
const { verifyTokenAndAuthorization } = require("./verifytoken");

//create cart using POST request after verefication and authroization
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.query.id;
  const cart = new Cart({
    userId: userId,
    products: req.body.products,
  });
  try {
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get cart using GET request after verefication and authroization
router.get("/find", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.query.id;
  try {
    const cart = await Cart.findOne({ userId: userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update cart using PUT request after verefication and authroization
router.put("/update", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.query.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cart using DELETE request after verefication and authroization
router.delete("/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.query.id });
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
