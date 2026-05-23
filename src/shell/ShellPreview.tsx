import { useState } from 'react'
import { AppShell } from './components/AppShell'

const allItems = [
  { label: 'Public Registry', href: '/registry' },
  { label: 'Needs List', href: '/needs' },
  { label: 'Donor Commitments', href: '/commitments' },
]

export default function ShellPreview() {
  const [activeHref, setActiveHref] = useState('/registry')

  const navigationItems = allItems.map((item) => ({
    ...item,
    isActive: item.href === activeHref,
  }))

  const user = {
    name: 'Sarah Coordinator',
    avatarUrl: undefined,
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      user={user}
      onNavigate={(href) => setActiveHref(href)}
      onLogout={() => console.log('Logout')}
    >
      <div className="p-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          {allItems.find((i) => i.href === activeHref)?.label}
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Section content will render here.
        </p>
      </div>
    </AppShell>
  )
}
