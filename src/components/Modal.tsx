import { ReactNode, useEffect } from 'react'
import Button from './Button'

// Modal 컴포넌트 props 타입 정의
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  showCloseButton?: boolean
  className?: string
}

// 설정 및 확인 다이얼로그용 Modal 컴포넌트
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  className = ''
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // 배경 스크롤 방지
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div
        className={`relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-200 ${className}`}
      >
        {/* 헤더 */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="icon"
                onClick={onClose}
                className="ml-auto"
                aria-label="모달 닫기"
              >
                ✕
              </Button>
            )}
          </div>
        )}
        
        {/* 컨텐츠 */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
} 