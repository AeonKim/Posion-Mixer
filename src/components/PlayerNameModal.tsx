import { useState } from 'react'

interface PlayerNameModalProps {
  isOpen: boolean
  onSubmit: (name: string) => void
}

// 플레이어 이름 입력 모달 - 게임 시작 전 사용자 이름을 받는 컴포넌트 (동영상 배경 포함)
export default function PlayerNameModal({ isOpen, onSubmit }: PlayerNameModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim().length < 2) {
      setError('이름은 최소 2글자 이상이어야 합니다.')
      return
    }
    
    if (name.trim().length > 20) {
      setError('이름은 20글자를 초과할 수 없습니다.')
      return
    }
    
    onSubmit(name.trim())
    setName('')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* 동영상 배경 */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3C/svg%3E"
        >
          <source src="/potion-mixer-background.mp4" type="video/mp4" />
          {/* 비디오 로드 실패 시 그라데이션 배경 */}
        </video>
        
        {/* 비디오 위 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/70 to-pink-900/70"></div>
      </div>

      {/* 모달 컨텐츠 */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
          <div className="text-center mb-6">
            {/* Magical Potion Logo */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg 
                width="32" 
                height="32" 
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
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Potion Mixer
              </h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
              Welcome to the magical world of alchemy!<br />
              Enter your name to begin your journey.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Alchemist Name
              </label>
              <input
                type="text"
                id="playerName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Enter your magical name..."
                className="w-full px-4 py-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg"
                autoFocus
                maxLength={20}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={name.trim().length < 2}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
            >
              Begin Your Magical Journey ✨
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your magical achievements will be recorded in the alchemist's tome
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 