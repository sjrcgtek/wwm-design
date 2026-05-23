import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import type { Commitment, CommitmentFormValues } from '../types'

interface CommitmentRowProps {
  commitment: Commitment
  /** When true, hides the item name — used inside a grouped item header */
  insideGroup?: boolean
  onToggleFulfilled?: (id: string, fulfilled: boolean) => void
  onUpdate?: (id: string, values: CommitmentFormValues) => void
  onDelete?: (id: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const inputClass = 'w-full px-3 py-1.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent'
const labelClass = 'block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1'

export function CommitmentRow({ commitment, insideGroup, onToggleFulfilled, onUpdate, onDelete }: CommitmentRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [form, setForm] = useState<CommitmentFormValues>({
    donorName: commitment.donorName,
    donorEmail: commitment.donorEmail,
    quantityCommitted: commitment.quantityCommitted,
    note: commitment.note ?? '',
  })

  function handleSave() {
    onUpdate?.(commitment.id, form)
    setIsEditing(false)
  }

  if (isDeleting) {
    const wrapper = insideGroup
      ? 'px-4 py-3 bg-red-50 dark:bg-red-950/20 flex items-center justify-between gap-4 flex-wrap'
      : 'px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-4 flex-wrap'
    return (
      <div className={wrapper}>
        <p className="text-sm text-red-700 dark:text-red-400">
          Remove <span className="font-semibold">{commitment.donorName}</span>'s{' '}
          {insideGroup ? 'commitment' : <>commitment to <span className="font-semibold">{commitment.itemName}</span></>}?
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setIsDeleting(false)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete?.(commitment.id)}
            className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    )
  }

  if (isEditing) {
    const wrapper = insideGroup
      ? 'bg-amber-50 dark:bg-amber-950/20 p-4 space-y-3'
      : 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 space-y-3'
    return (
      <div className={wrapper}>
        <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
          Editing — {commitment.donorName}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Donor name</label>
            <input
              type="text"
              autoFocus
              value={form.donorName}
              onChange={e => setForm(f => ({ ...f, donorName: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.donorEmail}
              onChange={e => setForm(f => ({ ...f, donorEmail: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Quantity</label>
            <input
              type="number"
              min={1}
              value={form.quantityCommitted}
              onChange={e => setForm(f => ({ ...f, quantityCommitted: parseInt(e.target.value) || 1 }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Note <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <input
              type="text"
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="e.g. dropping off Sunday"
              className={inputClass}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  const outerClass = insideGroup
    ? `group flex items-center gap-3 px-4 py-3 transition-all ${
        commitment.fulfilled
          ? 'bg-stone-50 dark:bg-stone-900/60'
          : 'bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/40'
      }`
    : `group flex items-center gap-3 px-4 py-3 border rounded-xl transition-all ${
        commitment.fulfilled
          ? 'bg-stone-50 dark:bg-stone-900/60 border-stone-100 dark:border-stone-800/60'
          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm'
      }`

  return (
    <div className={outerClass}>
      {/* Fulfill toggle */}
      <button
        onClick={() => onToggleFulfilled?.(commitment.id, !commitment.fulfilled)}
        className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          commitment.fulfilled
            ? 'bg-lime-700 border-lime-700'
            : 'border-stone-300 dark:border-stone-600 hover:border-lime-600 dark:hover:border-lime-500'
        }`}
        title={commitment.fulfilled ? 'Mark as pending' : 'Mark as fulfilled'}
      >
        {commitment.fulfilled && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {!insideGroup && (
          <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
            <span className={`text-sm font-semibold truncate ${
              commitment.fulfilled
                ? 'text-stone-400 dark:text-stone-500 line-through'
                : 'text-stone-900 dark:text-stone-100'
            }`}>
              {commitment.itemName}
            </span>
            {commitment.quantityCommitted > 1 && (
              <span className="text-xs text-stone-400 dark:text-stone-500 tabular-nums shrink-0">
                ×{commitment.quantityCommitted}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs truncate ${insideGroup ? 'text-stone-700 dark:text-stone-300 font-medium' : 'text-stone-500 dark:text-stone-400'}`}>
            {commitment.donorName}
          </span>
          <span className="text-stone-200 dark:text-stone-700 shrink-0">·</span>
          <span className="text-xs text-stone-400 dark:text-stone-500 truncate">
            {commitment.donorEmail}
          </span>
          {insideGroup && commitment.quantityCommitted > 1 && (
            <>
              <span className="text-stone-200 dark:text-stone-700 shrink-0">·</span>
              <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0">
                ×{commitment.quantityCommitted}
              </span>
            </>
          )}
        </div>
        {commitment.note && (
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 truncate">
            {commitment.note}
          </p>
        )}
      </div>

      {/* Right side */}
      <div className="shrink-0 flex items-center gap-2.5">
        <span className="text-xs text-stone-400 dark:text-stone-500 tabular-nums hidden sm:block">
          {formatDate(commitment.claimedAt)}
        </span>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Edit"
          >
            <Pencil size={13} strokeWidth={2} />
          </button>
          <button
            onClick={() => setIsDeleting(true)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
