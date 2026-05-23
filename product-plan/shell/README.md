# Application Shell

## Overview

A persistent sidebar layout wrapping all three sections. A fixed 240px sidebar sits on the left with the app logo, navigation, and user menu. The content area fills the remaining space and scrolls independently.

## Navigation

| Label | Route |
|-------|-------|
| Public Registry | `/registry` |
| Needs List | `/needs` |
| Donor Commitments | `/commitments` |

## Responsive Behavior

- **Desktop (md+):** Fixed 240px sidebar always visible
- **Mobile:** Sidebar hidden by default; hamburger button in top bar opens a slide-in drawer overlay

## Components Provided

- `AppShell` — Main layout wrapper; accepts `navigationItems`, `user`, `onNavigate`, `onLogout`
- `MainNav` — Vertical nav list with icons per section; active state via `isActive` on each item
- `UserMenu` — Avatar + name at bottom of sidebar with sign out popover

## Wiring Navigation

Pass `navigationItems` with `isActive` set based on your current route:

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

## Visual Reference

See `screenshot.png` for the target design (if available).
