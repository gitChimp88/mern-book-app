import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./components/BookList";

function App() {
  // State to store the list of books
  const [books, setBooks] = useState([]);

  // Fetch books from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data)) // Update state with fetched books
      .catch((err) => console.error("Problem fetching books:", err));
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>Book Reviews</h1>
      <BookList books={books} />
    </div>
  );
}

export default App;
