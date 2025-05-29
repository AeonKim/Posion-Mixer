# 🌊 Water Sort Puzzle Game

A modern, responsive water sorting puzzle game built with React, TypeScript, and Tailwind CSS. Features 4 difficulty levels, real-time scoring, and cloud-based leaderboards.

## ✨ Features

### 🎮 Game Features
- **4 Difficulty Levels**: Easy (4 tubes), Medium (10 tubes), Hard (12 tubes), Extra Hard (14 tubes)
- **16 Vibrant Colors**: Extended color palette for challenging gameplay
- **Longer Tubes**: 6-segment tubes for more complex puzzles
- **Smooth Animations**: Pour and receive animations with visual feedback
- **Spectacular Completion Effects**: Full-screen star burst animations

### 🏆 Scoring & Progress
- **Real-time Scoring**: Dynamic score calculation based on moves, time, and hints
- **Cloud Database**: Supabase integration for persistent score storage
- **Player Authentication**: Simple name-based login system
- **Statistics Tracking**: Personal stats and progress monitoring

### 🎨 Design & UX
- **Modern Dark Theme**: Sleek, professional interface
- **Responsive Design**: Works perfectly on desktop and mobile
- **Glass Morphism Effects**: Beautiful translucent UI elements
- **Neon Glow Effects**: Eye-catching visual feedback
- **Floating Shadows**: 3D depth with tube shadows and spacing

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Zustand State Management**: Efficient and simple state handling
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vite**: Fast development and optimized builds
- **Supabase**: Real-time database and authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (optional, for cloud features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd water-sort-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials (optional)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🗄️ Supabase 데이터베이스 연결 가이드

### 1. Supabase 프로젝트 생성

1. **Supabase 계정 생성**
   - [supabase.com](https://supabase.com)에 접속
   - "Start your project" 클릭하여 계정 생성

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - 프로젝트 이름: `water-sort-game`
   - 데이터베이스 비밀번호 설정 (안전한 비밀번호 사용)
   - 지역 선택 (한국의 경우 Northeast Asia 권장)

### 2. 데이터베이스 스키마 설정

1. **SQL Editor 접속**
   - Supabase 대시보드에서 "SQL Editor" 메뉴 클릭

2. **스키마 실행**
   ```sql
   -- 프로젝트 루트의 supabase-schema.sql 파일 내용을 복사하여 실행
   ```
   - `supabase-schema.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭하여 실행

### 3. API 키 및 URL 확인

1. **프로젝트 설정 접속**
   - Supabase 대시보드에서 "Settings" > "API" 메뉴 클릭

2. **필요한 정보 복사**
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (긴 JWT 토큰)

### 4. 환경 변수 설정

1. **환경 변수 파일 생성**
   ```bash
   # 프로젝트 루트에 .env 파일 생성
   touch .env
   ```

2. **환경 변수 입력**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 5. 연결 테스트

1. **개발 서버 재시작**
   ```bash
   npm run dev
   ```

2. **기능 테스트**
   - 게임에서 이름 입력 후 플레이
   - 레벨 완료 시 점수가 Supabase에 저장되는지 확인
   - 브라우저 개발자 도구 콘솔에서 "Score saved to Supabase" 메시지 확인

### 6. 데이터 확인

1. **Table Editor 접속**
   - Supabase 대시보드에서 "Table Editor" 메뉴 클릭

2. **저장된 데이터 확인**
   - `players` 테이블: 플레이어 정보
   - `scores` 테이블: 게임 점수 기록

### 7. 문제 해결

**연결 실패 시:**
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- RLS (Row Level Security) 정책이 올바르게 설정되었는지 확인

**오프라인 모드:**
- Supabase 연결이 실패해도 게임은 정상 작동
- 점수는 localStorage에 백업 저장
- 연결 복구 시 수동으로 데이터 마이그레이션 가능

### 8. 고급 설정 (선택사항)

**실시간 리더보드:**
```sql
-- 실시간 구독을 위한 추가 설정
ALTER PUBLICATION supabase_realtime ADD TABLE scores;
```

**데이터 백업:**
- Supabase 대시보드에서 정기적으로 데이터 백업
- CSV 형태로 데이터 내보내기 가능

## 🎯 How to Play

1. **Login**: Enter your name to start playing
2. **Select Difficulty**: Choose from Easy, Medium, Hard, or Extra Hard
3. **Sort Colors**: Click tubes to pour water of the same color together
4. **Complete Levels**: Fill each tube with a single color or leave it empty
5. **Earn Points**: Get higher scores with fewer moves and faster completion

### 🎮 Game Rules
- You can only pour water if the top colors match
- You can only pour into tubes that aren't full
- Empty tubes can accept any color
- Complete a tube by filling it with 6 segments of the same color

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Tube.tsx        # Main game tube component
│   ├── FireworksEffect.tsx  # Completion animations
│   └── PlayerNameModal.tsx # Login modal
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Home page with stats
│   ├── Game.tsx        # Game playing interface
│   └── Settings.tsx    # Game settings
├── stores/             # State management
│   └── gameStore.ts    # Main game state (Zustand)
├── lib/                # External service integrations
│   └── supabase.ts     # Database client and services
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

## 🎨 Design System

### Color Palette
- **Water Colors**: 16 vibrant colors for game liquids
- **Dark Theme**: Professional dark background with accent colors
- **Neon Effects**: Glowing borders and shadows for interactivity

### Animations
- **Pour Animation**: Tubes move up when pouring
- **Receive Animation**: Tubes compress when receiving
- **Star Burst**: Full-screen celebration on completion
- **Floating Effects**: Subtle hover animations

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Zustand** - State management
- **Supabase** - Backend as a service
- **Framer Motion** - Animations (planned)

## 📱 Responsive Design

The game is fully responsive and works on:
- **Desktop**: Full feature experience
- **Tablet**: Optimized touch interface
- **Mobile**: Compact layout with touch-friendly controls

## 🎯 Difficulty Levels

| Level | Tubes | Colors | Complexity |
|-------|-------|--------|------------|
| Easy | 4 | 2 colors | Beginner-friendly |
| Medium | 10 | 8 colors | Moderate challenge |
| Hard | 12 | 10 colors | Advanced puzzles |
| Extra Hard | 14 | 12 colors | Expert level |

## 🏆 Scoring System

**Base Score**: 1000 (Easy), 1500 (Medium), 2000 (Hard), 3000 (Extra Hard)
- **Move Penalty**: -10 points per move
- **Time Penalty**: -2 points per second
- **Hint Bonus**: +50 points per unused hint

## 🔮 Future Features

- [ ] Daily challenges
- [ ] Achievement system
- [ ] Multiplayer mode
- [ ] Custom level editor
- [ ] Sound effects and music
- [ ] Progressive Web App (PWA)
- [ ] Social sharing
- [ ] Tournament mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic water sorting puzzle games
- Built with modern web technologies
- Designed for optimal user experience

---

**Difficulty**: Difficult  
**Learning Keywords**: React, TypeScript, Supabase, Game Development, State Management, Responsive Design, Animation, Database Integration 