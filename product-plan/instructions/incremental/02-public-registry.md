# Milestone 2: Public Registry

> **Provide alongside:** `product-plan/product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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

Implement the Public Registry — the donor-facing view where donors browse available needs and claim items through a simple form.

## Overview

The Public Registry is a publicly accessible page showing all unclaimed items from the ministry's needs list. Donors can search for items, browse by category, and claim items by submitting their name, email, and an optional note. After claiming, a confirmation screen shows drop-off instructions. Fully claimed items are hidden from the registry automatically. A random saint quote appears at the top of the page for inspiration.

**Key Functionality:**
- Browse all available (unclaimed) needs grouped by category
- Real-time search filtering by item name
- Claim items via a modal form (name, email, quantity stepper, optional note)
- Confirmation screen with drop-off instructions after successful claim
- Fully claimed items are hidden from the list
- Saint quote displayed randomly at the top from a coordinator-managed list
- Coordinator-only Quote Manager screen for adding, editing, and deleting quotes

## Components Provided

Copy the section components from `product-plan/sections/public-registry/components/`:

- `PublicRegistry.tsx` — Main view; accepts `registry`, `categories`, `items`, `quotes`, `onClaimItem`
- `ItemCard.tsx` — Individual item card with small inline image thumbnail, claim button, and lightbox on image click
- `ClaimModal.tsx` — Claim form with name, email, quantity stepper, optional note, and confirmation screen
- `QuoteBlock.tsx` — Displays a single saint quote with amber left border
- `QuoteManager.tsx` — Coordinator-only screen for managing the quote list

## Props Reference

See `types.ts` for full definitions. Key interfaces:

```typescript
interface Registry {
  dropOffInstructions: string
}

interface Item {
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

interface Quote {
  id: string
  text: string
  attribution: string
}

interface DonorClaim {
  name: string
  email: string
  quantity: number
  note?: string
}
```

**Callback props:**

| Callback | Triggered When |
|----------|---------------|
| `onClaimItem(itemId, donor)` | Donor submits the claim form |
| `onAddQuote(text, attribution)` | Coordinator adds a new quote |
| `onUpdateQuote(quoteId, text, attribution)` | Coordinator saves edits to a quote |
| `onDeleteQuote(quoteId)` | Coordinator deletes a quote |

## Expected User Flows

### Flow 1: Browse and Claim an Item

1. Donor navigates to `/registry`
2. Donor sees a page header with the registry title and a random saint quote
3. Donor scrolls through needs grouped by category (high-priority items at the top)
4. Donor clicks "Claim" on an available item
5. A modal opens asking for name, email, optional quantity, and an optional note
6. Donor submits the form
7. **Outcome:** Modal transitions to a confirmation screen showing the drop-off instructions; item disappears from the registry when fully claimed

### Flow 2: Search for an Item

1. Donor types in the search box at the top of the registry
2. The list filters in real time to show only matching items
3. **Outcome:** Unmatched items and empty categories are hidden; clearing the search restores everything

### Flow 3: All Items Claimed

1. The last available item is claimed
2. **Outcome:** Empty state is shown ("All needs have been claimed!") with an encouraging message

### Flow 4: Coordinator Manages Quotes (separate route)

1. Coordinator navigates to the Quote Manager screen
2. Coordinator sees a list of existing quotes
3. Coordinator adds a new quote by entering text and attribution
4. Coordinator edits or deletes existing quotes
5. **Outcome:** Quote list is updated; the public registry shows a random quote from the updated list

## Empty States

- **All items claimed:** Show an encouraging empty state when no unclaimed items remain
- **Search returns no results:** Show a "no matching items" empty state
- **No items at all:** Show an empty state prompting the coordinator to add needs

## Testing

See `product-plan/sections/public-registry/tests.md` for UI behavior test specs covering:
- Claim modal success and validation failure paths
- Multi-quantity stepper behavior
- Real-time search and empty search state
- Item disappearance after full claim
- Quote display and empty quote array

## Files to Reference

- `product-plan/sections/public-registry/README.md` — Feature overview
- `product-plan/sections/public-registry/tests.md` — UI behavior test specs
- `product-plan/sections/public-registry/components/` — React components
- `product-plan/sections/public-registry/types.ts` — TypeScript interfaces
- `product-plan/sections/public-registry/sample-data.json` — Sample data
- `product-plan/sections/public-registry/screenshot.png` — Visual reference

## Done When

- [ ] Public registry renders with real data from the backend
- [ ] Items are grouped by category with high-priority items surfaced first
- [ ] Search filters items in real time
- [ ] Claim modal opens, accepts name/email/quantity/note, and fires `onClaimItem`
- [ ] Confirmation screen shows drop-off instructions
- [ ] Fully claimed items are hidden from the registry
- [ ] All empty states render correctly
- [ ] Quote appears at the top; QuoteManager allows coordinator to manage quotes
- [ ] Image thumbnails show for items with `imageUrl`; lightbox opens on click
- [ ] Responsive on mobile
- [ ] Matches the visual design (see screenshot)
