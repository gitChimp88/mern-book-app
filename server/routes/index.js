const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Review = require("../models/Review");

// GET /books - Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// GET /books/:id/reviews - Get reviews for a specific book
router.get("/books/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.id });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// POST /books/:id/reviews - Submit a review for a book
router.post("/books/:id/reviews", async (req, res) => {
  try {
    const { userReview, rating } = req.body;

    if (!userReview || typeof rating !== "number") {
      return res.status(400).json({ error: "Invalid review data" });
    }

    const review = new Review({
      book: req.params.id,
      userReview,
      rating,
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" });
  }
});

module.exports = router;
