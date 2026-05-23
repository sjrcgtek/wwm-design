import type { Quote } from '../types'

interface QuoteBlockProps {
  quote: Quote
}

export function QuoteBlock({ quote }: QuoteBlockProps) {
  return (
    <blockquote className="pl-5 border-l-2 border-amber-300 dark:border-amber-700 mb-8">
      <p className="text-sm italic text-stone-600 dark:text-stone-400 leading-relaxed">
        "{quote.text}"
      </p>
      <footer className="mt-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
        — {quote.attribution}
      </footer>
    </blockquote>
  )
}
