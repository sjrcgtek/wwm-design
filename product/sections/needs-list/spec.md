# Needs List Specification

## Overview
The Needs List is a coordinator tool for managing all requested items. Coordinators can add, edit, remove, and reorder items directly in the list. Each item shows its claim progress so coordinators can see at a glance what still needs donors.

## User Flows
- Coordinator views all needs grouped by category, each showing quantity needed and quantity claimed
- Coordinator clicks an item row to edit its fields inline (name, description, quantity, brand preference, category)
- Coordinator confirms or cancels inline edits
- Coordinator adds a new item via an inline form appended to the appropriate category (or a general "Add item" row)
- Coordinator removes an item; if the item has claims, a warning dialog appears before confirming deletion
- Coordinator reorders items within the list via drag and drop

## UI Requirements
- List of items grouped by category with a claim progress indicator per item (e.g. "2 of 4 claimed")
- Clicking a row activates inline editing for all fields (name, description, quantity needed, brand preference, category)
- Inline edit row has Save and Cancel actions
- Add item button opens a blank inline form at the bottom of the list
- Delete button per item; shows a confirmation dialog with a warning if the item has existing claims
- Drag handle on each row for reordering
- Empty state when no items exist yet

## Configuration
- shell: true
