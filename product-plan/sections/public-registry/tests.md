# Test Specs: Public Registry

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

The Public Registry is the donor-facing view where donors browse available needs, search for items, and claim items through a modal form. Key functionality to test: real-time search, claim modal flow (including quantity stepping and optional note), confirmation screen with drop-off instructions, item disappearance after full claim, and empty states.

---

## User Flow Tests

### Flow 1: Browse and Claim an Item

**Scenario:** A donor finds an item and claims it.

#### Success Path

**Setup:**
- Registry has multiple items in multiple categories
- At least one item (`quantityClaimed < quantityNeeded`) is available
- Registry has `dropOffInstructions` set

**Steps:**
1. User navigates to the registry page
2. User sees items grouped under category headings (e.g., "Baby Clothing", "Feeding")
3. User sees a random saint quote displayed at the top of the page
4. User locates an available item card showing name, description, and quantity needed
5. User clicks the "Claim" button on an item
6. Modal opens with fields: Name, Email, and an optional Note textarea
7. User enters their name and email
8. User optionally enters a note (e.g., "I'll drop off Sunday morning")
9. User clicks "Submit Claim"

**Expected Results:**
- [ ] Modal opens without page navigation
- [ ] All form fields are visible: Name, Email, Note (optional)
- [ ] Modal transitions to a confirmation screen (no page reload)
- [ ] Confirmation screen shows the drop-off instructions from `registry.dropOffInstructions`
- [ ] `onClaimItem` is called with `(itemId, { name, email, quantity, note })`
- [ ] Note is included in the callback payload if entered; omitted or `undefined` if blank
- [ ] Confirmation screen has a "Done" / close button

#### Failure Path: Missing Required Fields

**Steps:**
1. User clicks "Claim" on an item
2. User leaves Name or Email blank
3. User clicks "Submit Claim"

**Expected Results:**
- [ ] Form is not submitted
- [ ] Required field validation is visible (error message or field highlight)
- [ ] Modal remains open with form data preserved

#### Failure Path: Invalid Email

**Steps:**
1. User enters a name but types an invalid email (e.g., "notanemail")
2. User clicks "Submit Claim"

**Expected Results:**
- [ ] Form is not submitted
- [ ] Email field shows a validation error

---

### Flow 2: Claim an Item with Multiple Quantity Available

**Scenario:** An item has `quantityNeeded > 1` and the donor wants to claim a partial quantity.

**Setup:**
- Item has `quantityNeeded: 4`, `quantityClaimed: 1` (3 remaining)

**Steps:**
1. User clicks "Claim" on the multi-quantity item
2. Modal shows a quantity stepper (default: 1)
3. User increases quantity using the "+" button (up to 3)
4. User fills in name and email
5. User submits

**Expected Results:**
- [ ] Quantity stepper is visible only when `quantityNeeded - quantityClaimed > 1`
- [ ] Stepper minimum is 1; maximum is `quantityNeeded - quantityClaimed`
- [ ] `onClaimItem` is called with the selected quantity
- [ ] Stepper does NOT appear when only 1 unit remains

---

### Flow 3: Search Filters Items in Real Time

**Scenario:** Donor types in the search box to narrow the list.

**Steps:**
1. User sees the full registry (all available items)
2. User types a partial item name in the search input (e.g., "diaper")
3. List filters immediately to show only matching items

**Expected Results:**
- [ ] Filtering happens on each keystroke (no submit required)
- [ ] Only items whose names match the search string are shown
- [ ] Category headings with no matching items are hidden
- [ ] Clearing the search restores the full list

#### Empty Search Result

**Steps:**
1. User types a string that matches no items (e.g., "xyzxyz")

**Expected Results:**
- [ ] Empty state is shown ("No items match your search" or similar)
- [ ] No category headings visible

---

### Flow 4: Item Disappears When Fully Claimed

**Scenario:** An item transitions from available to fully claimed.

**Setup:**
- Item has `quantityNeeded: 2`, `quantityClaimed: 1` (1 remaining)
- User claims the last 1 unit

**Steps:**
1. Donor submits a claim for the last available unit
2. Parent component updates `quantityClaimed` to match `quantityNeeded`

**Expected Results:**
- [ ] Item no longer appears in the registry after its `quantityClaimed >= quantityNeeded`
- [ ] If this was the last item, the all-claimed empty state appears

---

## Empty State Tests

### All Items Claimed

**Scenario:** Every item in the registry has been fully claimed.

**Setup:**
- All items have `quantityClaimed >= quantityNeeded`

**Expected Results:**
- [ ] Empty state message is visible (e.g., "All needs have been claimed!")
- [ ] No item cards or category headings are shown
- [ ] The empty state is encouraging/celebratory in tone

### No Items in Registry

**Setup:**
- `items` prop is an empty array (`[]`)

**Expected Results:**
- [ ] Empty state is displayed
- [ ] No category headings visible

---

## Component Interaction Tests

### QuoteBlock

**Renders correctly:**
- [ ] One quote is displayed at the top of the registry
- [ ] Quote text is shown in italic with amber left border styling
- [ ] Attribution is shown below the quote text
- [ ] A different quote may appear on page reload (random selection)

### ItemCard

**Renders correctly:**
- [ ] Item name is displayed prominently
- [ ] Description text is shown
- [ ] Quantity remaining is shown (e.g., "2 of 4 still needed")
- [ ] Brand preference is shown if `brandPreference` is not null
- [ ] "Claim" button is present and clickable
- [ ] If `imageUrl` is set, a thumbnail image is displayed inline
- [ ] Clicking the thumbnail opens a full-size lightbox overlay
- [ ] Lightbox closes when clicking the X button or the background overlay

**High-priority items:**
- [ ] Items with `highPriority: true` appear at the top of their category section

### ClaimModal

**Form behavior:**
- [ ] Modal opens when "Claim" is clicked
- [ ] Modal closes when the backdrop or X button is clicked
- [ ] Note textarea accepts multi-line input
- [ ] Pressing Escape closes the modal (optional but good UX)

**Confirmation screen:**
- [ ] Transitions to confirmation screen on successful submit
- [ ] Shows drop-off instructions from `registry.dropOffInstructions`
- [ ] "Done" button closes the modal

---

## Edge Cases

- [ ] Handles a very long item name with text truncation or wrapping
- [ ] Handles an item description that is very long
- [ ] Works correctly with a single item and with 50+ items
- [ ] Category with only high-priority items renders correctly
- [ ] Registry with a single category (no grouping needed) renders correctly
- [ ] `quotes` array with 1 quote always shows that quote
- [ ] `quotes` array that is empty shows no quote block (no crash)
- [ ] Image fails to load — falls back gracefully (broken image or hidden thumbnail)

---

## Accessibility Checks

- [ ] All form fields have associated `<label>` elements
- [ ] Modal traps focus while open
- [ ] Modal is announced to screen readers (role="dialog" or equivalent)
- [ ] Claim button has descriptive aria-label (e.g., "Claim [item name]")
- [ ] Search input has a visible label or placeholder
- [ ] Error messages are associated with their fields

---

## Sample Test Data

```typescript
const mockRegistry: Registry = {
  dropOffInstructions: 'Drop off at 123 Main St, Suite 200. Hours: Mon–Fri 9am–5pm. Ring the bell at the back entrance.',
}

const mockCategories: Category[] = [
  { id: 'cat-1', label: 'Baby Clothing' },
  { id: 'cat-2', label: 'Feeding' },
]

const mockItems: Item[] = [
  {
    id: 'item-1',
    name: 'Newborn Onesies (0–3M)',
    description: 'White or neutral colors preferred. Pack of 5 or more.',
    categoryId: 'cat-1',
    quantityNeeded: 4,
    quantityClaimed: 1,
    brandPreference: 'Carter\'s or similar',
    purchaseUrl: null,
    highPriority: true,
    imageUrl: null,
  },
  {
    id: 'item-2',
    name: 'Baby Formula',
    description: 'Similac Advance or Enfamil NeuroPro, newborn stage.',
    categoryId: 'cat-2',
    quantityNeeded: 2,
    quantityClaimed: 2, // fully claimed — should be hidden
    brandPreference: 'Similac or Enfamil',
    purchaseUrl: null,
    highPriority: false,
    imageUrl: null,
  },
]

const mockQuotes: Quote[] = [
  {
    id: 'q-1',
    text: 'We cannot do great things, only small things with great love.',
    attribution: 'St. Teresa of Calcutta',
  },
]

// Empty state
const mockEmptyItems: Item[] = []
```
