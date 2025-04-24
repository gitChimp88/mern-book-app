import { useState } from "react";
import axios from "axios";

function BookReviewForm({ bookId }) {
  // State for form
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send review to backend
      await axios.post(`http://localhost:3000/books/${bookId}/reviews`, {
        userReview,
        rating: Number(rating),
      });
      // Show success message and reset form
      setMessage("Review submitted!");
      setUserReview("");
      setRating(5);
    } catch (err) {
      console.error("Review submission failed:", err);
      setMessage("Failed to submit review");
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
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <br />
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ marginTop: "0.5rem", padding: "0.25rem" }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 && "s"}
          </option>
        ))}
      </select>
      <br />
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Submit Review
      </button>
      {message && <p style={{ marginTop: "0.5rem" }}>{message}</p>}
    </form>
  );
}

export default BookReviewForm;
