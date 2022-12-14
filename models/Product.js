/* * 👇 
 *This is product Schema
 * it will contain all the  information about the product lik etitle, desriptions, images, etc

*/

const mongoose = require("mongoose");
// create new shcema
const ProductSchema = new mongoose.Schema(
  {
    productTitle: { type: String, required: true, unique: false },
    description: { type: String, required: true },
    category: { type: Array, required: true },
    price: { type: Number, required: true },
    colors: { type: Array, required: true },
    favorite: { type: Boolean, default: false },
    isNew: { type: Boolean, default: true },
    images: { type: Array, required: true },
    video: { typye: String, required: false },
    size: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
