import { useEffect } from 'react'
import { WaterColor } from '../stores/gameStore'
import { playPourSound } from '../utils/audioUtils'

interface TubeProps {
  colors: WaterColor[]
  isSelected: boolean
  onClick: () => void
  canReceive?: boolean
  isComplete?: boolean
  isPouring?: boolean
  isReceiving?: boolean
  isHintFrom?: boolean
  isHintTo?: boolean
}

// 색상을 CSS 클래스로 변환하는 함수 - 확장된 16색상 지원
const getColorClass = (color: WaterColor): string => {
  const colorMap: Record<WaterColor, string> = {
    red: 'bg-water-red',
    hotpink: 'bg-water-hotpink',
    blue: 'bg-water-blue',
    cyan: 'bg-water-cyan',
    green: 'bg-water-green',
    lime: 'bg-water-lime',
    yellow: 'bg-water-yellow',
    orange: 'bg-water-orange',
    purple: 'bg-water-purple',
    neonsky: 'bg-water-neonsky',
    neonpurple: 'bg-water-neonpurple',
    indigo: 'bg-water-indigo',
    pink: 'bg-water-pink',
    teal: 'bg-water-teal',
    amber: 'bg-water-amber',
    emerald: 'bg-water-emerald',
  }
  return colorMap[color]
}

// 튜브 컴포넌트 - 물 정렬 퍼즐의 핵심 UI 요소 (길이 6으로 확장, 물방울 효과 포함)
export default function Tube({ 
  colors, 
  isSelected, 
  onClick, 
  canReceive = false, 
  isComplete = false,
  isPouring = false,
  isReceiving = false,
  isHintFrom,
  isHintTo
}: TubeProps) {
  // 빈 슬롯을 채우기 위해 4개 슬롯 생성 (블럭 개수에 맞춤)
  const slots = Array(4).fill(null).map((_, index) => colors[index] || null)
  
  // 물 붓기 시 음향 효과 재생 - 목적지 튜브에서만 재생
  useEffect(() => {
    if (isReceiving) {
      try {
        playPourSound() // 새 튜브에 색상이 채워질 때만 재생
      } catch (error) {
        console.log('Audio playback failed:', error)
      }
    }
  }, [isReceiving])
  
  return (
    <div className="tube-container mb-8">
      <div 
        className={`tube-long ${isSelected ? 'selected' : ''} ${isPouring ? 'animate-pour' : ''} ${isReceiving ? 'animate-receive' : ''}`}
        onClick={onClick}
      >
        {/* 튜브 위쪽 뚜껑 제거 */}
        
        {/* 액체 레이어들 (아래부터 위로) */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse">
          {slots.map((color, index) => (
            <div
              key={index}
              className={`liquid-segment-long ${color ? getColorClass(color) : 'bg-transparent'} ${index === 0 ? 'rounded-b-lg' : ''}`}
              style={{
                opacity: color ? 1 : 0,
                transform: `translateY(${color ? 0 : '100%'})`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* 부을 때 물방울 효과 - SVG로 더 예쁘게 */}
        {isPouring && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <svg width="20" height="28" viewBox="0 0 20 28" className="animate-bounce">
              <path
                d="M10 0C10 0 3 6 3 14C3 19.5228 6.47715 24 10 24C13.5228 24 17 19.5228 17 14C17 6 10 0 10 0Z"
                fill="#4FC3F7"
                opacity="0.8"
              />
              <ellipse
                cx="7.5"
                cy="10"
                rx="2.5"
                ry="3.5"
                fill="rgba(255, 255, 255, 0.4)"
              />
            </svg>
          </div>
        )}
        
        {/* 선택 상태 표시 */}
        {isSelected && (
          <div className="absolute -inset-1 rounded-xl border-2 border-yellow-400 animate-pulse shadow-neon"></div>
        )}
        
        {/* 힌트 하이라이트 */}
        {isHintFrom && (
          <div className="absolute -inset-1 rounded-xl border-2 border-green-400 animate-pulse bg-green-400 bg-opacity-20">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-400 text-xs font-bold">
              FROM
            </div>
          </div>
        )}
        
        {isHintTo && (
          <div className="absolute -inset-1 rounded-xl border-2 border-blue-400 animate-pulse bg-blue-400 bg-opacity-20">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-400 text-xs font-bold">
              TO
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 