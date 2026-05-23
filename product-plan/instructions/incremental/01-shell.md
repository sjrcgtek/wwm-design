# Milestone 1: Application Shell

> **Provide alongside:** `product-plan/product-overview.md`
> **Prerequisites:** None

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Set up the design tokens and application shell — the persistent chrome that wraps all three sections of Walking with Moms in Need.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for color usage guidance
- See `product-plan/design-system/fonts.md` for Google Fonts setup (DM Sans + IBM Plex Mono)

**Color palette:**
- **Primary:** Lime — used for active nav items, primary action buttons (lime-600 / lime-700)
- **Secondary:** Amber — used for quote accents, priority indicators, donor notes
- **Neutral:** Stone — used for backgrounds, borders, body text

**Typography:**
- **Headings & body:** DM Sans (Google Fonts)
- **Code/technical:** IBM Plex Mono

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper (fixed 240px sidebar + scrollable content area)
- `MainNav.tsx` — Vertical navigation list with active state styling
- `UserMenu.tsx` — Avatar initials + name at the bottom of the sidebar with sign-out popover

**Wire Up Navigation:**

Connect navigation to your routing library:

```tsx
<AppShell
  navigationItems={[
    { label: 'Public Registry', href: '/registry', isActive: currentPath === '/registry' },
    { label: 'Needs List', href: '/needs', isActive: currentPath === '/needs' },
    { label: 'Donor Commitments', href: '/commitments', isActive: currentPath === '/commitments' },
  ]}
  user={{ name: 'Jane Coordinator' }}
  onNavigate={(href) => router.push(href)}
  onLogout={() => signOut()}
>
  {children}
</AppShell>
```

**Responsive Behavior:**
- **Desktop (lg+):** Fixed 240px sidebar always visible
- **Tablet (md):** Sidebar collapses to icon-only (60px)
- **Mobile (< md):** Sidebar hidden; hamburger button in top bar opens a slide-in drawer overlay

**User Menu:**

The `UserMenu` component expects:
- `user.name` — Coordinator's display name
- `onLogout` — Callback fired when the user signs out

## Files to Reference

- `product-plan/design-system/` — Design tokens (CSS variables, Tailwind colors, fonts)
- `product-plan/shell/README.md` — Shell design intent and wiring guide
- `product-plan/shell/components/` — Shell React components
- `product-plan/shell/screenshot.png` — Shell visual reference (if available)

## Done When

- [ ] Design tokens are configured (colors and fonts)
- [ ] Shell renders with the sidebar navigation
- [ ] Navigation links to all three routes: `/registry`, `/needs`, `/commitments`
- [ ] Active nav item is highlighted correctly based on current route
- [ ] User menu shows coordinator name and handles logout
- [ ] Responsive on mobile (hamburger menu opens sidebar drawer)
- [ ] Light and dark mode both look correct
