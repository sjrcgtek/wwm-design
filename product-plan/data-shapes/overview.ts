// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data is an implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/public-registry
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// From: sections/needs-list
// -----------------------------------------------------------------------------

export interface Need {
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

export interface NeedFormValues {
  name: string
  description: string
  categoryId: string
  quantityNeeded: number
  brandPreference: string
  purchaseUrl: string
  highPriority: boolean
  imageUrl: string | null
}

// -----------------------------------------------------------------------------
// From: sections/donor-commitments
// -----------------------------------------------------------------------------

export interface Commitment {
  id: string
  itemId: string
  itemName: string
  itemQuantityNeeded: number
  donorName: string
  donorEmail: string
  quantityCommitted: number
  claimedAt: string
  fulfilled: boolean
  note: string | null
}

export interface CommitmentFormValues {
  donorName: string
  donorEmail: string
  quantityCommitted: number
  note: string
}
