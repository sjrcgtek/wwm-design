import { useState } from 'react'
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react'
import type { Quote, QuoteManagerProps } from '@/../product/sections/public-registry/types'

const inputClass = 'w-full px-3 py-1.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent'
const labelClass = 'block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1'

function QuoteRow({ quote, onUpdate, onDelete }: {
  quote: Quote
  onUpdate?: (id: string, text: string, attribution: string) => void
  onDelete?: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState(quote.text)
  const [attribution, setAttribution] = useState(quote.attribution)

  function handleSave() {
    if (text.trim() && attribution.trim()) {
      onUpdate?.(quote.id, text.trim(), attribution.trim())
      setIsEditing(false)
    }
  }

  if (isDeleting) {
    return (
      <div className="px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-red-700 dark:text-red-400">Remove this quote?</p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setIsDeleting(false)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onDelete?.(quote.id)}
            className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 space-y-3">
        <div>
          <label className={labelClass}>Quote text</label>
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className={labelClass}>Attribution</label>
          <input
            type="text"
            value={attribution}
            onChange={e => setAttribution(e.target.value)}
            placeholder="e.g. St. Teresa of Calcutta"
            className={inputClass}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => { setText(quote.text); setAttribution(quote.attribution); setIsEditing(false) }}
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

  return (
    <div className="group flex items-start gap-3 px-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm italic text-stone-700 dark:text-stone-300 leading-relaxed mb-1">
          "{quote.text}"
        </p>
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          — {quote.attribution}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
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
  )
}

export function QuoteManager({ quotes, onAddQuote, onUpdateQuote, onDeleteQuote }: QuoteManagerProps) {
  const [showAdd, setShowAdd] = useState(false)
  const [newText, setNewText] = useState('')
  const [newAttribution, setNewAttribution] = useState('')

  function handleAdd() {
    if (newText.trim() && newAttribution.trim()) {
      onAddQuote?.(newText.trim(), newAttribution.trim())
      setNewText('')
      setNewAttribution('')
      setShowAdd(false)
    }
  }

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
          Public Registry
        </p>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">
          Inspirational Quotes
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          One of these quotes is shown at random at the top of the donor registry.
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {quotes.map(quote => (
          <QuoteRow
            key={quote.id}
            quote={quote}
            onUpdate={onUpdateQuote}
            onDelete={onDeleteQuote}
          />
        ))}
        {quotes.length === 0 && !showAdd && (
          <p className="text-sm text-stone-400 dark:text-stone-500 text-center py-8">
            No quotes yet. Add one below.
          </p>
        )}
      </div>

      {showAdd ? (
        <div className="bg-lime-50 dark:bg-lime-950/20 border border-lime-300 dark:border-lime-900/40 rounded-xl p-4 space-y-3">
          <p className="text-xs font-bold text-lime-800 dark:text-lime-500 uppercase tracking-widest">
            New quote
          </p>
          <div>
            <label className={labelClass}>Quote text</label>
            <textarea
              autoFocus
              value={newText}
              onChange={e => setNewText(e.target.value)}
              rows={3}
              placeholder="Enter the quote..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className={labelClass}>Attribution</label>
            <input
              type="text"
              value={newAttribution}
              onChange={e => setNewAttribution(e.target.value)}
              placeholder="e.g. St. Teresa of Calcutta"
              className={inputClass}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => { setShowAdd(false); setNewText(''); setNewAttribution('') }}
              className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
            >
              Add quote
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 w-full px-4 py-3 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-xl text-sm font-medium text-stone-400 dark:text-stone-500 hover:border-stone-300 dark:hover:border-stone-600 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
        >
          <Plus size={15} strokeWidth={2} />
          Add a quote
        </button>
      )}
    </div>
  )
}
