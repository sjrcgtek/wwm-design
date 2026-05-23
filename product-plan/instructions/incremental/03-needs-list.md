# Milestone 3: Needs List

> **Provide alongside:** `product-plan/product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete, Milestone 2 (Public Registry) complete or in progress

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the Needs List — the coordinator's tool for managing all items on the donation registry.

## Overview

The Needs List is a coordinator-only screen where staff add, edit, remove, and reorder the items available for donors to claim. Items are grouped by category with a claim progress indicator so coordinators can see at a glance what still needs donors. All editing happens inline without modals, and coordinators can upload a photo for any item.

**Key Functionality:**
- View all needs grouped by category, each showing claim progress
- Add new needs via an inline form
- Edit existing needs inline (name, description, quantity, brand preference, category, high priority, photo)
- Delete needs with a confirmation step (with extra warning when claims exist)
- Reorder needs via drag and drop
- Manage categories (add, rename, reorder, delete)

## Components Provided

Copy the section components from `product-plan/sections/needs-list/components/`:

- `NeedsList.tsx` — Main view; accepts `categories`, `needs`, and all need callbacks
- `CategoryList.tsx` — Grouped category view with category management
- `NeedRow.tsx` — Individual need row with inline editing, drag handle, image thumbnail, and lightbox
- `AddNeedForm.tsx` — Inline form for creating a new need (all fields including photo upload)
- `ImagePicker.tsx` — Reusable image picker for photo upload with local preview

## Props Reference

See `types.ts` for full definitions. Key interfaces:

```typescript
interface Need {
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

interface NeedFormValues {
  name: string
  description: string
  categoryId: string
  quantityNeeded: number
  brandPreference: string
  purchaseUrl: string
  highPriority: boolean
  imageUrl: string | null
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onUpdateNeed(needId, values)` | Coordinator saves inline edits |
| `onAddNeed(values)` | Coordinator submits the add-need form |
| `onDeleteNeed(needId)` | Coordinator confirms deletion |
| `onReorderNeeds(needs)` | Coordinator drops a need in a new position |
| `onAddCategory(label)` | Coordinator adds a new category |
| `onUpdateCategory(categoryId, label)` | Coordinator saves a category rename |
| `onDeleteCategory(categoryId)` | Coordinator confirms category deletion |
| `onReorderCategories(categories)` | Coordinator reorders categories |

## Expected User Flows

### Flow 1: Add a New Need

1. Coordinator clicks "Add item"
2. A blank inline form appears with fields: name, description, quantity, brand preference, category, high-priority checkbox, and optional photo
3. Coordinator fills in the details and optionally uploads a photo
4. Coordinator clicks "Add"
5. **Outcome:** `onAddNeed` fires with the form values; the new need appears in the list

### Flow 2: Edit a Need Inline

1. Coordinator clicks on a need row (or an edit icon)
2. The row expands into an inline edit form with all fields pre-populated
3. Coordinator updates any fields
4. Coordinator clicks "Save"
5. **Outcome:** `onUpdateNeed` fires with the updated values; row returns to view mode

### Flow 3: Delete a Need

1. Coordinator clicks the delete icon on a need row
2. A confirmation prompt appears (with extra warning if the item has existing donor claims)
3. Coordinator confirms
4. **Outcome:** `onDeleteNeed` fires; the need is removed from the list

### Flow 4: Reorder Needs

1. Coordinator grabs the drag handle on a need row
2. Drags it to a new position within the list
3. **Outcome:** `onReorderNeeds` fires with the full updated array in new order

### Flow 5: Upload a Photo

1. Coordinator opens the edit form (or add form) for a need
2. Uses the ImagePicker to select an image file
3. A preview appears immediately
4. Coordinator saves the need
5. **Outcome:** `imageUrl` in the form values reflects the uploaded image; a small thumbnail appears on the need row in view mode

## Empty States

- **No needs yet:** Show an empty state with a prompt to add the first need
- **No needs in category:** Empty category may be hidden or show an inline "Add item" prompt
- **No categories:** Prompt coordinator to create the first category

## Testing

See `product-plan/sections/needs-list/tests.md` for UI behavior test specs covering:
- Inline edit success and cancel paths
- Add need form validation
- Delete with and without existing claims
- Drag-and-drop reorder
- Image upload and preview

## Files to Reference

- `product-plan/sections/needs-list/README.md` — Feature overview
- `product-plan/sections/needs-list/tests.md` — UI behavior test specs
- `product-plan/sections/needs-list/components/` — React components
- `product-plan/sections/needs-list/types.ts` — TypeScript interfaces
- `product-plan/sections/needs-list/sample-data.json` — Sample data
- `product-plan/sections/needs-list/screenshot.png` — Visual reference

## Done When

- [ ] Needs list renders with real data grouped by category
- [ ] Claim progress indicator shows on each need row
- [ ] Inline edit opens, saves correctly, and fires `onUpdateNeed`
- [ ] Add-need form works and fires `onAddNeed`
- [ ] Delete confirmation works; extra warning shown when claims exist
- [ ] Drag-and-drop reorder fires `onReorderNeeds`
- [ ] Image upload shows preview and saves `imageUrl`; thumbnail visible on row
- [ ] Lightbox opens when clicking a need's thumbnail
- [ ] All empty states render correctly
- [ ] Responsive on mobile
- [ ] Matches the visual design (see screenshot)
