export type BookStatus = "Read" | "Reading" | "Want to Read";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: BookStatus;
  cover: string;
}

const STORAGE_KEY = "library-book-tracker";

export const defaultBooks: Book[] = [
  { id: "1", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg" },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg" },
  { id: "3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg" },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg" },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg" },
  { id: "6", title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg" },
  { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
  { id: "8", title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Dystopian", status: "Read", cover: "https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg" },
  { id: "9", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", status: "Reading", cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg" },
  { id: "10", title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", status: "Want to Read", cover: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg" },
];

export function loadBooks(): Book[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveBooks(defaultBooks);
    return defaultBooks;
  }
  return JSON.parse(data);
}

export function saveBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
