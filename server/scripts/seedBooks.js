const mongoose = require("mongoose");
const Book = require("../models/Book");
require("dotenv").config();

const books = [
  { title: "Mesopotamia", author: "Serhiy Zhadan" },
  { title: "Island", author: "Aldous Huxley" },
  { title: "Inherent vice", author: "Thomas Pynchon" },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("✅ Books seeded!");
    process.exit();
  })
  .catch(console.error);
