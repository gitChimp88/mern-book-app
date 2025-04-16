import { useState } from "react";
import axios from "axios";
import BookReviewForm from "./BookReviewForm";

function BookList({ books }) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState({});
  const [reviews, setReviews] = useState({});

  const toggleReviews = async (bookId) => {
    if (visibleReviews[bookId]) {
      setVisibleReviews((prev) => ({ ...prev, [bookId]: false }));
      return;
    }

    // If reviews aren't loaded yet, fetch them
    if (!reviews[bookId]) {
      try {
        const res = await axios.get(
          `http://localhost:5000/books/${bookId}/reviews`
        );
        setReviews((prev) => ({ ...prev, [bookId]: res.data }));
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    }

    setVisibleReviews((prev) => ({ ...prev, [bookId]: true }));
  };

  return (
    <div style={{ display: "flex" }}>
      {books.map((book) => (
        <div
          key={book._id}
          style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}
        >
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            />
          )}
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <button onClick={() => setSelectedBookId(book._id)}>
            Leave a review
          </button>
          <button onClick={() => toggleReviews(book._id)}>
            {visibleReviews[book._id] ? "Hide reviews" : "See reviews"}
          </button>

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
