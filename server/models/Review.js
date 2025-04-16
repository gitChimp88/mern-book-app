// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  userReview: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema);
