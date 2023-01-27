/* * 👇
 *This product rout will be used in index.js
 *It creates single product or multiple products using post method
 *It is responsible for getting single products or all products
 *It is responsible for updating single product or all products
 */

// require express router
const router = require("express").Router();
// import product schema
const Product = require("../models/Product");
// verify token and admin
const { verifyTokenAndAdmin } = require("./verifytoken");
//get single product by Id using GET request
router.get("/allproducts/product", async (req, res) => {
  const qProductId = req.query.id;
  try {
    const product = await Product.findById(qProductId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products using GET request
router.get("/allproducts", async (req, res) => {
  const qCategory = req.query.category;
  let products;
  if (qCategory) {
    products = await Product.find({
      category: { $in: [qCategory] },
    });
  } else {
    products = await Product.find();
  }
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add products using POST request after verification of token and if user is an admin
router.post("/allproducts", verifyTokenAndAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product using PUT request after verification of token and if user is an admin
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,

      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete product using DELETE request after verification of token and if user is an admin
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedProduct);
  try {
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
