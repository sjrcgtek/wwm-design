# Public Registry Specification

## Overview
The Public Registry is a donor-facing view showing all available (unclaimed) needs from the ministry's list. Donors can browse items, search by name, and claim an item by submitting their name and email in a modal form.

## User Flows
- Donor views the registry and sees all available (unclaimed) needs, grouped by category
- Donor searches the list by item name to find something specific
- Donor clicks "Claim" on an item — a modal opens asking for their name, email, and quantity (if more than 1 is available)
- Donor submits the claim form; the modal transitions to a confirmation screen showing drop-off instructions
- Donor closes the confirmation; the item disappears from the registry
- Claimed items are hidden — only available needs are shown
- Empty state displayed when all items have been claimed

## UI Requirements
- Search input to filter items by name in real time
- Items grouped under labeled category headings
- Each item card shows: item name, description, quantity needed, and brand/store preference (if set)
- "Claim" button on each item card
- Claim modal collects donor name, email, and quantity (stepper, only shown when more than 1 is available)
- After submission, modal shows a confirmation screen with drop-off instructions and a "Done" button
- Empty state when all items have been claimed or search returns no results
- Responsive layout for mobile and desktop

## Configuration
- shell: true
