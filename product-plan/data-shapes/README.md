# UI Data Shapes

These types define the shape of data that the UI components expect to receive as props. They represent the **frontend contract** — what the components need to render correctly.

How you model, store, and fetch this data on the backend is an implementation decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **Need** — A specific item on the ministry's needs list (used in: needs-list, public-registry)
- **Category** — A grouping label for needs, e.g. "Baby Clothing", "Feeding" (used in: needs-list, public-registry)
- **Commitment** — A donor's pledge to provide a specific need (used in: donor-commitments)
- **DonorClaim** — The form data submitted when a donor claims an item (used in: public-registry)
- **Quote** — An inspirational saint quote shown randomly on the public registry (used in: public-registry)
- **Registry** — Top-level registry configuration, including drop-off instructions (used in: public-registry)

## Relationships

- Need belongs to a Category via `categoryId`
- A Need is considered fully claimed when `quantityClaimed >= quantityNeeded`
- Commitment belongs to a Need via `itemId`
- A single Need may have multiple Commitments

## Per-Section Types

Each section includes its own `types.ts` with the full interface definitions:

- `sections/public-registry/types.ts`
- `sections/needs-list/types.ts`
- `sections/donor-commitments/types.ts`

## Combined Reference

See `overview.ts` for all entity types aggregated in one file.
