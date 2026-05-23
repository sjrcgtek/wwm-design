# Test Specs: Donor Commitments

These test specs are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Donor Commitments is the coordinator's dashboard for tracking donor pledges. Key functionality to test: summary bar counts, search and filter, fulfillment toggle, inline editing (donor details + note), delete with confirmation, and empty/filtered empty states.

---

## User Flow Tests

### Flow 1: Mark a Commitment as Fulfilled

**Scenario:** Coordinator marks a pending commitment as fulfilled after drop-off.

#### Success Path

**Setup:**
- At least one commitment with `fulfilled: false`

**Steps:**
1. Coordinator views the commitments list
2. Coordinator locates a pending commitment
3. Coordinator clicks the fulfillment toggle/checkbox on that commitment

**Expected Results:**
- [ ] `onToggleFulfilled` is called with `(commitmentId, true)`
- [ ] Row visually updates to reflect fulfilled status (e.g., checkmark, muted styling)
- [ ] Summary bar counts update (pending count decreases, fulfilled count increases)

#### Toggle Back to Pending

**Steps:**
1. Coordinator clicks the toggle on a fulfilled commitment

**Expected Results:**
- [ ] `onToggleFulfilled` is called with `(commitmentId, false)`
- [ ] Row returns to pending visual state

---

### Flow 2: Edit a Commitment Inline

**Scenario:** Coordinator corrects a donor's email or updates the note.

#### Success Path

**Setup:**
- At least one commitment exists

**Steps:**
1. Coordinator clicks the edit icon on a commitment row
2. Inline edit form opens showing: donor name, donor email, quantity committed, and note
3. Coordinator updates the email address and adds a note
4. Coordinator clicks "Save"

**Expected Results:**
- [ ] Edit form opens in place (no modal, no navigation)
- [ ] All editable fields are pre-populated with current values
- [ ] `onUpdateCommitment` is called with `(commitmentId, { donorName, donorEmail, quantityCommitted, note })`
- [ ] Row returns to view mode after save
- [ ] Updated values are reflected in the row immediately

#### Cancel Edit

**Steps:**
1. Coordinator opens edit form
2. Modifies fields
3. Clicks "Cancel"

**Expected Results:**
- [ ] No callback is fired
- [ ] Row returns to view mode with original values

---

### Flow 3: Delete a Commitment

**Scenario:** Coordinator removes a duplicate or incorrect commitment entry.

#### Success Path

**Steps:**
1. Coordinator clicks the delete icon on a commitment row
2. An inline confirmation appears (e.g., "Delete this commitment?" with Confirm/Cancel)
3. Coordinator clicks "Confirm"

**Expected Results:**
- [ ] `onDeleteCommitment` is called with the commitment's ID
- [ ] Commitment is removed from the list
- [ ] Summary bar recalculates counts

#### Cancel Delete

**Steps:**
1. Coordinator clicks delete icon
2. Confirmation appears
3. Coordinator clicks "Cancel"

**Expected Results:**
- [ ] No callback is fired
- [ ] Commitment remains in the list

---

### Flow 4: Search and Filter Commitments

**Scenario:** Coordinator searches for a specific donor or item.

#### Search by Donor Name

**Steps:**
1. Coordinator types a donor's name in the search input
2. List filters in real time

**Expected Results:**
- [ ] Only commitments matching the donor name (partial match) are shown
- [ ] Summary bar reflects only the filtered results (or stays global — either is valid)
- [ ] Clearing the search restores the full list

#### Search by Item Name

**Steps:**
1. Coordinator types an item name in the search input

**Expected Results:**
- [ ] Commitments for matching items are shown
- [ ] Non-matching rows are hidden

#### Filter by Status

**Steps:**
1. Coordinator selects "Pending" from the status filter

**Expected Results:**
- [ ] Only commitments with `fulfilled: false` are shown
- [ ] Selecting "Fulfilled" shows only `fulfilled: true` commitments
- [ ] Selecting "All" restores all commitments

#### Combined Search + Filter

**Steps:**
1. Coordinator types a name AND selects "Pending"

**Expected Results:**
- [ ] Only pending commitments matching the search are shown
- [ ] Both conditions are applied simultaneously

---

### Flow 5: View Donor Note

**Scenario:** Coordinator sees a note left by the donor during the claim.

**Setup:**
- Commitment has `note: "I'll drop off Sunday morning"`

**Expected Results:**
- [ ] Note text is visible on the commitment row (below or near donor info)
- [ ] Rows with `note: null` do not show a note field

---

## Empty State Tests

### No Commitments Yet

**Setup:**
- `commitments` prop is an empty array (`[]`)

**Expected Results:**
- [ ] Empty state message is shown (e.g., "No commitments yet")
- [ ] Summary bar shows all zeros
- [ ] Search and filter controls may be hidden or disabled

### No Results After Search/Filter

**Setup:**
- `commitments` has records, but none match the current search or filter

**Expected Results:**
- [ ] "No matching commitments" (or similar) empty state is shown
- [ ] Clearing the search or resetting the filter restores the list

---

## Component Interaction Tests

### Summary Bar

**Renders correctly:**
- [ ] "Items fully covered" count shows how many items have `quantityClaimed >= quantityNeeded` across all commitments
- [ ] "Fulfilled" count shows commitments with `fulfilled: true`
- [ ] "Pending" count shows commitments with `fulfilled: false`
- [ ] Counts update reactively when commitments are toggled or deleted

### CommitmentRow (View Mode)

**Renders correctly:**
- [ ] Item name is displayed
- [ ] Donor name and email are shown
- [ ] Quantity committed is shown
- [ ] Claim date is displayed in a readable format (not a raw ISO string)
- [ ] Fulfillment toggle reflects the current `fulfilled` status
- [ ] Donor note is visible if `note` is set; hidden if `null`

**Interactions:**
- [ ] Clicking the fulfillment toggle fires `onToggleFulfilled`
- [ ] Edit icon opens inline edit form
- [ ] Delete icon triggers confirmation

### CommitmentRow (Edit Mode)

- [ ] All editable fields are shown: donor name, email, quantity, note
- [ ] Note field accepts multi-line text
- [ ] Save fires `onUpdateCommitment`; Cancel discards changes

---

## Edge Cases

- [ ] Very long donor name or item name — wraps or truncates without layout breakage
- [ ] Commitment with empty note (`note: null`) — no note UI is shown
- [ ] All commitments fulfilled — "Pending" filter shows empty state
- [ ] Claim date in the distant past — still formats correctly
- [ ] Editing a commitment and then toggling fulfillment — no state conflicts
- [ ] Rapid toggling of fulfilled status — callbacks fire correctly without double-fire

---

## Accessibility Checks

- [ ] Fulfillment toggle has an accessible label (e.g., "Mark as fulfilled")
- [ ] Delete confirmation is announced to screen readers
- [ ] Edit mode focuses the first editable field
- [ ] Search input has a visible label or aria-label
- [ ] Status filter has an accessible label

---

## Sample Test Data

```typescript
const mockCommitments: Commitment[] = [
  {
    id: 'c-1',
    itemId: 'item-1',
    itemName: 'Newborn Onesies (0–3M)',
    itemQuantityNeeded: 4,
    donorName: 'Maria Santos',
    donorEmail: 'maria@example.com',
    quantityCommitted: 2,
    claimedAt: '2026-05-10T14:30:00Z',
    fulfilled: false,
    note: 'I\'ll drop these off Sunday morning!',
  },
  {
    id: 'c-2',
    itemId: 'item-3',
    itemName: 'Baby Formula',
    itemQuantityNeeded: 2,
    donorName: 'James O\'Brien',
    donorEmail: 'james@example.com',
    quantityCommitted: 1,
    claimedAt: '2026-05-08T09:15:00Z',
    fulfilled: true,
    note: null,
  },
]

// Empty state
const mockEmptyCommitments: Commitment[] = []

// Fully covered item scenario
const mockAllFulfilledCommitments: Commitment[] = mockCommitments.map(c => ({
  ...c,
  fulfilled: true,
}))
```
