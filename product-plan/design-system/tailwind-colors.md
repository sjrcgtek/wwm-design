# Tailwind Color Configuration

## Color Choices

- **Primary:** `lime` — Used for buttons, links, active nav states, progress indicators, and key accents. Use `lime-700` as the main action color.
- **Secondary:** `amber` — Used for high-priority badges, brand preference labels, and notes.
- **Neutral:** `stone` — Used for all backgrounds, text, borders, and UI chrome.

## Usage Examples

```
Primary button:       bg-lime-700 hover:bg-lime-800 text-white
Primary focus ring:   focus:ring-2 focus:ring-lime-700
Active nav item:      bg-lime-100 dark:bg-lime-900/40 text-lime-800 dark:text-lime-300
Priority badge:       bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300
Brand preference:     text-amber-600 dark:text-amber-400
Body text:            text-stone-900 dark:text-stone-100
Muted text:           text-stone-500 dark:text-stone-400
Card border:          border-stone-200 dark:border-stone-800
Card background:      bg-white dark:bg-stone-900
Page background:      bg-stone-50 dark:bg-stone-950
```

## Tailwind v4 Note

This project uses Tailwind CSS v4. All colors are built-in Tailwind utilities — no custom configuration required.
