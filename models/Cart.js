/* * 👇 
 *This is Cart Schema 
 *it will contain userId and an array of products, also quantity
*It will be used to get user's cart items whenever they login

*/

const mongoose = require("mongoose");
// create new schema
const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [],
    quantity: { type: Number, required: false },
  },
  { timestamps: true }
);
// delete the pre assigned _id which is assigned by mongoDB and use userId instead
CartSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.id;
  },
});

module.exports = mongoose.model("Cart", CartSchema);
