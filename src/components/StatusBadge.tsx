import { BookStatus } from "@/lib/books";

const statusStyles: Record<BookStatus, string> = {
  "Read": "bg-status-read-bg text-status-read",
  "Reading": "bg-status-reading-bg text-status-reading",
  "Want to Read": "bg-status-want-bg text-status-want",
};

export function StatusBadge({ status }: { status: BookStatus }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
