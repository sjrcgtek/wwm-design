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

export type FulfillmentFilter = 'all' | 'pending' | 'fulfilled'

export interface DonorCommitmentsProps {
  commitments: Commitment[]
  /** Called when a commitment's fulfilled status is toggled */
  onToggleFulfilled?: (commitmentId: string, fulfilled: boolean) => void
  /** Called when donor details or note are saved after inline editing */
  onUpdateCommitment?: (commitmentId: string, values: CommitmentFormValues) => void
  /** Called when a commitment is permanently deleted */
  onDeleteCommitment?: (commitmentId: string) => void
}
