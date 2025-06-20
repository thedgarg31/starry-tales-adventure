
# 🦉 StoryScape - Magical Reading Adventures

A delightful reading platform designed for children aged 6-14, featuring interactive stories, progress tracking, and engaging rewards system.

## ✨ Features

- **📚 Interactive Story Library**: 25+ Indian children's stories with beautiful illustrations
- **🎧 Audio Narration**: Listen to stories with engaging voice narration
- **🌟 Progress Tracking**: Earn stars, maintain reading streaks, and unlock badges
- **🎨 Avatar Customization**: Create and customize reading avatars
- **🌙 Day/Night Themes**: Toggle between light and dark reading modes
- **📱 Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **🔐 Local Authentication**: Simple username/password system with persistent login
- **🎯 Reading Challenges**: Complete tasks to earn special rewards
- **📖 Interactive Word Learning**: Tap difficult words for definitions and pronunciation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open `http://localhost:8080` in your browser

## 🎮 How to Use

1. **Create Account**: Sign up with a username and password
2. **Choose Avatar**: Customize your reading character
3. **Browse Library**: Explore stories by category and difficulty
4. **Read & Listen**: Enjoy stories with audio narration
5. **Track Progress**: Collect stars and maintain reading streaks
6. **Earn Rewards**: Complete challenges to unlock badges

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: Local Storage
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📱 Responsive Design

StoryScape is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🎨 Design System

### Colors
- **Primary**: Warm sunset gradients (orange to pink)
- **Secondary**: Ocean blues and sky colors
- **Accent**: Playful purples and greens
- **Neutral**: Clean grays with high contrast

### Typography
- **Headers**: Comic Neue (playful, child-friendly)
- **Body**: Fredoka (rounded, easy to read)

### Animations
- Gentle bounces and hover effects
- Smooth page transitions
- Delightful micro-interactions

## 🗂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── MascotOwl.tsx   # Custom mascot component
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Auth.tsx        # Login/Register
│   ├── Library.tsx     # Story library
│   ├── Reader.tsx      # Story reader
│   ├── Progress.tsx    # Progress tracking
│   └── Profile.tsx     # User profile
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## 💾 Data Storage

All user data is stored locally using browser localStorage:
- User accounts and authentication
- Reading progress and statistics
- Story completion status
- User preferences and settings

## 🎵 Audio Assets

For full functionality, add audio files to the `public/audio/` directory:
- Story narration files (MP3 format)
- Sound effects for interactions
- Background music (optional)

## 🔮 Future Enhancements

- **🥽 VR Mode**: Virtual reality reading experiences
- **🤝 Multiplayer**: Read together with friends
- **🎪 AR Features**: Augmented reality story elements
- **🏆 Advanced Gamification**: More badges and challenges
- **📊 Parent Dashboard**: Detailed reading analytics
- **🌍 More Languages**: Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Beautiful placeholder images from Unsplash
- Icons from Lucide React
- UI components from shadcn/ui
- Inspiration from educational apps worldwide

---

**Built with ❤️ for young readers everywhere** 🌟

*StoryScape - Where every story becomes an adventure!* 🦉📚
