import { useState } from 'react'
import { LogOut, ChevronUp } from 'lucide-react'
import type { AppShellUser } from './AppShell'

interface UserMenuProps {
  user: AppShellUser
  onLogout?: () => void
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/50 shrink-0">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">{initials(user.name)}</span>
          )}
        </div>
        <span className="flex-1 text-sm font-medium text-stone-700 dark:text-stone-300 text-left truncate">
          {user.name}
        </span>
        <ChevronUp
          size={14}
          className={`text-stone-400 transition-transform ${open ? '' : 'rotate-180'}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg overflow-hidden">
          <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-700">
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400">Signed in as</p>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">{user.name}</p>
          </div>
          <button
            onClick={() => { setOpen(false); onLogout?.() }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
