import { useState } from "react";
import axios from "axios";

function BookReviewForm({ bookId }) {
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/books/${bookId}/reviews`, {
        userReview,
        rating: Number(rating),
      });
      setMessage("Review submitted!");
      setUserReview("");
      setRating(5);
    } catch (err) {
      setMessage("Failed to submit review", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <textarea
        value={userReview}
        onChange={(e) => setUserReview(e.target.value)}
        placeholder="Your review..."
        rows={3}
        required
      />
      <br />
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 && "s"}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">Submit Review</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default BookReviewForm;
