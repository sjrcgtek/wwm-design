import { useState } from 'react'
import type { Category, NeedFormValues } from '@/../product/sections/needs-list/types'
import { ImagePicker } from './ImagePicker'

interface AddNeedFormProps {
  categories: Category[]
  onSave: (values: NeedFormValues) => void
  onCancel: () => void
}

const inputClass = 'w-full px-3 py-1.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent'
const labelClass = 'block text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1'

export function AddNeedForm({ categories, onSave, onCancel }: AddNeedFormProps) {
  const [form, setForm] = useState<NeedFormValues>({
    name: '',
    description: '',
    categoryId: categories[0]?.id ?? '',
    quantityNeeded: 1,
    brandPreference: '',
    purchaseUrl: '',
    highPriority: false,
    imageUrl: null,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.name.trim()) onSave(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lime-50 dark:bg-lime-950/20 border border-lime-300 dark:border-lime-900/40 rounded-xl p-4 space-y-3"
    >
      <p className="text-xs font-bold text-lime-800 dark:text-lime-500 uppercase tracking-widest">
        New item
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>Name</label>
          <input
            type="text"
            autoFocus
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Baby Blanket"
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
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
        >
          Add item
        </button>
      </div>
    </form>
  )
}
