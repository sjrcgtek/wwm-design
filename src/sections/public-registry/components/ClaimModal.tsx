import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import type { Item, DonorClaim } from '@/../product/sections/public-registry/types'

interface ClaimModalProps {
  item: Item
  remainingQuantity: number
  dropOffInstructions: string
  onSubmit: (donor: DonorClaim) => void
  onClose: () => void
}

export function ClaimModal({ item, remainingQuantity, dropOffInstructions, onSubmit, onClose }: ClaimModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [submittedQuantity, setSubmittedQuantity] = useState(1)

  useEffect(() => {
    if (!confirmed) return
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#4d7c0f', '#f59e0b', '#a8a29e', '#ffffff'],
    })
  }, [confirmed])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      onSubmit({ name: name.trim(), email: email.trim(), quantity, note: note.trim() || undefined })
      setSubmittedQuantity(quantity)
      setConfirmed(true)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => { if (e.target === e.currentTarget && !confirmed) onClose() }}
    >
      <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        {confirmed ? (
          <>
            <div className="bg-lime-50 dark:bg-lime-950/40 px-6 py-5 border-b border-lime-200 dark:border-lime-900/60">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-lime-700">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-lime-800 dark:text-lime-500 uppercase tracking-widest">
                  You're all set!
                </p>
              </div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                Thanks, {name.split(' ')[0]}!
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {submittedQuantity > 1
                  ? `You've committed to donating ${submittedQuantity}. We'll be in touch at ${email}.`
                  : `We'll be in touch at ${email}.`}
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-widest mb-2">
                Drop-off instructions
              </p>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {dropOffInstructions}
              </p>
              <button
                onClick={onClose}
                className="mt-5 w-full px-4 py-2 text-sm font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="bg-lime-50 dark:bg-lime-950/40 px-6 py-5 border-b border-lime-200 dark:border-lime-900/60">
              <p className="text-xs font-bold text-lime-800 dark:text-lime-500 uppercase tracking-widest mb-1.5">
                Claiming this item
              </p>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {item.name}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Leave your contact info so the coordinator can follow up. Your details won't be shared publicly.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent transition-shadow"
                  />
                </div>

                {remainingQuantity > 1 && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      How many can you donate?
                      <span className="font-normal text-stone-400 ml-1">({remainingQuantity} available)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(q => Math.min(remainingQuantity, q + 1))}
                        disabled={quantity >= remainingQuantity}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-lg leading-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-sm font-bold text-white bg-lime-700 hover:bg-lime-800 rounded-lg transition-colors"
                >
                  Confirm Claim
                </button>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Note for the coordinator{' '}
                    <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="e.g. I'll drop this off Sunday morning"
                    rows={2}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-lime-700 focus:border-transparent transition-shadow resize-none"
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
