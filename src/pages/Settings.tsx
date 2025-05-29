import { Link } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'

// Settings page - 간결한 게임 설정과 정보 화면
export default function Settings() {
  const { player, loginPlayer } = useGameStore()

  const handleChangePlayer = () => {
    const newName = prompt('Enter your player name:', player?.name || '')
    if (newName && newName.trim()) {
      loginPlayer(newName.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
          >
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <div></div>
        </div>

        {/* Game Info */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* Magical Potion Logo */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-purple-600 dark:text-purple-400"
            >
              {/* Magic Wand */}
              <path 
                d="M3 21l18-18M8 8l2 2M12 12l2 2" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
              {/* Sparkles */}
              <path 
                d="M21 3h-3m1.5-1.5v3M16 8h-2m1-1v2M9 15h-2m1-1v2" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeLinecap="round"
              />
              {/* Potion Bottle */}
              <path 
                d="M14 2v2h1v2c0 2-1 3-2 4v6c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6c-1-1-2-2-2-4V4h1V2h-6z" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                fill="none"
              />
              <circle cx="18" cy="14" r="0.5" fill="currentColor"/>
              <circle cx="16" cy="16" r="0.3" fill="currentColor"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Potion Mixer</h2>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong className="text-gray-900 dark:text-white">🧪 How to Play:</strong><br />
              Mix magical potions by pouring them between flasks until each flask contains only one color.
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">🎯 Goal:</strong><br />
              Create perfect potion combinations - all colors sorted into separate flasks!
            </p>
            <p>
              <strong className="text-gray-900 dark:text-white">💡 Tips:</strong><br />
              Use hints wisely, minimize moves for higher scores, and master the art of alchemy!
            </p>
          </div>
        </div>

        {/* Player Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Player</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-900 dark:text-white font-medium">
                {player?.name || 'Guest'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Current player name
              </div>
            </div>
            <button
              onClick={handleChangePlayer}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Change Name
            </button>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sound</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-900 dark:text-white font-medium">Sound Effects</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Pour water sound when moving liquids
                </div>
              </div>
              <div className="text-green-600 dark:text-green-400 font-medium">
                Enabled
              </div>
            </div>
          </div>
        </div>

        {/* Game Features */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Game Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-gray-900 dark:text-white">Difficulty Levels</div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Easy: 4 tubes, 2 colors</li>
                <li>• Medium: 10 tubes, 8 colors</li>
                <li>• Hard: 12 tubes, 10 colors</li>
                <li>• Extra Hard: 14 tubes, 12 colors</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-gray-900 dark:text-white">Game Features</div>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Hint system (3 hints per game)</li>
                <li>• Unlimited undo moves</li>
                <li>• Timer and move counter</li>
                <li>• Score tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 