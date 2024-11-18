import { CastleIcon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm sticky top-0">
      <div className="flex items-center space-x-2">
        <CastleIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Chess</h1>
      </div>
      <nav className="flex items-center space-x-4">
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" href="/home">
        Home
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" href="/puzzles">
        Puzzles
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" href="/versus">
        Play
        </Link>
        <Link className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400" href="/profile">
        Profile
        </Link>
      </nav>
    </header>
  )
}