# Milestone 4: Donor Commitments

> **Provide alongside:** `product-plan/product-overview.md`
> **Prerequisites:** Milestones 1–3 complete (Shell, Public Registry, Needs List)

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

Implement the Donor Commitments dashboard — the coordinator's view for tracking every donor pledge from claim to fulfillment.

## Overview

The Donor Commitments section gives coordinators full visibility into who has pledged what. Commitments are sorted newest first and can be searched by donor or item name, filtered by fulfillment status, marked as fulfilled with a single toggle, edited inline, and deleted with confirmation. A summary bar at the top provides a quick overview of coverage and pending versus fulfilled status. Donor notes from the claim form are visible on each row.

**Key Functionality:**
- Summary bar showing items fully covered, fulfilled commitments, and pending commitments
- Real-time search by donor name or item name
- Status filter: All, Pending, Fulfilled
- Fulfillment toggle per commitment (single click)
- Inline editing of donor name, email, quantity, and note
- Delete with inline confirmation
- Donor notes displayed visibly on commitment rows

## Components Provided

Copy the section components from `product-plan/sections/donor-commitments/components/`:

- `DonorCommitments.tsx` — Main view; accepts `commitments`, `onToggleFulfilled`, `onUpdateCommitment`, `onDeleteCommitment`
- `CommitmentRow.tsx` — Individual row with inline editing, fulfillment toggle, note display, and delete confirmation

## Props Reference

See `types.ts` for full definitions. Key interfaces:

```typescript
interface Commitment {
  id: string
  itemId: string
  itemName: string
  itemQuantityNeeded: number
  donorName: string
  donorEmail: string
  quantityCommitted: number
  claimedAt: string       // ISO 8601 date string
  fulfilled: boolean
  note: string | null
}

interface CommitmentFormValues {
  donorName: string
  donorEmail: string
  quantityCommitted: number
  note: string
}

type FulfillmentFilter = 'all' | 'pending' | 'fulfilled'
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onToggleFulfilled(commitmentId, fulfilled)` | Coordinator clicks the fulfillment toggle |
| `onUpdateCommitment(commitmentId, values)` | Coordinator saves inline edits |
| `onDeleteCommitment(commitmentId)` | Coordinator confirms deletion |

## Expected User Flows

### Flow 1: Mark a Commitment as Fulfilled

1. Coordinator views the commitments list
2. Coordinator locates a pending commitment
3. Coordinator clicks the fulfillment toggle/checkbox
4. **Outcome:** `onToggleFulfilled` fires with `(id, true)`; row visually updates to fulfilled state; summary bar counts update

### Flow 2: Edit a Commitment

1. Coordinator clicks the edit icon on a row
2. Inline edit form opens with current values
3. Coordinator updates donor email or adds a coordinator note
4. Coordinator clicks "Save"
5. **Outcome:** `onUpdateCommitment` fires; row updates in place and returns to view mode

### Flow 3: Delete a Commitment

1. Coordinator clicks the delete icon on a commitment row
2. An inline confirmation appears
3. Coordinator confirms
4. **Outcome:** `onDeleteCommitment` fires; row is removed; summary bar recalculates

### Flow 4: Search and Filter

1. Coordinator types a donor name in the search input
2. List filters in real time to show matching commitments
3. Coordinator selects "Pending" from the status filter
4. **Outcome:** Only pending commitments matching the search are shown; clearing search or resetting filter restores everything

## Empty States

- **No commitments yet:** Show an empty state message (e.g., "No commitments yet — share the registry link with donors")
- **No results after search/filter:** Show a "no matching commitments" state with a hint to clear filters

## Testing

See `product-plan/sections/donor-commitments/tests.md` for UI behavior test specs covering:
- Fulfillment toggle (mark and unmark)
- Inline edit success and cancel paths
- Delete with confirmation
- Search and filter (including combined)
- Summary bar count accuracy
- Empty and filtered-empty states

## Files to Reference

- `product-plan/sections/donor-commitments/README.md` — Feature overview
- `product-plan/sections/donor-commitments/tests.md` — UI behavior test specs
- `product-plan/sections/donor-commitments/components/` — React components
- `product-plan/sections/donor-commitments/types.ts` — TypeScript interfaces
- `product-plan/sections/donor-commitments/sample-data.json` — Sample data
- `product-plan/sections/donor-commitments/screenshot.png` — Visual reference

## Done When

- [ ] Donor commitments list renders with real data sorted newest first
- [ ] Summary bar shows accurate counts (fully covered, fulfilled, pending)
- [ ] Search filters by donor name and item name in real time
- [ ] Status filter (All / Pending / Fulfilled) works correctly
- [ ] Fulfillment toggle fires `onToggleFulfilled` and updates the row visually
- [ ] Inline edit opens, saves correctly, and fires `onUpdateCommitment`
- [ ] Delete confirmation works and fires `onDeleteCommitment`
- [ ] Donor notes are visible on commitment rows when present
- [ ] All empty states render correctly (no data, and no search results)
- [ ] Responsive on mobile
- [ ] Matches the visual design (see screenshot)
