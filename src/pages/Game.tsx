import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGameStore, generateLevel, Difficulty } from '../stores/gameStore'
import Tube from '../components/Tube'
import PlayerNameModal from '../components/PlayerNameModal'
import FireworksEffect from '../components/FireworksEffect'

// Game page - 실제 퍼즐 게임 플레이 화면 (4단계 난이도 시스템)
export default function Game() {
  const { levelId } = useParams<{ levelId: string }>()
  const navigate = useNavigate()
  const [timer, setTimer] = useState(0)
  const [showNameModal, setShowNameModal] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  
  const {
    tubes,
    selectedTube,
    moves,
    gameState,
    difficulty,
    hintsRemaining,
    player,
    currentScore,
    pouringTube,
    receivingTube,
    showFireworks,
    hintFromTube,
    hintToTube,
    selectTube,
    undoMove,
    restartLevel,
    initializeLevel,
    updateElapsedTime,
    useHint,
    canPour,
    isTubeComplete,
    isTubeEmpty,
    loginPlayer,
    saveScore
  } = useGameStore()

  // 플레이어 확인 및 레벨 초기화
  useEffect(() => {
    if (!player) {
      setShowNameModal(true)
      return
    }

    // 플레이어가 있으면 레벨 초기화
    const level = levelId === 'random' ? Math.floor(Math.random() * 10) + 1 : parseInt(levelId || '1')
    let gameDifficulty: Difficulty = 'easy'
    
    // 새로운 4단계 난이도 시스템
    if (level <= 2) gameDifficulty = 'easy'
    else if (level <= 4) gameDifficulty = 'medium'
    else if (level <= 6) gameDifficulty = 'hard'
    else gameDifficulty = 'extrahard'
    
    initializeLevel(level, gameDifficulty)
  }, [levelId, player, initializeLevel])

  // 타이머 업데이트 - 게임이 진행 중일 때만 시간 증가
  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        updateElapsedTime()
        setTimer(prev => prev + 1)
      }, 1000)

      return () => clearInterval(interval)
    }
    // 게임 완료 시 타이머 정지
  }, [gameState, updateElapsedTime])

  // 게임 완료 처리
  useEffect(() => {
    if (gameState === 'completed') {
      console.log('Game completed, saving score...')
      // 점수 저장을 약간 지연시켜 상태가 완전히 업데이트된 후 실행
      setTimeout(() => {
        saveScore()
      }, 500)
      
      // 폭죽 효과 5초 후 해제
      setTimeout(() => {
        setShowCompletionModal(true)
      }, 5000) // 폭죽 효과 후 모달 표시 (5초로 연장)
    }
  }, [gameState, saveScore])

  // 폭죽 효과 제어
  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        // 폭죽 효과만 해제 (gameStore의 showFireworks는 유지)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showFireworks])

  // 플레이어 이름 설정 후 레벨 초기화
  const handlePlayerNameSubmit = async (name: string) => {
    await loginPlayer(name)
    setShowNameModal(false)
    // 플레이어 설정 후 즉시 레벨 초기화
    const level = levelId === 'random' ? Math.floor(Math.random() * 10) + 1 : parseInt(levelId || '1')
    let gameDifficulty: Difficulty = 'easy'
    
    if (level <= 2) gameDifficulty = 'easy'
    else if (level <= 4) gameDifficulty = 'medium'
    else if (level <= 6) gameDifficulty = 'hard'
    else gameDifficulty = 'extrahard'
    
    initializeLevel(level, gameDifficulty)
  }

  // 시간 포맷팅 함수 - MM:SS 형식으로 표시
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // 난이도 표시 (4단계)
  const getDifficultyDisplay = (): string => {
    const difficultyMap = {
      easy: 'EASY',
      medium: 'MEDIUM', 
      hard: 'HARD',
      extrahard: 'EXTRA HARD'
    }
    return difficultyMap[difficulty]
  }

  // 난이도별 색상
  const getDifficultyColor = (): string => {
    const colorMap = {
      easy: 'text-green-600 dark:text-green-400',
      medium: 'text-yellow-600 dark:text-yellow-400', 
      hard: 'text-red-600 dark:text-red-400',
      extrahard: 'text-purple-600 dark:text-purple-400'
    }
    return colorMap[difficulty]
  }

  // 진행률 계산
  const getProgress = (): number => {
    const completedTubes = tubes.filter((_, index) => isTubeComplete(index) || isTubeEmpty(index)).length
    return tubes.length > 0 ? (completedTubes / tubes.length) * 100 : 0
  }

  // 다음 레벨로 이동
  const handleNextLevel = () => {
    const currentLevel = parseInt(levelId || '1')
    const nextLevel = currentLevel + 1
    setShowCompletionModal(false)
    navigate(`/play/${nextLevel}`)
  }

  // 홈으로 이동
  const handleGoHome = () => {
    setShowCompletionModal(false)
    navigate('/')
  }

  // 난이도별 그리드 클래스 결정
  const getGridClass = (): string => {
    return `game-grid ${difficulty}`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
          >
            Back
          </Link>
          
          <div className="text-center">
            <div className={`text-sm uppercase tracking-wider ${getDifficultyColor()}`}>
              {getDifficultyDisplay()}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Level {levelId || '1'}
            </h1>
            {player && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Playing as {player.name}
              </div>
            )}
          </div>
          
          <button 
            onClick={restartLevel}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
          >
            Restart
          </button>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Moves</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{moves.length}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Play Time</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{formatTime(timer)}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Tubes</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{tubes.length}</div>
            </div>
          </div>
          {gameState === 'completed' && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{currentScore}</div>
              </div>
            </div>
          )}
        </div>

        {/* Game Area */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-8">
          <div className="text-center">
            {/* Tubes Grid - 난이도별 동적 그리드 */}
            <div className={`${getGridClass()} mx-auto`}>
              {tubes.map((tube, tubeIndex) => (
                <Tube
                  key={tubeIndex}
                  colors={tube}
                  isSelected={selectedTube === tubeIndex}
                  onClick={() => selectTube(tubeIndex)}
                  canReceive={selectedTube !== null && selectedTube !== tubeIndex && canPour(selectedTube, tubeIndex)}
                  isComplete={isTubeComplete(tubeIndex)}
                  isPouring={pouringTube === tubeIndex}
                  isReceiving={receivingTube === tubeIndex}
                  isHintFrom={hintFromTube === tubeIndex}
                  isHintTo={hintToTube === tubeIndex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button 
            onClick={undoMove}
            disabled={moves.length === 0}
            className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Undo
          </button>
          
          <button 
            onClick={useHint}
            disabled={hintsRemaining === 0}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Hint ({hintsRemaining})
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(getProgress())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Potion Mixer © 2024 | Gpters Wizard & Co.
            </p>
          </div>
        </div>
      </div>

      {/* Player Name Modal */}
      <PlayerNameModal 
        isOpen={showNameModal}
        onSubmit={handlePlayerNameSubmit}
      />

      {/* Fireworks Effect */}
      <FireworksEffect isVisible={showFireworks} />

      {/* Game Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-4 shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Level Complete!</h2>
              <div className="space-y-2 mb-6">
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">{moves.length}</span> moves
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">{formatTime(timer)}</span> time
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-gray-900 dark:text-white">{currentScore}</span> points
                </div>
                <div className={`text-sm ${getDifficultyColor()}`}>
                  {getDifficultyDisplay()} difficulty
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleGoHome}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white"
                >
                  Home
                </button>
                <button 
                  onClick={handleNextLevel}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Next Level
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 