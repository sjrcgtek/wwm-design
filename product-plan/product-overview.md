# Walking with Moms in Need — Product Overview

## Summary

Walking with Moms in Need is a church ministry registry that helps a support group coordinator manage a live list of items needed by new and expecting moms, and allows congregation members to claim and donate those items without needing to create an account. It works like a gift registry but for an ever-changing list of needs rather than a one-time event.

## Problems & Solutions

**No Central Place to See What's Needed** — Without a shared list, donors rely on word-of-mouth. The public registry gives donors a live view of what's needed at any time.

**Duplicate Donations** — Item claiming marks a need as committed the moment a donor signs up, so others know to choose something else.

**Coordinator Has No Visibility into Fulfillment** — The commitments dashboard gives the coordinator a clear view of all donor pledges and item status.

**Donors Have No Confirmation** — Email confirmations reinforce the commitment and provide delivery details.

## Planned Sections

1. **Public Registry** — The donor-facing page showing all available and claimed items with a simple claim flow that captures the donor's name and email.
2. **Needs List** — Coordinator view for adding, editing, and removing requested items — including item name, description, quantity, and brand or store preferences.
3. **Donor Commitments** — Coordinator dashboard showing all claimed items, donor contact info, claim dates, and fulfillment status so nothing falls through the cracks.

## Product Entities

- **Need** — A specific item on the ministry's needs list. Includes a name, description, quantity needed, and optional brand or store preference. A Need may be fully claimed, partially claimed, or still open.
- **Commitment** — A donor's pledge to provide a specific Need. Captures the donor's name, email, quantity they are providing, and when the commitment was made. A single Need may have multiple Commitments if the quantity is greater than one.
- **Coordinator** — The ministry administrator who manages the Needs list and receives notifications when Commitments are made.

## Design System

**Colors:**
- Primary: `lime` — Buttons, links, key accents
- Secondary: `amber` — Tags, highlights, priority indicators
- Neutral: `stone` — Backgrounds, text, borders

**Typography:**
- Heading: DM Sans
- Body: DM Sans
- Mono: IBM Plex Mono

## Implementation Sequence

1. **Shell** — Set up design tokens and application shell with sidebar navigation
2. **Public Registry** — Donor-facing registry with item cards, search, claim modal, saint quotes
3. **Needs List** — Coordinator item management with categories, priority flagging, images
4. **Donor Commitments** — Coordinator dashboard with fulfillment tracking and donor notes
