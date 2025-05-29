# 🧪 Potion Mixer - Magical Water Sort Puzzle

A beautiful and engaging water sort puzzle game built with React, TypeScript, and Tailwind CSS. Mix magical potions by sorting colors into separate flasks!

## ✨ Features

- 🎯 **4 Difficulty Levels**: Easy, Medium, Hard, Extra Hard
- 🎨 **Beautiful UI**: Modern design with smooth animations
- 🔊 **Sound Effects**: Immersive audio feedback
- 📱 **Responsive Design**: Works on desktop and mobile
- 💾 **Score Tracking**: Local storage for best scores
- 🎬 **Magical Login**: Video background modal experience
- 🎭 **Clean Design**: Simple, elegant interface

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd potion-mixer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add video background (Optional)**
   - Create or download a magical background video
   - Save as `public/potion-mixer-background.mp4`
   - Recommended specs: 1920x1080, 10-30 seconds, <5MB
   - Content: magical potions, stars, mystical backgrounds

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 How to Play

1. **Objective**: Sort all colored liquids so each flask contains only one color
2. **Rules**: 
   - Can only pour liquid onto the same color or into empty space
   - Cannot pour if the receiving flask is full
   - Use strategy to avoid getting stuck!
3. **Controls**: Click flasks to select and pour
4. **Scoring**: Fewer moves = higher score

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Backend**: Supabase (optional)
- **Deployment**: Vercel

## 📁 Project Structure

```
potion-mixer/
├── public/
│   ├── sounds/           # Game sound effects
│   └── potion-mixer-background.mp4  # Login video background
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main application pages
│   ├── stores/          # Zustand state management
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript definitions
│   └── lib/             # Library configurations
├── package.json
└── README.md
```

## 🎨 Game Levels

- **Easy**: 4 flasks, 3 colors, perfect for beginners
- **Medium**: 10 flasks, 6 colors, moderate challenge
- **Hard**: 12 flasks, 8 colors, serious puzzle solving
- **Extra Hard**: 14 flasks, 10+ colors, expert level

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run clean` - Clean and reinstall dependencies

## 🌟 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 Created by

**Gpters Wizard & Co.** - Crafting magical digital experiences

---

*Mix, Match & Master your potion mixing skills!* ✨ 