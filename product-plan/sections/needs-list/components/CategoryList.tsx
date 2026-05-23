import { useState, useMemo } from 'react'
import { Plus, GripVertical, Pencil, Trash2 } from 'lucide-react'
import type { CategoryListProps, Category } from '../types'

const inputClass = 'flex-1 px-3 py-1.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent'

export function CategoryList({ categories, needs, onAddCategory, onUpdateCategory, onDeleteCategory }: CategoryListProps) {
  const [localCategories, setLocalCategories] = useState<Category[]>(categories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingLabel, setEditingLabel] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const itemCountByCategory = useMemo(() => {
    const map = new Map<string, number>()
    needs.forEach(n => map.set(n.categoryId, (map.get(n.categoryId) ?? 0) + 1))
    return map
  }, [needs])

  function startEdit(cat: Category) {
    setEditingId(cat.id)
    setEditingLabel(cat.label)
    setShowAddForm(false)
    setDeletingId(null)
  }

  function saveEdit() {
    if (!editingId || !editingLabel.trim()) return
    setLocalCategories(prev =>
      prev.map(c => c.id === editingId ? { ...c, label: editingLabel.trim() } : c)
    )
    onUpdateCategory?.(editingId, editingLabel.trim())
    setEditingId(null)
  }

  function saveAdd() {
    if (!newLabel.trim()) return
    const newCat: Category = { id: `cat-${Date.now()}`, label: newLabel.trim() }
    setLocalCategories(prev => [...prev, newCat])
    onAddCategory?.(newLabel.trim())
    setNewLabel('')
    setShowAddForm(false)
  }

  function confirmDelete(id: string) {
    setLocalCategories(prev => prev.filter(c => c.id !== id))
    onDeleteCategory?.(id)
    setDeletingId(null)
  }

  const totalItems = needs.length

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
            Coordinator
          </p>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Categories
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {localCategories.length} {localCategories.length === 1 ? 'category' : 'categories'} · {totalItems} total items
          </p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null); setDeletingId(null) }}
          className="flex items-center gap-1.5 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold rounded-lg transition-colors shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add category
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {localCategories.map(cat => {
          const count = itemCountByCategory.get(cat.id) ?? 0

          if (deletingId === cat.id) {
            return (
              <div
                key={cat.id}
                className="px-4 py-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    Remove "{cat.label}"?
                  </p>
                  {count > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
                      {count} {count === 1 ? 'item is' : 'items are'} assigned to this category and will become uncategorized.
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(cat.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          }

          if (editingId === cat.id) {
            return (
              <div
                key={cat.id}
                className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl px-4 py-3 flex items-center gap-3"
              >
                <input
                  type="text"
                  autoFocus
                  value={editingLabel}
                  onChange={e => setEditingLabel(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditingId(null) }}
                  className={inputClass}
                />
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors shrink-0"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors shrink-0"
                >
                  Save
                </button>
              </div>
            )
          }

          return (
            <div
              key={cat.id}
              className="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm transition-all"
            >
              <div className="shrink-0 text-stone-300 dark:text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                <GripVertical size={16} strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {cat.label}
                </span>
              </div>

              <span className="text-xs font-medium text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full tabular-nums shrink-0">
                {count} {count === 1 ? 'item' : 'items'}
              </span>

              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(cat)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  title="Edit"
                >
                  <Pencil size={13} strokeWidth={2} />
                </button>
                <button
                  onClick={() => { setDeletingId(cat.id); setEditingId(null) }}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          )
        })}

        {/* Add form */}
        {showAddForm && (
          <div className="bg-lime-50 dark:bg-lime-950/20 border border-lime-300 dark:border-lime-900/40 rounded-xl px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              autoFocus
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveAdd(); if (e.key === 'Escape') { setShowAddForm(false); setNewLabel('') } }}
              placeholder="Category name…"
              className={inputClass}
            />
            <button
              onClick={() => { setShowAddForm(false); setNewLabel('') }}
              className="px-3 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors shrink-0"
            >
              Cancel
            </button>
            <button
              onClick={saveAdd}
              className="px-3 py-1.5 text-xs font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors shrink-0"
            >
              Add
            </button>
          </div>
        )}

        {/* Empty state */}
        {localCategories.length === 0 && !showAddForm && (
          <div className="text-center py-20">
            <div className="text-3xl mb-4">🗂️</div>
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">No categories yet</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              Add a category to start organizing your needs list.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Add first category
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
