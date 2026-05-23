# Public Registry

## Overview

The donor-facing registry showing all available (unclaimed) needs. Donors can browse items by category, search by name, and claim an item by submitting their name, email, and an optional note. After claiming, a confirmation screen shows drop-off instructions. Fully claimed items are hidden. A random saint quote appears at the top of the page for inspiration.

## User Flows

- Donor views the registry and sees all available needs grouped by category, with high-priority items surfaced at the top
- Donor searches the list by item name in real time
- Donor clicks "Claim" — a modal opens asking for name, email, quantity (if > 1 available), and an optional note for the coordinator
- Donor submits; modal transitions to a confirmation screen with drop-off instructions and confetti
- Donor closes the modal; the item disappears from the registry when fully claimed
- Empty state shown when all items have been claimed

## Components Provided

- `PublicRegistry` — Main view; accepts `registry`, `categories`, `items`, `quotes`, `onClaimItem`
- `ItemCard` — Individual item card with image thumbnail (if set), claim button, and lightbox on image click
- `ClaimModal` — Claim form with name, email, quantity stepper, optional note, and confirmation screen
- `QuoteBlock` — Displays a single saint quote with amber left border
- `QuoteManager` — Coordinator-only screen for adding, editing, and deleting quotes

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onClaimItem(itemId, donor)` | Donor submits the claim form |
| `onAddQuote(text, attribution)` | Coordinator adds a new quote |
| `onUpdateQuote(quoteId, text, attribution)` | Coordinator saves edits to a quote |
| `onDeleteQuote(quoteId)` | Coordinator deletes a quote |

## Visual Reference

See `screenshot.png` for the target design.
