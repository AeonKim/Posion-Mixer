import { create } from 'zustand'
import { playerService, scoreService, Player as SupabasePlayer } from '../lib/supabase'

// 게임 상태 타입 정의 - 4단계 난이도 시스템으로 확장
export type WaterColor = 'red' | 'hotpink' | 'blue' | 'cyan' | 'green' | 'lime' | 'yellow' | 'orange' | 'purple' | 'neonsky' | 'neonpurple' | 'indigo' | 'pink' | 'teal' | 'amber' | 'emerald'
export type Tube = WaterColor[]
export type GameState = 'playing' | 'completed' | 'paused'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extrahard'

interface Move {
  from: number
  to: number
  timestamp: number
}

interface Player {
  name: string
  id: string
}

interface Score {
  player: Player
  level: number
  difficulty: Difficulty
  moves: number
  time: number
  score: number
  timestamp: number
}

interface GameStore {
  // 게임 상태
  tubes: Tube[]
  selectedTube: number | null
  moves: Move[]
  gameState: GameState
  level: number
  difficulty: Difficulty
  startTime: number
  elapsedTime: number
  hintsRemaining: number
  player: Player | null
  currentScore: number
  
  // 애니메이션 상태
  pouringTube: number | null
  receivingTube: number | null
  showFireworks: boolean
  
  // 힌트 상태
  hintFromTube: number | null
  hintToTube: number | null
  
  // 게임 액션
  setPlayer: (player: Player) => void
  loginPlayer: (name: string) => Promise<boolean>
  logoutPlayer: () => void
  selectTube: (index: number) => void
  pourWater: (fromIndex: number, toIndex: number) => void
  undoMove: () => void
  restartLevel: () => void
  initializeLevel: (level: number, difficulty: Difficulty) => void
  updateElapsedTime: () => void
  useHint: () => void
  calculateScore: () => number
  saveScore: () => Promise<void>
  
  // 게임 로직 헬퍼
  canPour: (fromIndex: number, toIndex: number) => boolean
  isLevelComplete: () => boolean
  getTubeTopColor: (tubeIndex: number) => WaterColor | null
  getTubeTopColorCount: (tubeIndex: number) => number
  isTubeComplete: (tubeIndex: number) => boolean
  isTubeEmpty: (tubeIndex: number) => boolean
  isTubeFull: (tubeIndex: number) => boolean
  findValidMove: () => { from: number, to: number } | null
}

export const useGameStore = create<GameStore>((set, get) => {
  // localStorage에서 플레이어 정보 복원
  const savedPlayer = localStorage.getItem('currentPlayer')
  let initialPlayer = null
  if (savedPlayer) {
    try {
      initialPlayer = JSON.parse(savedPlayer)
    } catch (error) {
      console.error('Failed to parse saved player:', error)
    }
  }

  return {
    // 초기 상태
    tubes: [],
    selectedTube: null,
    moves: [],
    gameState: 'playing',
    level: 1,
    difficulty: 'easy',
    startTime: Date.now(),
    elapsedTime: 0,
    hintsRemaining: 3,
    player: initialPlayer,
    currentScore: 0,
    
    // 애니메이션 상태
    pouringTube: null,
    receivingTube: null,
    showFireworks: false,
    
    // 힌트 상태
    hintFromTube: null,
    hintToTube: null,

    // 플레이어 설정
    setPlayer: (player: Player) => {
      set({ player })
      // localStorage에도 저장
      localStorage.setItem('currentPlayer', JSON.stringify(player))
    },

    // 플레이어 로그인 (Supabase 연동)
    loginPlayer: async (name: string) => {
      try {
        const supabasePlayer = await playerService.getOrCreatePlayer(name)
        if (supabasePlayer) {
          const player: Player = {
            name: supabasePlayer.name,
            id: supabasePlayer.id
          }
          get().setPlayer(player)
          return true
        } else {
          // Supabase 실패 시 오프라인 모드로 플레이어 생성
          const offlinePlayer: Player = {
            name: name,
            id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          }
          get().setPlayer(offlinePlayer)
          console.log('Created offline player:', offlinePlayer)
          return true
        }
      } catch (error) {
        console.error('Login failed, creating offline player:', error)
        // 오류 시에도 오프라인 모드로 플레이어 생성
        const offlinePlayer: Player = {
          name: name,
          id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }
        get().setPlayer(offlinePlayer)
        return true
      }
    },

    // 플레이어 로그아웃
    logoutPlayer: () => {
      set({ player: null })
      localStorage.removeItem('currentPlayer')
    },

    // 튜브 선택
    selectTube: (index: number) => {
      const { selectedTube, pourWater } = get()
      
      if (selectedTube === null) {
        // 첫 번째 튜브 선택
        set({ selectedTube: index })
      } else if (selectedTube === index) {
        // 같은 튜브 클릭 시 선택 해제
        set({ selectedTube: null })
      } else {
        // 두 번째 튜브 선택 시 물 붓기 시도
        pourWater(selectedTube, index)
        set({ selectedTube: null })
      }
    },

    // 물 붓기
    pourWater: (fromIndex: number, toIndex: number) => {
      const { tubes, canPour, moves, getTubeTopColor, getTubeTopColorCount } = get()
      
      if (!canPour(fromIndex, toIndex)) return

      // 애니메이션 상태 설정
      set({ pouringTube: fromIndex, receivingTube: toIndex })

      // 애니메이션 후 실제 물 이동
      setTimeout(() => {
        const newTubes = [...tubes]
        const fromTube = [...newTubes[fromIndex]]
        const toTube = [...newTubes[toIndex]]
        
        const topColor = getTubeTopColor(fromIndex)
        const colorCount = getTubeTopColorCount(fromIndex)
        const spaceInToTube = 6 - toTube.length // 튜브 길이를 6으로 증가
        const amountToPour = Math.min(colorCount, spaceInToTube)
        
        // 물 이동
        for (let i = 0; i < amountToPour; i++) {
          const color = fromTube.pop()
          if (color) toTube.push(color)
        }
        
        newTubes[fromIndex] = fromTube
        newTubes[toIndex] = toTube
        
        const newMove: Move = {
          from: fromIndex,
          to: toIndex,
          timestamp: Date.now()
        }
        
        // 새로운 튜브 상태로 완료 여부 확인
        const { isTubeComplete, isTubeEmpty } = get()
        const isComplete = newTubes.every((tube, index) => {
          // 튜브가 완성되었는지 확인 (6개 모두 같은 색)
          const isCompleted = tube.length === 6 && tube.every(color => color === tube[0])
          // 튜브가 비어있는지 확인
          const isEmpty = tube.length === 0
          return isCompleted || isEmpty
        })
        
        console.log('Level completion check:', {
          tubes: newTubes.length,
          completedTubes: newTubes.filter(tube => tube.length === 6 && tube.every(color => color === tube[0])).length,
          emptyTubes: newTubes.filter(tube => tube.length === 0).length,
          isComplete
        })
        
        set({ 
          tubes: newTubes, 
          moves: [...moves, newMove],
          gameState: isComplete ? 'completed' : 'playing',
          pouringTube: null,
          receivingTube: null,
          showFireworks: isComplete,
          currentScore: 0 // 일단 0으로 설정
        })

        // 게임 완료 시 점수 계산 및 업데이트
        if (isComplete) {
          const finalScore = get().calculateScore()
          set({ currentScore: finalScore })
          console.log('Game completed! Final score:', finalScore)
        }
      }, 400)
    },

    // 이동 되돌리기
    undoMove: () => {
      const { moves, tubes } = get()
      if (moves.length === 0) return

      const lastMove = moves[moves.length - 1]
      const newTubes = [...tubes]
      const fromTube = [...newTubes[lastMove.from]]
      const toTube = [...newTubes[lastMove.to]]
      
      // 마지막 이동을 되돌림
      const topColor = get().getTubeTopColor(lastMove.to)
      const colorCount = get().getTubeTopColorCount(lastMove.to)
      
      for (let i = 0; i < colorCount; i++) {
        const color = toTube.pop()
        if (color) fromTube.push(color)
      }
      
      newTubes[lastMove.from] = fromTube
      newTubes[lastMove.to] = toTube
      
      set({ 
        tubes: newTubes, 
        moves: moves.slice(0, -1),
        gameState: 'playing'
      })
    },

    // 레벨 재시작
    restartLevel: () => {
      const { level, difficulty } = get()
      set({ 
        selectedTube: null,
        moves: [],
        gameState: 'playing',
        startTime: Date.now(),
        elapsedTime: 0,
        hintsRemaining: 3,
        currentScore: 0,
        showFireworks: false,
        hintFromTube: null,
        hintToTube: null
      })
      // 레벨 데이터 다시 로드
      get().initializeLevel(level, difficulty)
    },

    // 레벨 초기화
    initializeLevel: (level: number, difficulty: Difficulty) => {
      const levelData = generateLevel(level, difficulty)
      set({ 
        tubes: levelData,
        level,
        difficulty,
        selectedTube: null,
        moves: [],
        gameState: 'playing',
        startTime: Date.now(),
        elapsedTime: 0,
        hintsRemaining: 3,
        currentScore: 0,
        showFireworks: false,
        hintFromTube: null,
        hintToTube: null
      })
    },

    // 경과 시간 업데이트
    updateElapsedTime: () => {
      const { startTime } = get()
      set({ elapsedTime: Date.now() - startTime })
    },

    // 힌트 사용
    useHint: () => {
      const { hintsRemaining, findValidMove } = get()
      if (hintsRemaining > 0) {
        const validMove = findValidMove()
        if (validMove) {
          set({ 
            hintsRemaining: hintsRemaining - 1,
            hintFromTube: validMove.from,
            hintToTube: validMove.to
          })
          
          // 3초 후 힌트 하이라이트 제거
          setTimeout(() => {
            set({ hintFromTube: null, hintToTube: null })
          }, 3000)
        }
      }
    },

    // 점수 계산
    calculateScore: () => {
      const { moves, elapsedTime, difficulty, hintsRemaining } = get()
      const timeInSeconds = Math.floor(elapsedTime / 1000)
      
      // 기본 점수 (난이도별)
      let baseScore = 1000
      if (difficulty === 'medium') baseScore = 1500
      if (difficulty === 'hard') baseScore = 2000
      if (difficulty === 'extrahard') baseScore = 3000
      
      // 이동 횟수 페널티 (적을수록 좋음)
      const movePenalty = moves.length * 10
      
      // 시간 페널티 (빠를수록 좋음)
      const timePenalty = timeInSeconds * 2
      
      // 힌트 보너스 (사용하지 않을수록 좋음)
      const hintBonus = hintsRemaining * 50
      
      const finalScore = Math.max(0, baseScore - movePenalty - timePenalty + hintBonus)
      return Math.round(finalScore)
    },

    // 점수 저장 (Supabase 연동)
    saveScore: async () => {
      const { player, level, difficulty, moves, elapsedTime, currentScore } = get()
      if (!player) return

      try {
        // Supabase에 저장
        const scoreData = {
          player_id: player.id,
          player_name: player.name,
          level,
          difficulty,
          moves: moves.length,
          time: Math.floor(elapsedTime / 1000),
          score: currentScore
        }

        const savedScore = await scoreService.saveScore(scoreData)
        if (savedScore) {
          console.log('Score saved to Supabase:', savedScore)
        } else {
          // Supabase 실패 시 localStorage에 백업 저장
          const localScoreData: Score = {
            player,
            level,
            difficulty,
            moves: moves.length,
            time: Math.floor(elapsedTime / 1000),
            score: currentScore,
            timestamp: Date.now()
          }
          
          const savedScores = JSON.parse(localStorage.getItem('waterSortScores') || '[]')
          savedScores.push(localScoreData)
          localStorage.setItem('waterSortScores', JSON.stringify(savedScores))
          console.log('Score saved to localStorage as backup')
        }
      } catch (error) {
        console.error('Error saving score:', error)
        
        // 오류 시 localStorage에 백업 저장
        const localScoreData: Score = {
          player,
          level,
          difficulty,
          moves: moves.length,
          time: Math.floor(elapsedTime / 1000),
          score: currentScore,
          timestamp: Date.now()
        }
        
        const savedScores = JSON.parse(localStorage.getItem('waterSortScores') || '[]')
        savedScores.push(localScoreData)
        localStorage.setItem('waterSortScores', JSON.stringify(savedScores))
        console.log('Score saved to localStorage due to error')
      }
    },

    // 물 붓기 가능 여부 확인
    canPour: (fromIndex: number, toIndex: number) => {
      const { tubes, isTubeEmpty, isTubeFull, getTubeTopColor } = get()
      
      if (fromIndex === toIndex) return false
      if (isTubeEmpty(fromIndex)) return false
      if (isTubeFull(toIndex)) return false
      
      const fromTopColor = getTubeTopColor(fromIndex)
      const toTopColor = getTubeTopColor(toIndex)
      
      // 빈 튜브에는 어떤 색이든 부을 수 있음
      if (toTopColor === null) return true
      
      // 같은 색만 부을 수 있음
      return fromTopColor === toTopColor
    },

    // 레벨 완료 확인
    isLevelComplete: () => {
      const { tubes, isTubeComplete, isTubeEmpty } = get()
      const isComplete = tubes.every((tube, index) => isTubeComplete(index) || isTubeEmpty(index))
      console.log('Level completion check:', {
        tubes: tubes.length,
        completedTubes: tubes.filter((_, index) => isTubeComplete(index)).length,
        emptyTubes: tubes.filter((_, index) => isTubeEmpty(index)).length,
        isComplete
      })
      return isComplete
    },

    // 튜브 상단 색상 가져오기
    getTubeTopColor: (tubeIndex: number) => {
      const { tubes } = get()
      const tube = tubes[tubeIndex]
      return tube.length > 0 ? tube[tube.length - 1] : null
    },

    // 튜브 상단 같은 색상 개수 가져오기
    getTubeTopColorCount: (tubeIndex: number) => {
      const { tubes, getTubeTopColor } = get()
      const tube = tubes[tubeIndex]
      const topColor = getTubeTopColor(tubeIndex)
      
      if (!topColor) return 0
      
      let count = 0
      for (let i = tube.length - 1; i >= 0; i--) {
        if (tube[i] === topColor) {
          count++
        } else {
          break
        }
      }
      return count
    },

    // 튜브 완성 확인 - 6개 길이로 변경
    isTubeComplete: (tubeIndex: number) => {
      const { tubes } = get()
      const tube = tubes[tubeIndex]
      
      if (tube.length !== 6) return false
      
      const firstColor = tube[0]
      return tube.every(color => color === firstColor)
    },

    // 튜브 비어있음 확인
    isTubeEmpty: (tubeIndex: number) => {
      const { tubes } = get()
      return tubes[tubeIndex].length === 0
    },

    // 튜브 가득참 확인 - 6개 길이로 변경
    isTubeFull: (tubeIndex: number) => {
      const { tubes } = get()
      return tubes[tubeIndex].length === 6
    },

    // 유효한 이동 찾기
    findValidMove: () => {
      const { tubes, canPour } = get()
      for (let from = 0; from < tubes.length; from++) {
        for (let to = 0; to < tubes.length; to++) {
          if (from !== to && canPour(from, to)) {
            return { from, to }
          }
        }
      }
      return null
    }
  }
})

// 레벨 생성 함수 - 새로운 4단계 시스템
export const generateLevel = (level: number, difficulty: Difficulty): Tube[] => {
  // 난이도별 색상 및 튜브 설정
  const levelConfig: Record<Difficulty, { colors: WaterColor[], tubeCount: number }> = {
    easy: { 
      colors: ['lime', 'purple'], 
      tubeCount: 4 
    },
    medium: { 
      colors: ['red', 'blue', 'green', 'yellow', 'hotpink', 'orange', 'purple', 'cyan', 'lime', 'neonsky'], 
      tubeCount: 10 
    },
    hard: { 
      colors: ['red', 'blue', 'green', 'yellow', 'hotpink', 'orange', 'purple', 'cyan', 'lime', 'neonsky', 'neonpurple', 'indigo'], 
      tubeCount: 12 
    },
    extrahard: { 
      colors: ['red', 'blue', 'green', 'yellow', 'hotpink', 'orange', 'purple', 'cyan', 'lime', 'neonsky', 'neonpurple', 'indigo', 'pink', 'teal'], 
      tubeCount: 14 
    }
  }

  const config = levelConfig[difficulty]
  const colors = config.colors.slice(0, config.tubeCount - 2) // 빈 튜브 2개 제외
  
  // 각 색상을 6개씩 생성 (튜브 길이 증가)
  const allWaters: WaterColor[] = []
  colors.forEach(color => {
    for (let i = 0; i < 6; i++) {
      allWaters.push(color)
    }
  })
  
  // 셔플
  for (let i = allWaters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allWaters[i], allWaters[j]] = [allWaters[j], allWaters[i]]
  }
  
  // 튜브에 분배 (각 튜브에 6개씩)
  const tubes: Tube[] = []
  for (let i = 0; i < colors.length; i++) {
    tubes.push(allWaters.slice(i * 6, (i + 1) * 6))
  }
  
  // 빈 튜브 2개 추가
  tubes.push([])
  tubes.push([])
  
  return tubes
} 