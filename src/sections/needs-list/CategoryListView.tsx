import data from '@/../product/sections/needs-list/data.json'
import { CategoryList } from './components/CategoryList'

export default function CategoryListView() {
  return (
    <CategoryList
      categories={data.categories}
      needs={data.needs}
      onAddCategory={(label) => console.log('Add category:', label)}
      onUpdateCategory={(id, label) => console.log('Update category:', id, label)}
      onDeleteCategory={(id) => console.log('Delete category:', id)}
      onReorderCategories={(cats) => console.log('Reorder categories:', cats)}
    />
  )
}
