import { ButtonHTMLAttributes, ReactNode } from 'react'

// Button 컴포넌트의 variant 타입 정의
type ButtonVariant = 'primary' | 'secondary' | 'icon'

// Button 컴포넌트 props 타입 정의
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  isLoading?: boolean
}

// 재사용 가능한 Button 컴포넌트 - 다양한 스타일과 간단한 호버 효과 지원
export default function Button({ 
  variant = 'primary', 
  children, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  // variant에 따른 스타일 클래스 정의
  const baseClasses = 'game-button focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
  
  const variantClasses = {
    primary: 'game-button-primary hover:scale-105 active:scale-95',
    secondary: 'game-button-secondary hover:scale-105 active:scale-95',
    icon: 'p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:scale-105 active:scale-95'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          로딩중...
        </div>
      ) : (
        children
      )}
    </button>
  )
} 