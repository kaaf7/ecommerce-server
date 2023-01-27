/* * 👇
 *This is server side index.js
 *It will connect to PORT and MongoDB server
 *It will connect all routes with URI
 */

const mongoose = require("mongoose");
// import user rout
const userRout = require("./routes/user");
// import auth rout
const authRout = require("./routes/auth");
// import product rout
const productRout = require("./routes/product");
// import order rout
const orderRout = require("./routes/order");
// import cart rout
const cartRout = require("./routes/cart");
// import favorite rout
const favoriteRout = require("./routes/favorite");
// require express
const express = require("express");
// call express
const app = express();
// require cross origin middleware
const cors = require("cors");
// use cors
app.use(cors());
//use express json
app.use(express.json());
// require dotenv
const dotenv = require("dotenv");
// activate dotenv
dotenv.config();
// get port from .env
const PORT = process.env.PORT;
// get URI from .env
const URI = process.env.URI;
// listen to PORT
app.listen(PORT, () => {
  console.log("connected");
});
// connect to mongoDB server and console connected
mongoose
  .connect(URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
// get api
app.get("/api", (req, res) => {
  res.send("API");
});
// use all routs
app.use("/api", userRout);
app.use("/api/auth", authRout);
app.use("/api/products", productRout);
app.use("/api/orders", orderRout);
app.use("/api/cart", cartRout);
app.use("/api/favorite", favoriteRout);
