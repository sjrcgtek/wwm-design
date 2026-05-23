import { Globe, List, ClipboardList } from 'lucide-react'
import type { NavigationItem } from './AppShell'

const iconMap: Record<string, React.ReactNode> = {
  'Public Registry': <Globe size={16} />,
  'Needs List': <List size={16} />,
  'Donor Commitments': <ClipboardList size={16} />,
}

interface MainNavProps {
  items: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function MainNav({ items, onNavigate }: MainNavProps) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.href}>
          <button
            onClick={() => onNavigate?.(item.href)}
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left
              ${item.isActive
                ? 'bg-lime-100 dark:bg-lime-900/40 text-lime-800 dark:text-lime-300'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-stone-200'
              }
            `}
          >
            <span className={item.isActive ? 'text-lime-700 dark:text-lime-400' : 'text-stone-400 dark:text-stone-500'}>
              {iconMap[item.label] ?? <List size={16} />}
            </span>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
