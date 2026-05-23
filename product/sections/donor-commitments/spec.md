# Donor Commitments Specification

## Overview
The Donor Commitments section is a coordinator dashboard that lists every claim made against the registry, sorted newest first. Coordinators can track fulfillment, edit donor details, add notes, and delete bad or duplicate entries — ensuring nothing falls through the cracks between a donor's pledge and actual receipt.

## User Flows
- View all commitments in a flat list sorted by claim date (newest first)
- Search commitments by donor name or item name
- Filter commitments by status: All, Pending, or Fulfilled
- Toggle a commitment as fulfilled (simple checkbox/toggle — no date entry required)
- Edit a commitment's donor name, email, or quantity
- Add or edit a free-text note on a commitment (e.g. "dropping off Sunday")
- Delete a commitment with a confirmation step

## UI Requirements
- Summary bar at the top showing: items fully covered count, fulfilled commitments count, and pending commitments count
- Search input and status filter (All / Pending / Fulfilled) displayed together below the summary
- Each commitment row shows: item name, donor name, donor email, quantity committed, claim date, fulfillment toggle, and note indicator
- Inline editing for donor name, email, quantity, and note — no separate modal
- Delete requires a confirmation (inline warning or dialog)
- Empty state when no commitments exist
- Empty state when search/filter returns no results

## Configuration
- shell: true
