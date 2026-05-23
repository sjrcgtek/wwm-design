# Test Specs: Needs List

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Needs List is the coordinator's tool for managing the ministry's donation items. Key functionality to test: inline editing of need fields, adding new needs, deleting needs (with confirmation when claims exist), drag-and-drop reordering, photo upload via ImagePicker, and empty states.

---

## User Flow Tests

### Flow 1: Edit a Need Inline

**Scenario:** Coordinator updates an existing need's details.

#### Success Path

**Setup:**
- List has multiple needs in multiple categories
- At least one need has existing data

**Steps:**
1. Coordinator views the needs list
2. Coordinator clicks on a need row
3. Row expands into an inline edit form showing all fields: name, description, quantity needed, brand preference, category, high-priority checkbox, and optional photo
4. Coordinator edits the item name
5. Coordinator clicks "Save"

**Expected Results:**
- [ ] Edit form opens in place (no page navigation, no modal)
- [ ] All fields are pre-populated with the need's current values
- [ ] `onUpdateNeed` is called with `(needId, updatedValues)`
- [ ] Row returns to view mode after save
- [ ] Updated name is reflected in the row immediately

#### Cancel Edit

**Steps:**
1. Coordinator opens inline edit form
2. Makes changes to one or more fields
3. Clicks "Cancel"

**Expected Results:**
- [ ] Row returns to view mode
- [ ] No callback is fired
- [ ] Original values are preserved (changes discarded)

---

### Flow 2: Add a New Need

**Scenario:** Coordinator adds a brand-new item to the registry.

#### Success Path

**Steps:**
1. Coordinator clicks "Add item" (or "Add need") button
2. A blank inline form appears
3. Coordinator fills in: name, description, quantity needed, category
4. Coordinator optionally uploads a photo
5. Coordinator clicks "Add"

**Expected Results:**
- [ ] Form appears in-place without navigation
- [ ] `onAddNeed` is called with the entered values
- [ ] Form closes/resets after successful submission
- [ ] New need appears in the list under the correct category

#### Validation

**Steps:**
1. Coordinator clicks "Add item" but leaves the name field empty
2. Clicks "Add"

**Expected Results:**
- [ ] Form is not submitted
- [ ] Name field shows a required validation error

---

### Flow 3: Delete a Need (No Claims)

**Scenario:** Coordinator removes an item that has no donor claims.

**Setup:**
- Need has `quantityClaimed: 0`

**Steps:**
1. Coordinator clicks the delete icon on a need row
2. A confirmation prompt appears

**Expected Results:**
- [ ] Confirmation prompt is visible before deletion
- [ ] After confirming, `onDeleteNeed` is called with the need's ID
- [ ] Need is removed from the list

#### Cancel Delete

**Steps:**
1. Coordinator clicks delete icon
2. Confirmation prompt appears
3. Coordinator clicks "Cancel"

**Expected Results:**
- [ ] No callback is fired
- [ ] Need remains in the list

---

### Flow 4: Delete a Need with Existing Claims

**Scenario:** Coordinator attempts to remove an item that already has donor claims.

**Setup:**
- Need has `quantityClaimed > 0`

**Steps:**
1. Coordinator clicks the delete icon on the claimed need

**Expected Results:**
- [ ] Warning message indicates the item has existing claims (e.g., "2 donors have claimed this item")
- [ ] Coordinator must explicitly confirm despite the warning
- [ ] After confirming, `onDeleteNeed` is called

---

### Flow 5: Reorder Needs via Drag and Drop

**Scenario:** Coordinator drags a need to a new position.

**Steps:**
1. Coordinator grabs the drag handle on a need row
2. Drags it above or below another row in the same or different category
3. Releases to drop

**Expected Results:**
- [ ] Visual feedback is shown during drag (placeholder or shadow)
- [ ] `onReorderNeeds` is called with the updated full array of needs in new order
- [ ] List re-renders in the new order

---

### Flow 6: Upload a Photo for a Need

**Scenario:** Coordinator adds a photo to a need.

**Steps:**
1. Coordinator opens the inline edit form (or add form)
2. Coordinator sees the ImagePicker field
3. Coordinator selects an image file
4. Image preview appears in the picker

**Expected Results:**
- [ ] Selected image is previewed immediately (no upload required yet)
- [ ] `imageUrl` in the saved form values reflects the chosen image
- [ ] Coordinator can remove the image by clicking the remove/clear button

---

## Empty State Tests

### No Needs in Any Category

**Setup:**
- `needs` prop is an empty array (`[]`)
- `categories` may or may not be populated

**Expected Results:**
- [ ] Empty state message is displayed (e.g., "No needs added yet")
- [ ] "Add item" button is visible and functional
- [ ] No category headings shown if all categories are empty

### Category With No Needs

**Setup:**
- A category exists but has no associated needs

**Expected Results:**
- [ ] Category heading may show with an empty state indicator or may be hidden (either is valid)
- [ ] "Add item" button allows adding to that category

---

## Component Interaction Tests

### NeedRow (View Mode)

**Renders correctly:**
- [ ] Item name is displayed
- [ ] Claim progress is shown (e.g., "2 of 4 claimed")
- [ ] If `highPriority: true`, a priority indicator is visible
- [ ] If `imageUrl` is set, a small thumbnail image is displayed
- [ ] Clicking the thumbnail opens a full-size lightbox overlay
- [ ] Lightbox closes when clicking X or the backdrop

**Interactions:**
- [ ] Clicking the row (or an edit button) activates inline edit mode
- [ ] Delete icon is present and triggers confirmation

### NeedRow (Edit Mode)

- [ ] All fields are editable: name, description, quantity, brand preference, category, high priority
- [ ] ImagePicker is present for photo upload/change/removal
- [ ] Save and Cancel buttons are both visible
- [ ] Pressing Escape cancels the edit (optional)

### AddNeedForm

- [ ] Form starts blank
- [ ] Category dropdown shows all available categories
- [ ] High-priority checkbox defaults to unchecked
- [ ] ImagePicker is present
- [ ] Submit button is disabled or shows validation when required fields are empty

---

## Edge Cases

- [ ] Very long need name wraps or truncates without breaking layout
- [ ] `quantityNeeded: 0` or `quantityNeeded: 1` — stepper handles edge values
- [ ] All needs in a category are deleted — category becomes empty
- [ ] Drag handle is accessible via keyboard (if implemented)
- [ ] Adding a need immediately after deleting the last one (empty → populated transition)
- [ ] Editing a need then immediately deleting it — no stale state issues

---

## Accessibility Checks

- [ ] All form fields have associated labels
- [ ] Delete confirmation is announced to screen readers
- [ ] Drag handles have aria-labels (e.g., "Drag to reorder")
- [ ] Edit mode activates focus on the first editable field
- [ ] Error messages are associated with their form fields

---

## Sample Test Data

```typescript
const mockCategories: Category[] = [
  { id: 'cat-1', label: 'Baby Clothing' },
  { id: 'cat-2', label: 'Feeding' },
]

const mockNeeds: Need[] = [
  {
    id: 'need-1',
    name: 'Newborn Onesies (0–3M)',
    description: 'White or neutral colors preferred.',
    categoryId: 'cat-1',
    quantityNeeded: 4,
    quantityClaimed: 1,
    brandPreference: 'Carter\'s or similar',
    purchaseUrl: null,
    highPriority: true,
    imageUrl: null,
  },
  {
    id: 'need-2',
    name: 'Baby Formula',
    description: 'Similac Advance, newborn stage.',
    categoryId: 'cat-2',
    quantityNeeded: 2,
    quantityClaimed: 0,
    brandPreference: 'Similac',
    purchaseUrl: 'https://example.com/formula',
    highPriority: false,
    imageUrl: null,
  },
]

// Empty states
const mockEmptyNeeds: Need[] = []

const mockNeedWithClaims: Need = {
  ...mockNeeds[0],
  quantityClaimed: 2, // has existing donor claims
}
```
