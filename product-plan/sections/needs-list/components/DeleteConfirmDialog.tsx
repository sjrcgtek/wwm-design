import type { Need } from '../types'

interface DeleteConfirmDialogProps {
  need: Need
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmDialog({ need, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  const hasClaims = need.quantityClaimed > 0

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-sm w-full p-6">
        <h2 className="text-base font-bold text-stone-900 dark:text-stone-50 mb-3">
          Remove "{need.name}"?
        </h2>

        {hasClaims ? (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              This item has {need.quantityClaimed} existing {need.quantityClaimed === 1 ? 'claim' : 'claims'}.
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-relaxed">
              Removing it may affect donors who have already committed to donating this item.
            </p>
          </div>
        ) : (
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
            This item will be permanently removed from the needs list.
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-sm font-semibold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
