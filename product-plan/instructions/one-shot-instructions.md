# Walking with Moms in Need — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Product Overview

Walking with Moms in Need is a church ministry registry that helps a support group coordinator manage a live list of items needed by new and expecting moms, and allows congregation members to claim and donate those items without needing to create an account. It works like a gift registry but for an ever-changing list of needs rather than a one-time event.

**Problems & Solutions:**

- **No Central Place to See What's Needed** — The public registry gives donors a live view of what's needed at any time
- **Duplicate Donations** — Item claiming marks a need as committed the moment a donor signs up
- **Coordinator Has No Visibility** — The commitments dashboard gives the coordinator a clear view of all donor pledges
- **Donors Have No Confirmation** — Drop-off instructions are shown immediately after claiming

**Sections:**
1. **Public Registry** — Donor-facing page with item cards, search, claim modal, and saint quotes
2. **Needs List** — Coordinator tool for managing items with categories, priority flagging, and photos
3. **Donor Commitments** — Coordinator dashboard with fulfillment tracking, search, filter, and donor notes

**Design System:** Primary: lime · Secondary: amber · Neutral: stone · Fonts: DM Sans + IBM Plex Mono

---

# Milestone 1: Application Shell

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all three sections.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for color usage guidance
- See `product-plan/design-system/fonts.md` for Google Fonts setup (DM Sans + IBM Plex Mono)

**Color palette:**
- **Primary:** Lime — used for active nav items, primary action buttons (lime-600 / lime-700)
- **Secondary:** Amber — used for quote accents, priority indicators, donor notes
- **Neutral:** Stone — used for backgrounds, borders, body text

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper (fixed 240px sidebar + scrollable content area)
- `MainNav.tsx` — Vertical navigation list with active state styling
- `UserMenu.tsx` — Avatar initials + name at the bottom of the sidebar

**Wire Up Navigation:**

```tsx
<AppShell
  navigationItems={[
    { label: 'Public Registry', href: '/registry', isActive: currentPath === '/registry' },
    { label: 'Needs List', href: '/needs', isActive: currentPath === '/needs' },
    { label: 'Donor Commitments', href: '/commitments', isActive: currentPath === '/commitments' },
  ]}
  user={{ name: 'Jane Coordinator' }}
  onNavigate={(href) => router.push(href)}
  onLogout={() => signOut()}
>
  {children}
</AppShell>
```

**Responsive Behavior:**
- Desktop (lg+): Fixed 240px sidebar always visible
- Tablet (md): Sidebar collapses to icon-only (60px)
- Mobile (< md): Hamburger button opens a slide-in drawer overlay

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/shell/README.md` — Shell wiring guide
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors and fonts)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to `/registry`, `/needs`, `/commitments`
- [ ] Active nav item highlighted based on current route
- [ ] User menu shows coordinator name and handles logout
- [ ] Responsive on mobile (hamburger menu opens sidebar)
- [ ] Light and dark mode both look correct

---

# Milestone 2: Public Registry

## Goal

Implement the Public Registry — the donor-facing view where donors browse available needs and claim items.

## Overview

A publicly accessible page showing all unclaimed items grouped by category. Donors can search, browse, and claim items through a modal form. After claiming, a confirmation screen shows drop-off instructions. A random saint quote appears at the top. Coordinators manage quotes through a separate QuoteManager screen.

**Key Functionality:**
- Browse available needs grouped by category (high-priority items surfaced first)
- Real-time search filtering by item name
- Claim items via modal (name, email, optional quantity stepper, optional note)
- Confirmation screen with drop-off instructions
- Fully claimed items hidden automatically
- Random saint quote at top of page
- Coordinator-only Quote Manager for managing the quote list

## Components Provided

Copy from `product-plan/sections/public-registry/components/`:

- `PublicRegistry.tsx` — Main view
- `ItemCard.tsx` — Item card with thumbnail, claim button, and lightbox
- `ClaimModal.tsx` — Claim form with confirmation screen
- `QuoteBlock.tsx` — Single quote display with amber border
- `QuoteManager.tsx` — Coordinator quote management screen

## Props Reference

```typescript
interface Registry { dropOffInstructions: string }
interface Item {
  id: string; name: string; description: string; categoryId: string
  quantityNeeded: number; quantityClaimed: number; brandPreference: string | null
  purchaseUrl: string | null; highPriority: boolean; imageUrl: string | null
}
interface Quote { id: string; text: string; attribution: string }
interface DonorClaim { name: string; email: string; quantity: number; note?: string }
```

| Callback | Triggered When |
|----------|---------------|
| `onClaimItem(itemId, donor)` | Donor submits the claim form |
| `onAddQuote(text, attribution)` | Coordinator adds a new quote |
| `onUpdateQuote(quoteId, text, attribution)` | Coordinator saves quote edits |
| `onDeleteQuote(quoteId)` | Coordinator deletes a quote |

## Expected User Flows

### Claim an Item
1. Donor views registry → clicks "Claim" on an item
2. Modal opens → enters name, email, optional quantity and note → submits
3. **Outcome:** Confirmation screen with drop-off instructions; item disappears when fully claimed

### Search
1. Donor types in search → list filters in real time
2. **Outcome:** Only matching items shown; clearing search restores full list

### Coordinator Manages Quotes
1. Coordinator opens Quote Manager → adds/edits/deletes quotes
2. **Outcome:** Public registry shows a random quote from the updated list

## Empty States
- All items claimed: Encouraging empty state
- Search returns no results: "No matching items" state
- No items: Prompt coordinator to add needs

## Testing

See `product-plan/sections/public-registry/tests.md`

## Files to Reference

- `product-plan/sections/public-registry/README.md`
- `product-plan/sections/public-registry/tests.md`
- `product-plan/sections/public-registry/components/`
- `product-plan/sections/public-registry/types.ts`
- `product-plan/sections/public-registry/sample-data.json`
- `product-plan/sections/public-registry/screenshot.png`

## Done When

- [ ] Registry renders with real data grouped by category
- [ ] High-priority items surfaced first within each category
- [ ] Real-time search works
- [ ] Claim modal opens, validates, and fires `onClaimItem`
- [ ] Confirmation screen shows drop-off instructions
- [ ] Fully claimed items hidden
- [ ] All empty states render correctly
- [ ] Quote appears at top; QuoteManager allows coordinator to manage quotes
- [ ] Image thumbnails and lightbox work for items with `imageUrl`
- [ ] Responsive on mobile

---

# Milestone 3: Needs List

## Goal

Implement the Needs List — the coordinator's tool for managing all items on the donation registry.

## Overview

A coordinator-only screen where staff add, edit, remove, and reorder donation items. Items are grouped by category with claim progress indicators. All editing is inline (no modals). Coordinators can upload photos for items. Category management (add, rename, reorder, delete) is also supported.

**Key Functionality:**
- View needs grouped by category with claim progress
- Inline editing of all fields (name, description, quantity, brand preference, category, photo)
- Add new needs via inline form
- Delete needs with confirmation (extra warning if claims exist)
- Reorder needs via drag and drop
- Category management

## Components Provided

Copy from `product-plan/sections/needs-list/components/`:

- `NeedsList.tsx` — Main view
- `CategoryList.tsx` — Grouped category view with category management
- `NeedRow.tsx` — Individual row with inline editing, drag handle, thumbnail, lightbox
- `AddNeedForm.tsx` — Inline form for new needs
- `ImagePicker.tsx` — Photo upload with local preview

## Props Reference

```typescript
interface Need {
  id: string; name: string; description: string; categoryId: string
  quantityNeeded: number; quantityClaimed: number; brandPreference: string | null
  purchaseUrl: string | null; highPriority: boolean; imageUrl: string | null
}
interface NeedFormValues {
  name: string; description: string; categoryId: string; quantityNeeded: number
  brandPreference: string; purchaseUrl: string; highPriority: boolean; imageUrl: string | null
}
```

| Callback | Triggered When |
|----------|---------------|
| `onUpdateNeed(needId, values)` | Coordinator saves inline edits |
| `onAddNeed(values)` | Coordinator submits add form |
| `onDeleteNeed(needId)` | Coordinator confirms deletion |
| `onReorderNeeds(needs)` | Coordinator drops need in new position |
| `onAddCategory(label)` | Coordinator adds a category |
| `onUpdateCategory(categoryId, label)` | Coordinator renames a category |
| `onDeleteCategory(categoryId)` | Coordinator deletes a category |
| `onReorderCategories(categories)` | Coordinator reorders categories |

## Expected User Flows

### Add a Need
1. Coordinator clicks "Add item" → blank inline form appears
2. Fills in fields, optionally uploads photo → clicks "Add"
3. **Outcome:** `onAddNeed` fires; new need appears in list

### Edit a Need
1. Coordinator clicks a need row → inline edit form opens with current values
2. Updates fields → clicks "Save"
3. **Outcome:** `onUpdateNeed` fires; row returns to view mode

### Delete a Need
1. Coordinator clicks delete icon → confirmation appears (extra warning if claims exist)
2. Confirms → **Outcome:** `onDeleteNeed` fires; need removed

### Reorder
1. Coordinator drags a need to a new position
2. **Outcome:** `onReorderNeeds` fires with updated order

## Empty States
- No needs: Empty state with "Add item" prompt
- No categories: Prompt to create first category

## Testing

See `product-plan/sections/needs-list/tests.md`

## Files to Reference

- `product-plan/sections/needs-list/README.md`
- `product-plan/sections/needs-list/tests.md`
- `product-plan/sections/needs-list/components/`
- `product-plan/sections/needs-list/types.ts`
- `product-plan/sections/needs-list/sample-data.json`
- `product-plan/sections/needs-list/screenshot.png`

## Done When

- [ ] Needs list renders with real data grouped by category
- [ ] Claim progress indicator on each row
- [ ] Inline edit works and fires `onUpdateNeed`
- [ ] Add-need form works and fires `onAddNeed`
- [ ] Delete confirmation works; extra warning when claims exist
- [ ] Drag-and-drop reorder fires `onReorderNeeds`
- [ ] Photo upload shows preview and saves `imageUrl`; thumbnail on row
- [ ] Lightbox opens on thumbnail click
- [ ] Category management works (add, rename, delete, reorder)
- [ ] All empty states render correctly
- [ ] Responsive on mobile

---

# Milestone 4: Donor Commitments

## Goal

Implement the Donor Commitments dashboard — the coordinator's view for tracking every donor pledge from claim to fulfillment.

## Overview

A coordinator-only dashboard listing all donor pledges sorted newest first. Features a summary bar, real-time search, status filter, inline fulfillment toggle, inline editing, and delete with confirmation. Donor notes from the claim form are displayed on each row.

**Key Functionality:**
- Summary bar: items fully covered, fulfilled count, pending count
- Real-time search by donor name or item name
- Status filter: All, Pending, Fulfilled
- Fulfillment toggle per commitment
- Inline editing (donor name, email, quantity, note)
- Delete with inline confirmation
- Donor notes visible on commitment rows

## Components Provided

Copy from `product-plan/sections/donor-commitments/components/`:

- `DonorCommitments.tsx` — Main view
- `CommitmentRow.tsx` — Individual row with inline editing, fulfillment toggle, note display

## Props Reference

```typescript
interface Commitment {
  id: string; itemId: string; itemName: string; itemQuantityNeeded: number
  donorName: string; donorEmail: string; quantityCommitted: number
  claimedAt: string; fulfilled: boolean; note: string | null
}
interface CommitmentFormValues {
  donorName: string; donorEmail: string; quantityCommitted: number; note: string
}
type FulfillmentFilter = 'all' | 'pending' | 'fulfilled'
```

| Callback | Triggered When |
|----------|---------------|
| `onToggleFulfilled(commitmentId, fulfilled)` | Coordinator clicks fulfillment toggle |
| `onUpdateCommitment(commitmentId, values)` | Coordinator saves inline edits |
| `onDeleteCommitment(commitmentId)` | Coordinator confirms deletion |

## Expected User Flows

### Mark as Fulfilled
1. Coordinator clicks the fulfillment toggle on a pending commitment
2. **Outcome:** `onToggleFulfilled` fires; row updates to fulfilled state; summary bar recalculates

### Edit a Commitment
1. Coordinator clicks edit icon → inline form opens
2. Updates fields → clicks "Save"
3. **Outcome:** `onUpdateCommitment` fires; row updates in place

### Delete
1. Coordinator clicks delete → inline confirmation → confirms
2. **Outcome:** `onDeleteCommitment` fires; row removed; summary recalculates

### Search and Filter
1. Coordinator types in search + selects "Pending" filter
2. **Outcome:** Only pending commitments matching the search are shown

## Empty States
- No commitments: "No commitments yet — share the registry link"
- No search/filter results: "No matching commitments" with hint to clear filters

## Testing

See `product-plan/sections/donor-commitments/tests.md`

## Files to Reference

- `product-plan/sections/donor-commitments/README.md`
- `product-plan/sections/donor-commitments/tests.md`
- `product-plan/sections/donor-commitments/components/`
- `product-plan/sections/donor-commitments/types.ts`
- `product-plan/sections/donor-commitments/sample-data.json`
- `product-plan/sections/donor-commitments/screenshot.png`

## Done When

- [ ] Commitments list renders with real data sorted newest first
- [ ] Summary bar shows accurate counts
- [ ] Search and filter work (and combined)
- [ ] Fulfillment toggle fires `onToggleFulfilled`
- [ ] Inline edit works and fires `onUpdateCommitment`
- [ ] Delete confirmation works and fires `onDeleteCommitment`
- [ ] Donor notes visible on rows when present
- [ ] All empty states render correctly
- [ ] Responsive on mobile
