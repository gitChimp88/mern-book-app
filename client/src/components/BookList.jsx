import { useState } from "react";
import axios from "axios";
import BookReviewForm from "./BookReviewForm";

function BookList({ books }) {
  // State to track which books review form is open
  const [selectedBookId, setSelectedBookId] = useState(null);
  // State to track the visibility of reviews per book
  const [visibleReviews, setVisibleReviews] = useState({});
  // Store fetched reviews per book
  const [reviews, setReviews] = useState({});

  const toggleReviews = async (bookId) => {
    // Hide reviews if already visible
    if (visibleReviews[bookId]) {
      setVisibleReviews((prev) => ({ ...prev, [bookId]: false }));
      return;
    }

    // Fetch books if not already loaded
    if (!reviews[bookId]) {
      try {
        const res = await axios.get(
          `http://localhost:3000/books/${bookId}/reviews`
        );
        setReviews((prev) => ({ ...prev, [bookId]: res.data }));
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }

    // Show reviews
    setVisibleReviews((prev) => ({ ...prev, [bookId]: true }));
  };

  return (
    <div style={{ display: "flex" }}>
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            border: "1px solid #ccc",
            margin: "1rem 0",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>{book.title}</h2>
          <p>{book.author}</p>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <button onClick={() => setSelectedBookId(book._id)}>
              Leave a review
            </button>
            <button onClick={() => toggleReviews(book._id)}>
              {visibleReviews[book._id] ? "Hide reviews" : "See reviews"}
            </button>
          </div>

          {selectedBookId === book._id && <BookReviewForm bookId={book._id} />}

          {visibleReviews[book._id] && reviews[book._id] && (
            <div style={{ marginTop: "1rem" }}>
              <h4>Reviews:</h4>
              {reviews[book._id].length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <ul>
                  {reviews[book._id].map((rev) => (
                    <li key={rev._id}>
                      {rev.rating} stars – {rev.userReview}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookList;
