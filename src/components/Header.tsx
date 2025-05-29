// 헤더 컴포넌트 props 타입 정의
interface HeaderProps {
  title?: string
  showBackButton?: boolean
  showSettingsButton?: boolean
  onBackClick?: () => void
  onSettingsClick?: () => void
}

// 게임 헤더 컴포넌트 - 로고, 뒤로가기, 설정 버튼 포함
export default function Header({
  title = 'Water Sort',
  showBackButton = false,
  showSettingsButton = true,
  onBackClick,
  onSettingsClick
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* 왼쪽: 뒤로가기 버튼 또는 로고 */}
        <div className="flex items-center">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
              aria-label="뒤로가기"
            >
              ←
            </button>
          ) : (
            <div className="text-2xl">🌊</div>
          )}
          <h1 className="text-xl font-bold text-gray-800 ml-2">
            {title}
          </h1>
        </div>

        {/* 오른쪽: 설정 버튼 */}
        {showSettingsButton && (
          <button
            onClick={onSettingsClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="설정"
          >
            ⚙️
          </button>
        )}
      </div>
    </header>
  )
} 