/* * 👇
 *This is Favorite Schema
 *It will contain userId and an array of products, also quantity
 *It will be used to get user's favorite items whenever they login
 */

const mongoose = require("mongoose");
// create new shcema
const FavoriteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    favorites: [],
    quantity: { type: Number, required: false },
  },
  { timestamps: true }
);

// delete the pre assigned _id which is assigned by mongoDB and use userId instead
FavoriteSchema.set("toJSON", {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.id;
  },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
