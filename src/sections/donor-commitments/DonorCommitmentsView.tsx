import data from '@/../product/sections/donor-commitments/data.json'
import { DonorCommitments } from './components/DonorCommitments'

export default function DonorCommitmentsView() {
  return (
    <DonorCommitments
      commitments={data.commitments}
      onToggleFulfilled={(id, fulfilled) => console.log('Toggle fulfilled:', id, fulfilled)}
      onUpdateCommitment={(id, values) => console.log('Update commitment:', id, values)}
      onDeleteCommitment={(id) => console.log('Delete commitment:', id)}
    />
  )
}
