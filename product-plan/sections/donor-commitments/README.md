# Donor Commitments

## Overview

The Donor Commitments section is a coordinator dashboard that lists every claim made against the registry. Coordinators can track fulfillment status, search by donor or item, edit donor details inline, and delete bad or duplicate entries. A summary bar at the top gives a quick count of items fully covered, fulfilled commitments, and pending commitments.

## User Flows

- Coordinator views all commitments sorted newest first, with a summary bar at the top
- Coordinator searches by donor name or item name in real time
- Coordinator filters the list by status: All, Pending, or Fulfilled
- Coordinator toggles a commitment as fulfilled using an inline checkbox or toggle
- Coordinator clicks a commitment row to edit donor name, email, quantity, or note inline
- Coordinator saves or cancels the inline edit
- Coordinator deletes a commitment with an inline confirmation step
- Donor notes (from the claim form) are visible on each commitment row

## Components Provided

- `DonorCommitments` — Main view; accepts `commitments`, `onToggleFulfilled`, `onUpdateCommitment`, `onDeleteCommitment`
- `CommitmentRow` — Individual commitment row with inline editing, fulfillment toggle, note display, and delete confirmation

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onToggleFulfilled(commitmentId, fulfilled)` | Coordinator toggles the fulfilled checkbox |
| `onUpdateCommitment(commitmentId, values)` | Coordinator saves inline edits to a commitment |
| `onDeleteCommitment(commitmentId)` | Coordinator confirms deletion of a commitment |

## Visual Reference

See `screenshot.png` for the target design.
