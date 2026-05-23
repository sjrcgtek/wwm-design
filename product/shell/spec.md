# Application Shell Specification

## Overview
The shell provides a persistent sidebar layout that wraps all three sections of Walking with Moms in Need. It serves both the public-facing coordinator experience and the donor-facing registry within a single consistent interface.

## Navigation Structure
- **Public Registry** → `/registry` — Donor-facing item listing and claim flow
- **Needs List** → `/needs` — Coordinator manages requested items
- **Donor Commitments** → `/commitments` — Coordinator tracks fulfillment

## User Menu
Located at the bottom of the sidebar. Displays the coordinator's avatar initials, name, and a logout option via a simple popover or inline button.

## Layout Pattern
**Sidebar Navigation** — Fixed 240px sidebar on the left, scrollable content area on the right. The app name and logo appear at the top of the sidebar. Navigation items stack vertically below. The user menu is pinned to the bottom of the sidebar.

## Responsive Behavior
- **Desktop (lg+):** Sidebar is always visible at 240px. Content area fills remaining space.
- **Tablet (md):** Sidebar collapses to icon-only (60px). Labels are hidden.
- **Mobile (< md):** Sidebar is hidden by default. A hamburger menu in a top bar opens a slide-in drawer overlay.

## Design Notes
- Active nav item uses lime-600 background with lime-900 text (light) or lime-400 text (dark)
- Inactive nav items use stone-600 text with a lime-100/stone-700 hover state
- Sidebar background: white (light) / stone-900 (dark)
- Content area background: stone-50 (light) / stone-950 (dark)
- App name uses DM Sans, bold, with a small leaf or heart icon beside it
- Separator line divides nav items from user menu at bottom of sidebar
