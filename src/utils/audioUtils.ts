// 오디오 유틸리티 - 게임 사운드 효과 관리 (mp3 전용)
class AudioManager {
  private pourSound: HTMLAudioElement | null = null
  private isEnabled: boolean = true

  constructor() {
    this.initializeAudio()
  }

  // 오디오 초기화 - mp3 파일만 사용
  private initializeAudio() {
    try {
      this.pourSound = new Audio('/sounds/pour-water.mp3')
      this.pourSound.volume = 0.3
      this.pourSound.preload = 'auto'
      console.log('MP3 audio initialized')
    } catch (error) {
      console.warn('Audio initialization failed:', error)
    }
  }

  // 물 붓는 소리 재생 - mp3만 재생
  playPourSound() {
    if (!this.isEnabled || !this.pourSound) return

    try {
      // 현재 재생 중인 소리 정지
      this.pourSound.currentTime = 0
      this.pourSound.play()
      console.log('MP3 sound played')
    } catch (error) {
      console.warn('Failed to play MP3 sound:', error)
    }
  }

  // 사운드 활성화/비활성화
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  // 볼륨 설정
  setVolume(volume: number) {
    if (this.pourSound) {
      this.pourSound.volume = Math.max(0, Math.min(1, volume))
    }
  }
}

// 전역 오디오 매니저 인스턴스
export const audioManager = new AudioManager()

// 편의 함수들
export const playPourSound = () => {
  audioManager.playPourSound()
}

export const enableSound = (enabled: boolean) => {
  audioManager.setEnabled(enabled)
}

export const setSoundVolume = (volume: number) => {
  audioManager.setVolume(volume)
} 