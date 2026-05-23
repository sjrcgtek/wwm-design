import { useState, useMemo } from 'react'
import type { PublicRegistryProps, DonorClaim } from '@/../product/sections/public-registry/types'
import { ItemCard } from './ItemCard'
import { ClaimModal } from './ClaimModal'
import { QuoteBlock } from './QuoteBlock'

export function PublicRegistry({ registry, categories, items, quotes, onClaimItem }: PublicRegistryProps) {
  const [search, setSearch] = useState('')
  const [claimingItemId, setClaimingItemId] = useState<string | null>(null)
  const [quoteIndex] = useState(() =>
    quotes.length > 0 ? Math.floor(Math.random() * quotes.length) : 0
  )
  const randomQuote = quotes.length > 0 ? quotes[quoteIndex] : null

  const availableItems = useMemo(
    () => items.filter(item => item.quantityClaimed < item.quantityNeeded),
    [items]
  )

  const filteredItems = useMemo(
    () =>
      search.trim()
        ? availableItems.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase().trim())
          )
        : availableItems,
    [availableItems, search]
  )

  const highPriorityItems = useMemo(
    () => filteredItems.filter(item => item.highPriority),
    [filteredItems]
  )

  const groupedCategories = useMemo(
    () =>
      categories
        .map(cat => ({
          ...cat,
          items: filteredItems.filter(item => item.categoryId === cat.id && !item.highPriority),
        }))
        .filter(cat => cat.items.length > 0),
    [categories, filteredItems]
  )

  const claimingItem = claimingItemId
    ? items.find(i => i.id === claimingItemId) ?? null
    : null

  function handleClaim(donor: DonorClaim) {
    if (claimingItemId) {
      onClaimItem?.(claimingItemId, donor)
      // Don't close modal here — ClaimModal shows confirmation first,
      // then calls onClose when donor clicks "Done"
    }
  }

  const isEmpty = availableItems.length === 0
  const noResults = !isEmpty && filteredItems.length === 0

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
          Donation Registry
        </p>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">
          What We Need
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          Browse the list and claim an item to donate. Every gift makes a real difference for a new mom and baby.
        </p>
      </div>

      {randomQuote && <QuoteBlock quote={randomQuote} />}

      {/* Search */}
      {!isEmpty && (
        <div className="relative mb-8">
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
            placeholder="Search items…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent transition-shadow"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {isEmpty ? (
        <div className="text-center py-20">
          <div className="text-3xl mb-4">🎉</div>
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">
            All items have been claimed!
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Our community has been incredibly generous. Thank you to everyone who donated.
          </p>
        </div>
      ) : noResults ? (
        <div className="text-center py-16">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">
            No items match "{search}"
          </h3>
          <button
            onClick={() => setSearch('')}
            className="text-sm text-lime-700 dark:text-lime-500 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {highPriorityItems.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-3 h-3 text-amber-500 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  Most Needed
                </h2>
              </div>
              <div className="space-y-3">
                {highPriorityItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClaim={() => setClaimingItemId(item.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {groupedCategories.map(cat => (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                <h2 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                  {cat.label}
                </h2>
              </div>
              <div className="space-y-3">
                {cat.items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClaim={() => setClaimingItemId(item.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {claimingItem && (
        <ClaimModal
          item={claimingItem}
          remainingQuantity={claimingItem.quantityNeeded - claimingItem.quantityClaimed}
          dropOffInstructions={registry.dropOffInstructions}
          onSubmit={handleClaim}
          onClose={() => setClaimingItemId(null)}
        />
      )}
    </div>
  )
}
