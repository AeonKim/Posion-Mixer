import { useEffect, useState } from 'react'

interface FireworksEffectProps {
  isVisible: boolean
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
  velocityX: number
  velocityY: number
}

// 폭죽 효과 컴포넌트 - 게임 완료 시 전체 화면 별 애니메이션
export default function FireworksEffect({ isVisible }: FireworksEffectProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    if (isVisible) {
      // 별들 생성 (개수 더 줄임 - 포인트 효과)
      const newStars: Star[] = []
      for (let i = 0; i < 6; i++) { // 12개에서 6개로 더 줄임
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 15, // 15-40px
          color: ['#FFD700', '#FF69B4', '#00FFFF', '#FF1493', '#00FF88', '#FF7F00', '#9D4EDD', '#50C878'][Math.floor(Math.random() * 8)],
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 3, // 3-5초
          velocityX: (Math.random() - 0.5) * 100, // -50 to 50
          velocityY: (Math.random() - 0.5) * 100  // -50 to 50
        })
      }
      setStars(newStars)
    } else {
      setStars([])
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black bg-opacity-30">
      {/* 별들 애니메이션 - 움직임 추가 */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-star-move"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: `${star.size}px`,
            color: star.color,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            textShadow: `0 0 20px ${star.color}, 0 0 40px ${star.color}`,
            filter: `drop-shadow(0 0 10px ${star.color})`,
            '--move-x': `${star.velocityX}px`,
            '--move-y': `${star.velocityY}px`
          } as React.CSSProperties}
        >
          ⭐
        </div>
      ))}
      
      {/* 추가 이모지 별들 */}
      {Array.from({ length: 3 }, (_, i) => ( // 6개에서 3개로 더 줄임
        <div
          key={`emoji-${i}`}
          className="absolute animate-sparkle-move"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 15 + 25}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 1 + 2}s`
          }}
        >
          {['✨', '🌟', '💫', '⭐', '🎆', '🎊'][Math.floor(Math.random() * 6)]}
        </div>
      ))}
      
      {/* 중앙 축하 메시지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <div className="text-8xl mb-4 animate-pulse">🎉</div>
          <div className="text-6xl font-bold text-white text-glow animate-float">
            PERFECT!
          </div>
          <div className="text-2xl text-yellow-300 mt-4 animate-pulse">
            Level Complete!
          </div>
        </div>
      </div>
      
      {/* 배경 파티클 효과 */}
      <div className="absolute inset-0">
        {Array.from({ length: 4 }, (_, i) => ( // 8개에서 4개로 더 줄임
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full animate-firework"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>
    </div>
  )
} 