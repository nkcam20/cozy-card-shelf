import { useState, useMemo } from "react";
import { Book, BookStatus, loadBooks, saveBooks } from "@/lib/books";
import { BookCard } from "@/components/BookCard";
import { BookForm } from "@/components/BookForm";
import { DeleteDialog } from "@/components/DeleteDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, BookOpen, BookMarked, Eye, Library } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const filters: (BookStatus | "All")[] = ["All", "Read", "Reading", "Want to Read"];

export default function Index() {
  const [books, setBooks] = useState<Book[]>(loadBooks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BookStatus | "All">("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const persist = (updated: Book[]) => { setBooks(updated); saveBooks(updated); };

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (filter !== "All" && b.status !== filter) return false;
      if (search) {
        const q = search.toLowerCase();
        return b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      }
      return true;
    });
  }, [books, filter, search]);

  const stats = useMemo(() => ({
    total: books.length,
    read: books.filter((b) => b.status === "Read").length,
    reading: books.filter((b) => b.status === "Reading").length,
    want: books.filter((b) => b.status === "Want to Read").length,
  }), [books]);

  const handleSave = (data: Omit<Book, "id"> & { id?: string }) => {
    if (data.id) {
      persist(books.map((b) => (b.id === data.id ? { ...b, ...data } as Book : b)));
    } else {
      persist([...books, { ...data, id: crypto.randomUUID() } as Book]);
    }
  };

  const handleDelete = () => {
    if (deleteId) persist(books.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  const statCards = [
    { label: "Total Books", value: stats.total, icon: Library, color: "text-primary" },
    { label: "Read", value: stats.read, icon: BookMarked, color: "text-status-read" },
    { label: "Reading", value: stats.reading, icon: BookOpen, color: "text-status-reading" },
    { label: "Want to Read", value: stats.want, icon: Eye, color: "text-status-want" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">📚 My Library</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your reading journey</p>
          </div>
          <button
            onClick={() => { setEditBook(null); setFormOpen(true); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Plus size={18} /> Add Book
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
              <s.icon size={22} className={s.color} />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No books found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filter, or add a new book.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={(b) => { setEditBook(b); setFormOpen(true); }}
                  onDelete={(id) => setDeleteId(id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {formOpen && (
        <BookForm
          book={editBook}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditBook(null); }}
        />
      )}
      {deleteId && <DeleteDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
