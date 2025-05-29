import { ReactNode } from 'react'

// Card 컴포넌트 props 타입 정의
interface CardProps {
  title?: string
  children: ReactNode
  className?: string
  onClick?: () => void
  isClickable?: boolean
}

// 통계 카드 및 일반 카드용 재사용 가능한 Card 컴포넌트
export default function Card({ 
  title, 
  children, 
  className = '', 
  onClick,
  isClickable = false 
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-all duration-200'
  const clickableClasses = isClickable ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]' : ''

  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
} 