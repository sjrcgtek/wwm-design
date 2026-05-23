import data from '@/../product/sections/needs-list/data.json'
import { NeedsList } from './components/NeedsList'

export default function NeedsListView() {
  return (
    <NeedsList
      categories={data.categories}
      needs={data.needs}
      onUpdateNeed={(id, values) => console.log('Update need:', id, values)}
      onAddNeed={values => console.log('Add need:', values)}
      onDeleteNeed={id => console.log('Delete need:', id)}
      onReorderNeeds={needs => console.log('Reorder needs:', needs)}
    />
  )
}
