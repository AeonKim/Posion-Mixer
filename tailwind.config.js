/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 게임 액체 색상 팔레트 (확장된 16색상)
        water: {
          red: '#FF4757',        // 빨강
          hotpink: '#FF1493',    // 다홍 (hotpink)
          blue: '#3742FA',       // 파랑
          cyan: '#00D2FF',       // 청록
          green: '#00B894',      // 초록
          lime: '#00FF88',       // 라임
          yellow: '#FFD700',     // 노랑
          orange: '#FF7F00',     // 주황
          purple: '#8E44AD',     // 보라
          neonsky: '#00FFFF',    // 네온 하늘색
          neonpurple: '#6A0DAD', // 네온 보라색 (더 자주색으로 변경)
          indigo: '#6C5CE7',     // 인디고
          pink: '#FF69B4',       // 핑크
          teal: '#20B2AA',       // 틸
          amber: '#FFC107',      // 앰버
          emerald: '#50C878',    // 에메랄드
        },
        // 다크 테마 색상
        dark: {
          900: '#0F0F23',
          800: '#1A1A2E',
          700: '#16213E',
          600: '#2C3E50',
          500: '#34495E',
          400: '#5D6D7E',
          300: '#85929E',
          200: '#AEB6BF',
          100: '#D5DBDB',
        },
        // 액센트 색상
        accent: {
          primary: '#FF6B6B',
          secondary: '#4ECDC4',
          success: '#00B894',
          warning: '#FDCB6E',
          danger: '#E17055',
        },
        // 그라데이션 색상
        gradient: {
          from: '#667eea',
          via: '#764ba2',
          to: '#f093fb',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pour': 'pour 0.8s ease-out',
        'receive': 'receive 0.8s ease-out',
        'firework': 'firework 1s ease-out',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'star-burst': 'starBurst 2s ease-out infinite',
        'tube-hover': 'tubeHover 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 107, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pour: {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' },
          '100%': { transform: 'translateY(0px) scale(1)' },
        },
        receive: {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(8px) scale(0.95)' },
          '100%': { transform: 'translateY(0px) scale(1)' },
        },
        firework: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: 1 },
          '50%': { transform: 'scale(1.5) rotate(180deg)', opacity: 0.8 },
          '100%': { transform: 'scale(3) rotate(360deg)', opacity: 0 },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: 0.7 },
        },
        starBurst: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: 0 },
          '20%': { transform: 'scale(1.2) rotate(72deg)', opacity: 1 },
          '40%': { transform: 'scale(0.8) rotate(144deg)', opacity: 0.8 },
          '60%': { transform: 'scale(1.1) rotate(216deg)', opacity: 0.9 },
          '80%': { transform: 'scale(0.9) rotate(288deg)', opacity: 0.7 },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: 0 },
        },
        tubeHover: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-5px)' },
        }
      },
      boxShadow: {
        'neon': '0 0 20px rgba(255, 107, 107, 0.6)',
        'neon-blue': '0 0 20px rgba(78, 205, 196, 0.6)',
        'neon-green': '0 0 20px rgba(0, 184, 148, 0.6)',
        'neon-purple': '0 0 20px rgba(157, 78, 221, 0.6)',
        'neon-sky': '0 0 20px rgba(0, 255, 255, 0.6)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'tube-shadow': '0 10px 25px rgba(0, 0, 0, 0.3)',
        'tube-float': '0 15px 35px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}

