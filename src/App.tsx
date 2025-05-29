import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import Settings from './pages/Settings'

// 메인 App 컴포넌트 - 애플리케이션의 루트 컴포넌트
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/play/:levelId" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App 