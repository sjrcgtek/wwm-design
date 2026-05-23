import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { NeedsListProps, Need, NeedFormValues } from '../types'
import { NeedRow } from './NeedRow'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'
import { AddNeedForm } from './AddNeedForm'

export function NeedsList({ categories, needs, onUpdateNeed, onAddNeed, onDeleteNeed }: NeedsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingNeed, setDeletingNeed] = useState<Need | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [localNeeds, setLocalNeeds] = useState<Need[]>(needs)

  const highPriorityNeeds = useMemo(
    () => localNeeds.filter(n => n.highPriority),
    [localNeeds]
  )

  const groupedNeeds = useMemo(
    () =>
      categories
        .map(cat => ({
          ...cat,
          items: localNeeds.filter(n => n.categoryId === cat.id && !n.highPriority),
        }))
        .filter(cat => cat.items.length > 0),
    [categories, localNeeds]
  )

  const fullyClaimed = localNeeds.filter(n => n.quantityClaimed >= n.quantityNeeded).length

  function handleSave(needId: string, values: NeedFormValues) {
    setLocalNeeds(prev =>
      prev.map(n =>
        n.id === needId
          ? { ...n, ...values, brandPreference: values.brandPreference || null }
          : n
      )
    )
    onUpdateNeed?.(needId, values)
    setEditingId(null)
  }

  function handleAdd(values: NeedFormValues) {
    const newNeed: Need = {
      id: `need-${Date.now()}`,
      ...values,
      brandPreference: values.brandPreference || null,
      purchaseUrl: values.purchaseUrl || null,
      quantityClaimed: 0,
    }
    setLocalNeeds(prev => [...prev, newNeed])
    onAddNeed?.(values)
    setShowAddForm(false)
  }

  function handleTogglePriority(needId: string) {
    setLocalNeeds(prev =>
      prev.map(n => n.id === needId ? { ...n, highPriority: !n.highPriority } : n)
    )
    const need = localNeeds.find(n => n.id === needId)
    if (need) {
      onUpdateNeed?.(needId, {
        name: need.name,
        description: need.description,
        categoryId: need.categoryId,
        quantityNeeded: need.quantityNeeded,
        brandPreference: need.brandPreference ?? '',
        purchaseUrl: need.purchaseUrl ?? '',
        highPriority: !need.highPriority,
      })
    }
  }

  function handleConfirmDelete() {
    if (!deletingNeed) return
    setLocalNeeds(prev => prev.filter(n => n.id !== deletingNeed.id))
    onDeleteNeed?.(deletingNeed.id)
    setDeletingNeed(null)
  }

  const isEmpty = localNeeds.length === 0

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
            Coordinator
          </p>
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Needs List
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            {localNeeds.length} item{localNeeds.length !== 1 ? 's' : ''}
            {localNeeds.length > 0 && (
              <> · <span className="text-lime-700 dark:text-lime-500">{fullyClaimed} fully claimed</span></>
            )}
          </p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null) }}
          className="flex items-center gap-1.5 px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold rounded-lg transition-colors shrink-0"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add item
        </button>
      </div>

      {/* Empty state */}
      {isEmpty && !showAddForm ? (
        <div className="text-center py-20">
          <div className="text-3xl mb-4">📋</div>
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">No items yet</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
            Start building your needs list by adding the first item.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-lime-700 hover:bg-lime-800 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Add first item
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {highPriorityNeeds.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-3 h-3 text-amber-500 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  High Priority
                </h2>
                <span className="text-xs text-stone-300 dark:text-stone-600">{highPriorityNeeds.length}</span>
              </div>
              <div className="space-y-2">
                {highPriorityNeeds.map(need => (
                  <NeedRow
                    key={need.id}
                    need={need}
                    categories={categories}
                    isEditing={editingId === need.id}
                    onEdit={() => { setEditingId(need.id); setShowAddForm(false) }}
                    onSave={values => handleSave(need.id, values)}
                    onCancel={() => setEditingId(null)}
                    onDelete={() => setDeletingNeed(need)}
                    onTogglePriority={() => handleTogglePriority(need.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {groupedNeeds.map(cat => (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  {cat.label}
                </h2>
                <span className="text-xs text-stone-300 dark:text-stone-600">{cat.items.length}</span>
              </div>
              <div className="space-y-2">
                {cat.items.map(need => (
                  <NeedRow
                    key={need.id}
                    need={need}
                    categories={categories}
                    isEditing={editingId === need.id}
                    onEdit={() => { setEditingId(need.id); setShowAddForm(false) }}
                    onSave={values => handleSave(need.id, values)}
                    onCancel={() => setEditingId(null)}
                    onDelete={() => setDeletingNeed(need)}
                    onTogglePriority={() => handleTogglePriority(need.id)}
                  />
                ))}
              </div>
            </section>
          ))}

          {showAddForm && (
            <AddNeedForm
              categories={categories}
              onSave={handleAdd}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </div>
      )}

      {deletingNeed && (
        <DeleteConfirmDialog
          need={deletingNeed}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingNeed(null)}
        />
      )}
    </div>
  )
}
