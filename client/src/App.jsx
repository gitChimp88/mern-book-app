import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import client from "./contentfulClient";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch MongoDB books
        const mongoRes = await axios.get("http://localhost:5000/books");
        const mongoBooks = mongoRes.data;

        // Fetch Contentful book covers
        const contentfulRes = await client.getEntries({ content_type: "book" });
        const contentfulBooks = contentfulRes.items.map((item) => {
          const fields = item.fields;
          return {
            bookId: fields.bookId,
            coverUrl: fields.bookCover?.fields?.file?.url
              ? "https:" + fields.bookCover.fields.file.url
              : null,
          };
        });

        // Merge Mongo + Contentful by ID
        const mergedBooks = mongoBooks.map((book) => {
          const match = contentfulBooks.find((b) => b.bookId === book._id);
          return {
            ...book,
            coverUrl: match?.coverUrl || null,
          };
        });

        setBooks(mergedBooks);
      } catch (err) {
        console.error("Error loading books:", err);
      }
    };

    fetchBooks();
  }, []);

  console.log("Books - ", books);

  return (
    <div>
      <h1>Book Reviews</h1>
      <BookList books={books} />
    </div>
  );
}

export default App;
