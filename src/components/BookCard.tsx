import { Book } from "@/lib/books";
import { StatusBadge } from "./StatusBadge";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onEdit, onDelete }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <StatusBadge status={book.status} />
        <h3 className="font-display font-semibold text-card-foreground leading-tight line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="text-xs text-muted-foreground/70">{book.genre}</p>
        <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(book)} className="p-2 rounded-lg bg-secondary hover:bg-accent text-muted-foreground transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={() => onDelete(book.id)} className="p-2 rounded-lg bg-secondary hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
