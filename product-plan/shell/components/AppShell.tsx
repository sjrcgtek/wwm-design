import React, { useState } from 'react'
import { MainNav } from './MainNav'
import { UserMenu } from './UserMenu'
import { Menu, X, Heart } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface AppShellUser {
  name: string
  avatarUrl?: string
}

interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  user?: AppShellUser
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export function AppShell({ children, navigationItems, user, onNavigate, onLogout }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex h-screen bg-stone-50 dark:bg-stone-950 font-['DM_Sans',sans-serif]">

      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800">
        <SidebarContent
          navigationItems={navigationItems}
          user={user}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </aside>

      {/* Drawer overlay — mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-60 flex flex-col bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50">
            <button
              onClick={() => setDrawerOpen(false)}
              className="absolute top-4 right-4 p-1 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            >
              <X size={18} />
            </button>
            <SidebarContent
              navigationItems={navigationItems}
              user={user}
              onNavigate={(href) => { setDrawerOpen(false); onNavigate?.(href) }}
              onLogout={onLogout}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-lime-600 fill-lime-600" />
            <span className="font-semibold text-stone-800 dark:text-stone-100 text-sm">Walking with Moms</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ navigationItems, user, onNavigate, onLogout }: Omit<AppShellProps, 'children'>) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-lime-100 dark:bg-lime-900">
          <Heart size={14} className="text-lime-700 dark:text-lime-400 fill-lime-700 dark:fill-lime-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-tight">Walking with Moms</p>
          <p className="text-xs text-stone-400 dark:text-stone-500 leading-tight">in Need</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <MainNav items={navigationItems} onNavigate={onNavigate} />
      </nav>

      {/* User menu */}
      <div className="border-t border-stone-100 dark:border-stone-800 px-3 py-3">
        {user && <UserMenu user={user} onLogout={onLogout} />}
      </div>
    </>
  )
}
