export interface Category {
  id: string
  label: string
}

export interface Quote {
  id: string
  text: string
  attribution: string
}

export interface Item {
  id: string
  name: string
  description: string
  categoryId: string
  quantityNeeded: number
  quantityClaimed: number
  brandPreference: string | null
  purchaseUrl: string | null
  highPriority: boolean
  imageUrl: string | null
}

export interface DonorClaim {
  name: string
  email: string
  quantity: number
  note?: string
}

export interface Registry {
  dropOffInstructions: string
}

export interface QuoteManagerProps {
  quotes: Quote[]
  onAddQuote?: (text: string, attribution: string) => void
  onUpdateQuote?: (quoteId: string, text: string, attribution: string) => void
  onDeleteQuote?: (quoteId: string) => void
}

export interface PublicRegistryProps {
  registry: Registry
  categories: Category[]
  items: Item[]
  quotes: Quote[]
  /** Called when a donor submits a claim for an item */
  onClaimItem?: (itemId: string, donor: DonorClaim) => void
}
