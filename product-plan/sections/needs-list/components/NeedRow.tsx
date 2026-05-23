import { useState } from 'react'
import { GripVertical, Pencil, Trash2, Star, X } from 'lucide-react'
import type { Need, Category, NeedFormValues } from '../types'
import { ImagePicker } from './ImagePicker'

interface NeedRowProps {
  need: Need
  categories: Category[]
  isEditing: boolean
  onEdit: () => void
  onSave: (values: NeedFormValues) => void
  onCancel: () => void
  onDelete: () => void
  onTogglePriority: () => void
}

const inputClass = 'w-full px-3 py-1.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent'
const labelClass = 'block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1'

export function NeedRow({ need, categories, isEditing, onEdit, onSave, onCancel, onDelete, onTogglePriority }: NeedRowProps) {
  const [form, setForm] = useState<NeedFormValues>({
    name: need.name,
    description: need.description,
    categoryId: need.categoryId,
    quantityNeeded: need.quantityNeeded,
    brandPreference: need.brandPreference ?? '',
    purchaseUrl: need.purchaseUrl ?? '',
    highPriority: need.highPriority,
    imageUrl: need.imageUrl ?? null,
  })

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const claimed = need.quantityClaimed
  const total = need.quantityNeeded
  const fullyClaimed = claimed >= total

  if (isEditing) {
    return (
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className={labelClass}>Name</label>
            <input
              type="text"
              autoFocus
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={form.categoryId}
              onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
              className={inputClass}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Quantity needed</label>
            <input
              type="number"
              min={1}
              value={form.quantityNeeded}
              onChange={e => setForm(f => ({ ...f, quantityNeeded: parseInt(e.target.value) || 1 }))}
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>
              Brand / store preference{' '}
              <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <input
              type="text"
              value={form.brandPreference}
              onChange={e => setForm(f => ({ ...f, brandPreference: e.target.value }))}
              placeholder="e.g. Carter's or similar"
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>
              Where to buy link{' '}
              <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <input
              type="url"
              value={form.purchaseUrl}
              onChange={e => setForm(f => ({ ...f, purchaseUrl: e.target.value }))}
              placeholder="https://amazon.com/..."
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>
              Photo <span className="font-normal text-stone-400">(optional)</span>
            </label>
            <ImagePicker value={form.imageUrl} onChange={url => setForm(f => ({ ...f, imageUrl: url }))} />
          </div>
          <div className="col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.highPriority}
                onChange={e => setForm(f => ({ ...f, highPriority: e.target.checked }))}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Mark as high priority
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {lightboxOpen && need.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X size={18} />
          </button>
          <img
            src={need.imageUrl}
            alt={need.name}
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    <div
      className="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm transition-all cursor-pointer"
      onClick={onEdit}
    >
      <div
        className="shrink-0 text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        onClick={e => e.stopPropagation()}
      >
        <GripVertical size={16} strokeWidth={2} />
      </div>

      {need.imageUrl && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setLightboxOpen(true) }}
          className="shrink-0 w-12 h-12 rounded-lg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-lime-700"
        >
          <img
            src={need.imageUrl}
            alt={need.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </button>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
            {need.name}
          </span>
          {need.brandPreference && (
            <span className="shrink-0 text-xs font-medium text-amber-600 dark:text-amber-400">
              ✦ {need.brandPreference}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-400 dark:text-stone-500 truncate">{need.description}</p>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <span className="text-xs font-medium tabular-nums text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
          {total} needed
        </span>
        <span className={`text-xs font-medium tabular-nums px-2 py-0.5 rounded-full ${
          fullyClaimed
            ? 'text-lime-800 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/40'
            : claimed > 0
              ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40'
              : 'text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-800/60'
        }`}>
          {claimed} claimed
        </span>

        <button
          onClick={e => { e.stopPropagation(); onTogglePriority() }}
          className={`p-1.5 rounded-lg transition-colors ${
            need.highPriority
              ? 'text-amber-500 dark:text-amber-400'
              : 'text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 hover:text-amber-400 dark:hover:text-amber-500'
          }`}
          title={need.highPriority ? 'Remove high priority' : 'Mark as high priority'}
        >
          <Star size={13} strokeWidth={2} fill={need.highPriority ? 'currentColor' : 'none'} />
        </button>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={e => { e.stopPropagation(); onEdit() }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Edit"
          >
            <Pencil size={13} strokeWidth={2} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete() }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
