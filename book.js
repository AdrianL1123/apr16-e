const express = require("express");
const app = express();

let books = [
  {
    id: "b1",
    title: "Book One",
    description: "Description of book one",
    authorId: "a1",
  },
  {
    id: "b2",
    title: "Book Two",
    description: "Description of book two",
    authorId: "a2",
  },
];

let reviews = [
  { id: "r1", text: "Amazing book!", bookId: "b1" },
  { id: "r2", text: "Decent read.", bookId: "b2" },
];

let authors = [
  { id: "a1", name: "Author One", bio: "Bio of Author One" },
  { id: "a2", name: "Author Two", bio: "Bio of Author Two" },
];

//* Your routing and controller code goes here
app.get("/books", (request, response) => {
  response.send(books);
});

app.get("/books/:id", (request, response) => {
  //* retrieve the data based on the ID provided
  const book = books.find((i) => i.id === request.params.id);

  if (book) {
    const author = authors.find((a) => a.id === book.authorId);
    const bookAndAuthor = {
      ...book,
      name: author ? author.name : null,
      bio: author ? author.bio : null,
    };
    response.send(bookAndAuthor);
  } else {
  }
});

app.get("/reviews", (request, response) => {
  response.send(reviews);
});

app.get("/reviews/:id", (request, response) => {
  //* retrieve the data based on the ID provided
  const review = reviews.find((i) => i.id === request.params.id);
  if (review) {
    const book = books.find((r) => r.id === review.bookId);
    const reviewWithBook = {
      ...review,
      title: book ? book.title : null,
    };
    response.send(reviewWithBook);
  } else {
  }
});

app.get("/authors", (request, response) => {
  response.send(authors);
});

app.get("/authors/:id", (request, response) => {
  //* retrieve the data based on the ID provided
  const selected = authors.find((i) => i.id === request.params.id);
  response.json(selected);
});

app.listen(5001, () => {
  console.log("Bookstore app is running on port 5001");
});
