export interface Category {
  id: string
  label: string
}

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

export interface CategoryListProps {
  categories: Category[]
  needs: Need[]
  /** Called when a new category is created */
  onAddCategory?: (label: string) => void
  /** Called when a category's label is saved */
  onUpdateCategory?: (categoryId: string, label: string) => void
  /** Called when a category is deleted (after confirmation) */
  onDeleteCategory?: (categoryId: string) => void
  /** Called when categories are reordered; receives the full reordered array */
  onReorderCategories?: (categories: Category[]) => void
}

export interface NeedsListProps {
  categories: Category[]
  needs: Need[]
  /** Called when a need's fields are saved after inline editing */
  onUpdateNeed?: (needId: string, values: NeedFormValues) => void
  /** Called when a new need is submitted via the inline add form */
  onAddNeed?: (values: NeedFormValues) => void
  /** Called when a need is deleted (after confirmation) */
  onDeleteNeed?: (needId: string) => void
  /** Called when items are reordered; receives the full reordered needs array */
  onReorderNeeds?: (needs: Need[]) => void
}
