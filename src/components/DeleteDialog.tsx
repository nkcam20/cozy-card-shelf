interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="bg-card rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4 border border-border text-center">
        <h3 className="font-display text-lg font-semibold text-card-foreground">Delete Book?</h3>
        <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors font-medium">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-semibold hover:opacity-90 transition-opacity">Delete</button>
        </div>
      </div>
    </div>
  );
}
