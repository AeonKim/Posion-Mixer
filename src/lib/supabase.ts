import { createClient } from '@supabase/supabase-js'

// Supabase 설정 - 환경 변수에서 URL과 키를 가져옴
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Supabase 클라이언트 생성 - 데이터베이스 연결을 위한 핵심 객체
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 데이터베이스 테이블 타입 정의
export interface Player {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Score {
  id: string
  player_id: string
  player_name: string
  level: number
  difficulty: 'easy' | 'medium' | 'hard' | 'extrahard'
  moves: number
  time: number
  score: number
  created_at: string
}

// 플레이어 관련 함수들
export const playerService = {
  // 플레이어 생성 또는 조회
  async getOrCreatePlayer(name: string): Promise<Player | null> {
    try {
      // 먼저 기존 플레이어 확인
      const { data: existingPlayer, error: findError } = await supabase
        .from('players')
        .select('*')
        .eq('name', name)
        .single()

      if (existingPlayer && !findError) {
        return existingPlayer
      }

      // 새 플레이어 생성
      const { data: newPlayer, error: createError } = await supabase
        .from('players')
        .insert([{ name }])
        .select()
        .single()

      if (createError) {
        console.error('Error creating player:', createError)
        return null
      }

      return newPlayer
    } catch (error) {
      console.error('Error in getOrCreatePlayer:', error)
      return null
    }
  },

  // 플레이어 목록 조회
  async getAllPlayers(): Promise<Player[]> {
    try {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching players:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllPlayers:', error)
      return []
    }
  }
}

// 점수 관련 함수들
export const scoreService = {
  // 점수 저장
  async saveScore(scoreData: Omit<Score, 'id' | 'created_at'>): Promise<Score | null> {
    try {
      const { data, error } = await supabase
        .from('scores')
        .insert([scoreData])
        .select()
        .single()

      if (error) {
        console.error('Error saving score:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in saveScore:', error)
      return null
    }
  },

  // 플레이어별 점수 조회
  async getPlayerScores(playerId: string): Promise<Score[]> {
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .eq('player_id', playerId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching player scores:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getPlayerScores:', error)
      return []
    }
  },

  // 리더보드 조회 (상위 점수)
  async getLeaderboard(limit: number = 10): Promise<Score[]> {
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching leaderboard:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getLeaderboard:', error)
      return []
    }
  },

  // 난이도별 리더보드 조회
  async getLeaderboardByDifficulty(difficulty: string, limit: number = 10): Promise<Score[]> {
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .eq('difficulty', difficulty)
        .order('score', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching difficulty leaderboard:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getLeaderboardByDifficulty:', error)
      return []
    }
  }
} 