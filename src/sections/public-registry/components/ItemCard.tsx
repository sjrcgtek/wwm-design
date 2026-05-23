import { useState } from 'react'
import { X } from 'lucide-react'
import type { Item } from '@/../product/sections/public-registry/types'

interface ItemCardProps {
  item: Item
  onClaim: () => void
}

export function ItemCard({ item, onClaim }: ItemCardProps) {
  const remaining = item.quantityNeeded - item.quantityClaimed
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      {lightboxOpen && item.imageUrl && (
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
            src={item.imageUrl}
            alt={item.name}
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    <article className="flex items-start justify-between gap-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-sm transition-all duration-150">
      {item.imageUrl && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-lime-700"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start flex-wrap gap-x-2 gap-y-1 mb-1.5">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {item.name}
          </h3>
          {remaining > 1 && (
            <span className="text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded-full">
              {remaining} needed
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-2">
          {item.description}
        </p>
        {item.brandPreference && (
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            ✦ {item.brandPreference}
          </p>
        )}
        {item.purchaseUrl && (
          <a
            href={item.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors mt-0.5"
          >
            Where to buy
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
      <button
        onClick={onClaim}
        className="shrink-0 px-4 py-1.5 bg-lime-700 hover:bg-lime-800 active:bg-lime-900 text-white text-xs font-bold rounded-lg transition-colors"
      >
        Claim
      </button>
    </article>
    </>
  )
}
