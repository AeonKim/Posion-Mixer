// 게임 색상 타입 정의
export type WaterColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'cyan'

// 튜브 타입 정의 - 색상 배열로 구성
export type Tube = WaterColor[]

// 난이도 타입 정의
export type Difficulty = 'easy' | 'normal' | 'hard'

// 레벨 타입 정의
export interface Level {
  id: number
  tubes: Tube[]
  difficulty: Difficulty
  targetTubes?: Tube[] // 목표 상태 (선택적)
}

// 게임 상태 타입 정의
export interface GameState {
  tubes: Tube[]
  history: Tube[][] // 이동 히스토리
  moves: number
  startTime: number
  isComplete: boolean
  selectedTube: number | null
}

// 점수 타입 정의
export interface Score {
  levelId: number
  moves: number
  seconds: number
  timestamp: number
  score: number // moves × log(seconds) 계산값
}

// 플레이어 타입 정의
export interface Player {
  id: string
  name: string
  totalScore: number
  levelsCompleted: number
  bestTimes: Record<number, number> // levelId -> best time
}

// 게임 설정 타입 정의
export interface GameSettings {
  soundEnabled: boolean
  colorBlindMode: boolean
  language: 'ko' | 'en'
  difficulty: Difficulty
}

// 이동 타입 정의
export interface Move {
  from: number
  to: number
  timestamp: number
}

// 리더보드 엔트리 타입 정의
export interface LeaderboardEntry {
  playerId: string
  playerName: string
  levelId: number
  score: number
  moves: number
  seconds: number
  timestamp: number
} 