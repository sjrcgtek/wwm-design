# Needs List

## Overview

The Needs List is a coordinator tool for managing all items on the ministry's donation registry. Coordinators can add new needs, edit existing ones inline, remove items, and reorder the list via drag and drop. Each item shows a live claim progress indicator so coordinators can see at a glance what still needs donors.

## User Flows

- Coordinator views all needs grouped by category, each showing quantity needed and quantity claimed
- Coordinator clicks an item row to edit its fields inline (name, description, quantity, brand preference, category, photo)
- Coordinator saves or cancels the inline edit
- Coordinator adds a new need via an inline form that appends to the list
- Coordinator removes an item; if the item has existing claims, a warning appears before confirming deletion
- Coordinator reorders items within the list via drag and drop

## Components Provided

- `NeedsList` — Main view; accepts `categories`, `needs`, `onUpdateNeed`, `onAddNeed`, `onDeleteNeed`, `onReorderNeeds`
- `CategoryList` — Grouped category view with add/edit/delete for categories; accepts `categories`, `needs`, plus category callbacks
- `NeedRow` — Individual need row with inline editing, drag handle, image thumbnail, and lightbox
- `AddNeedForm` — Inline form for adding a new need with all fields including optional photo upload
- `ImagePicker` — Reusable image picker component used within the need form for photo upload

## Callback Props

| Callback | Triggered When |
|----------|---------------|
| `onUpdateNeed(needId, values)` | Coordinator saves inline edits to a need |
| `onAddNeed(values)` | Coordinator submits the add-need form |
| `onDeleteNeed(needId)` | Coordinator confirms deletion of a need |
| `onReorderNeeds(needs)` | Coordinator drops a need in a new position |
| `onAddCategory(label)` | Coordinator adds a new category |
| `onUpdateCategory(categoryId, label)` | Coordinator saves a category label edit |
| `onDeleteCategory(categoryId)` | Coordinator confirms deletion of a category |
| `onReorderCategories(categories)` | Coordinator reorders categories |

## Visual Reference

See `screenshot.png` for the target design.
