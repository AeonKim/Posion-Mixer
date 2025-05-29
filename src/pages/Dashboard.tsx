import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useGameStore } from '../stores/gameStore'
import PlayerNameModal from '../components/PlayerNameModal'

// Dashboard page - Clean minimal design inspired by shadcn/ui
export default function Dashboard() {
  const [showNameModal, setShowNameModal] = useState(false)
  const { player, loginPlayer, logoutPlayer } = useGameStore()

  // 플레이어 확인
  useEffect(() => {
    // 플레이어가 없을 때만 모달 표시
    if (!player) {
      setShowNameModal(true)
    }
  }, [player])

  // 플레이어 이름 설정 (Supabase 연동)
  const handlePlayerNameSubmit = async (name: string) => {
    const success = await loginPlayer(name)
    // loginPlayer는 이제 항상 true를 반환하므로 (오프라인 모드 포함)
    setShowNameModal(false)
  }

  // 로그아웃 처리
  const handleLogout = () => {
    logoutPlayer()
    setShowNameModal(true)
  }

  // 저장된 점수 가져오기
  const getSavedScores = () => {
    try {
      return JSON.parse(localStorage.getItem('waterSortScores') || '[]')
    } catch {
      return []
    }
  }

  // 통계 계산
  const getStats = () => {
    const scores = getSavedScores()
    const playerScores = scores.filter((score: any) => score.player?.name === player?.name)
    
    return {
      gamesPlayed: playerScores.length,
      bestScore: playerScores.length > 0 ? Math.max(...playerScores.map((s: any) => s.score)) : 0,
      totalMoves: playerScores.reduce((sum: number, s: any) => sum + s.moves, 0),
      averageTime: playerScores.length > 0 ? Math.round(playerScores.reduce((sum: number, s: any) => sum + s.time, 0) / playerScores.length) : 0
    }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {/* Magical Potion Logo - New Design */}
            <svg 
              width="28" 
              height="28" 
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
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                Potion Mixer
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Mix and match magical potions to create perfect combinations!
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {player && (
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back</p>
                <p className="font-semibold text-gray-900 dark:text-white">{player.name}</p>
              </div>
            )}
            <Link 
              to="/settings" 
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.gamesPlayed}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Games Played</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.bestScore}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Best Score</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.totalMoves}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Moves</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.averageTime}s</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Time</p>
          </div>
        </div>

        {/* Game Levels */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose Your Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Link 
              to="/play/1" 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all group"
            >
              <div className="text-2xl font-black text-green-600 dark:text-green-400 mb-2">EASY</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">4 tubes • Level 1-2</div>
            </Link>
            
            <Link 
              to="/play/3" 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-all group"
            >
              <div className="text-2xl font-black text-yellow-600 dark:text-yellow-400 mb-2">MEDIUM</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">10 tubes • Level 3-4</div>
            </Link>
            
            <Link 
              to="/play/5" 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
            >
              <div className="text-2xl font-black text-red-600 dark:text-red-400 mb-2">HARD</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">12 tubes • Level 5-6</div>
            </Link>

            <Link 
              to="/play/7" 
              className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group"
            >
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mb-2">EXTRA HARD</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">14 tubes • Level 7+</div>
            </Link>
          </div>

          <div className="flex justify-center">
            <Link 
              to="/play/random" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Random Level
            </Link>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Account</h3>
              <p className="text-gray-600 dark:text-gray-400">Manage your account settings</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Potion Mixer © 2024 | Gpters Wizard & Co.
        </p>
      </div>

      {/* Player Name Modal */}
      <PlayerNameModal 
        isOpen={showNameModal}
        onSubmit={handlePlayerNameSubmit}
      />
    </div>
  )
} 