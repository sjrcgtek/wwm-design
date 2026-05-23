import { useState, useMemo } from 'react'
import type { DonorCommitmentsProps, Commitment, CommitmentFormValues, FulfillmentFilter } from '@/../product/sections/donor-commitments/types'
import { CommitmentRow } from './CommitmentRow'

export function DonorCommitments({ commitments, onToggleFulfilled, onUpdateCommitment, onDeleteCommitment }: DonorCommitmentsProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FulfillmentFilter>('all')
  const [localCommitments, setLocalCommitments] = useState<Commitment[]>(commitments)

  const fulfilledCount = localCommitments.filter(c => c.fulfilled).length
  const pendingCount = localCommitments.filter(c => !c.fulfilled).length

  const itemTotals = useMemo(() => {
    const map = new Map<string, { needed: number; committed: number; donorCount: number }>()
    localCommitments.forEach(c => {
      const existing = map.get(c.itemId)
      if (existing) {
        existing.committed += c.quantityCommitted
        existing.donorCount += 1
      } else {
        map.set(c.itemId, { needed: c.itemQuantityNeeded, committed: c.quantityCommitted, donorCount: 1 })
      }
    })
    return map
  }, [localCommitments])

  const itemsCovered = useMemo(
    () => Array.from(itemTotals.values()).filter(({ needed, committed }) => committed >= needed).length,
    [itemTotals]
  )

  const grouped = useMemo(() => {
    let result = [...localCommitments].sort(
      (a, b) => new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime()
    )
    if (filter === 'pending') result = result.filter(c => !c.fulfilled)
    if (filter === 'fulfilled') result = result.filter(c => c.fulfilled)
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        c => c.donorName.toLowerCase().includes(q) || c.itemName.toLowerCase().includes(q)
      )
    }

    // Group by item, preserving order of first appearance (newest first)
    const map = new Map<string, { itemId: string; itemName: string; itemQuantityNeeded: number; rows: Commitment[] }>()
    result.forEach(c => {
      if (!map.has(c.itemId)) {
        map.set(c.itemId, { itemId: c.itemId, itemName: c.itemName, itemQuantityNeeded: c.itemQuantityNeeded, rows: [] })
      }
      map.get(c.itemId)!.rows.push(c)
    })
    return Array.from(map.values())
  }, [localCommitments, filter, search])

  function handleToggle(id: string, fulfilled: boolean) {
    setLocalCommitments(prev => prev.map(c => c.id === id ? { ...c, fulfilled } : c))
    onToggleFulfilled?.(id, fulfilled)
  }

  function handleUpdate(id: string, values: CommitmentFormValues) {
    setLocalCommitments(prev =>
      prev.map(c => c.id === id ? { ...c, ...values, note: values.note || null } : c)
    )
    onUpdateCommitment?.(id, values)
  }

  function handleDelete(id: string) {
    setLocalCommitments(prev => prev.filter(c => c.id !== id))
    onDeleteCommitment?.(id)
  }

  const isEmpty = localCommitments.length === 0
  const noResults = !isEmpty && grouped.length === 0

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
          Coordinator
        </p>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Donor Commitments
        </h1>
      </div>

      {/* Stats */}
      {!isEmpty && (
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex-1 min-w-[110px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Items covered</p>
            <p className="text-xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">{itemsCovered}</p>
          </div>
          <div className="flex-1 min-w-[110px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Fulfilled</p>
            <p className="text-xl font-bold text-lime-700 dark:text-lime-500 tabular-nums">{fulfilledCount}</p>
          </div>
          <div className="flex-1 min-w-[110px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3">
            <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Pending</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">{pendingCount}</p>
          </div>
        </div>
      )}

      {/* Search + filter */}
      {!isEmpty && (
        <div className="flex gap-3 mb-6 flex-wrap sm:flex-nowrap">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search donor or item…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent transition-shadow"
            />
          </div>
          <div className="flex bg-stone-100 dark:bg-stone-800 rounded-xl p-1 gap-1 shrink-0">
            {(['all', 'pending', 'fulfilled'] as FulfillmentFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  filter === f
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {isEmpty ? (
        <div className="text-center py-20">
          <div className="text-3xl mb-4">📭</div>
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">No commitments yet</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Commitments will appear here as donors claim items from the public registry.
          </p>
        </div>
      ) : noResults ? (
        <div className="text-center py-16">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">No results</h3>
          <button
            onClick={() => { setSearch(''); setFilter('all') }}
            className="text-sm text-lime-700 dark:text-lime-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {grouped.map(group => {
            const totals = itemTotals.get(group.itemId)
            const totalCommitted = totals?.committed ?? 0

            if (group.rows.length === 1) {
              return (
                <CommitmentRow
                  key={group.rows[0].id}
                  commitment={group.rows[0]}
                  onToggleFulfilled={handleToggle}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              )
            }

            // Multiple donors for the same item — show a group card
            const allFulfilled = group.rows.every(c => c.fulfilled)
            return (
              <div
                key={group.itemId}
                className={`border rounded-xl overflow-hidden ${
                  allFulfilled
                    ? 'border-stone-100 dark:border-stone-800/60'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                {/* Item header */}
                <div className={`px-4 py-2.5 flex items-center justify-between gap-4 border-b ${
                  allFulfilled
                    ? 'bg-stone-50 dark:bg-stone-900/60 border-stone-100 dark:border-stone-800/60'
                    : 'bg-stone-50 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800'
                }`}>
                  <span className={`text-sm font-semibold ${
                    allFulfilled ? 'text-stone-400 dark:text-stone-500 line-through' : 'text-stone-900 dark:text-stone-100'
                  }`}>
                    {group.itemName}
                  </span>
                  <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0 tabular-nums">
                    {totalCommitted} of {group.itemQuantityNeeded} needed · {group.rows.length} donors
                  </span>
                </div>
                {/* Per-donor rows */}
                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {group.rows.map(commitment => (
                    <CommitmentRow
                      key={commitment.id}
                      commitment={commitment}
                      insideGroup
                      onToggleFulfilled={handleToggle}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
