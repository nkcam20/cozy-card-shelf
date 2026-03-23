import { useState, useEffect } from "react";
import { Book, BookStatus } from "@/lib/books";
import { X } from "lucide-react";

interface Props {
  book?: Book | null;
  onSave: (book: Omit<Book, "id"> & { id?: string }) => void;
  onClose: () => void;
}

const statuses: BookStatus[] = ["Read", "Reading", "Want to Read"];

export function BookForm({ book, onSave, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<BookStatus>("Want to Read");
  const [cover, setCover] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setStatus(book.status);
      setCover(book.cover);
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onSave({
      ...(book ? { id: book.id } : {}),
      title: title.trim(),
      author: author.trim(),
      genre: genre.trim() || "General",
      status,
      cover: cover.trim() || `https://placehold.co/300x450/e2e8f0/64748b?text=${encodeURIComponent(title.trim())}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-card rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 border border-border"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-card-foreground">
            {book ? "Edit Book" : "Add Book"}
          </h2>
          <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-secondary text-muted-foreground">
            <X size={20} />
          </button>
        </div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author *" required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Cover image URL (optional)" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <select value={status} onChange={(e) => setStatus(e.target.value as BookStatus)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          {book ? "Save Changes" : "Add Book"}
        </button>
      </form>
    </div>
  );
}
