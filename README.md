# 🎓 Campus Connect — The Ultimate Campus Hub

A modern, full-featured campus event management platform built for hackathons. Features role-based views for Students, Admins, and Sponsors with a sleek dark UI and smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11.7-purple)

## ✨ Features

### 🎯 **Student View**
- **Hero Section** with gradient text and trending events carousel
- **Event Discovery** with search, category filters, and RSVP functionality
- **Gamification** with coin wallet and leaderboard system
- **QR Tickets** generated instantly after registration
- **Confetti animations** on successful event registration

### 💼 **Sponsor View**  
- **Tier-based Sponsorship** (Gold, Silver, Bronze) with real-time vacancy tracking
- **One-click Sponsorship** with digital signature modal
- **Progress Bars** showing sponsorship slot availability
- **Instant Deal Confirmation** with visual feedback

### 🛡️ **Admin Dashboard**
- **Budget Analytics** with interactive pie and bar charts (Recharts)
- **QR Ticket Scanner** with camera integration
- **"Simulate Scan Success"** fallback button for demos
- **Real-time Scan Log** with verification status
- **Stats Overview** with key metrics

## 🎨 UI/UX Highlights
- **Dark Theme** (`slate-950`) with `violet-500` accents
- **Glassmorphism** cards with `backdrop-blur-xl` effects
- **Framer Motion** animations throughout
- **Role Switcher** in navbar for instant demo transitions
- **Responsive Design** for all screen sizes

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/B-h-a-v-y-a-T/Campus_Connect.git
cd Campus_Connect

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page (Student view)
│   ├── sponsor/page.tsx   # Sponsorship hub
│   ├── admin/page.tsx     # Admin dashboard
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── components/
│   ├── layout/navbar.tsx  # Navigation with role switcher
│   └── ui/toast.tsx       # Toast notifications
├── context/
│   └── user-context.tsx   # Global role state
└── lib/
    ├── mock-data.ts       # Mock database layer
    └── utils.ts           # Utility functions
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **QR Generation**: react-qr-code
- **Effects**: canvas-confetti

## 🎭 Role-Based Views

### Student Features
- Browse and search events
- RSVP for events with instant feedback
- Earn coins for participation
- View leaderboard rankings
- Generate QR tickets

### Sponsor Features
- View sponsorship tiers and availability
- Digital signature for sponsorship agreements
- Real-time vacancy tracking
- Sponsorship analytics

### Admin Features
- Budget management with visual analytics
- QR ticket verification system
- Event attendance tracking
- Real-time dashboard metrics

## 🎨 Design Philosophy

Built with the "Speedrunner" hackathon strategy:
- **Zero Database** — Uses in-memory mock data for stability
- **Role Simulation** — Instant role switching without authentication
- **Visual Impact** — Prioritizes animations and modern UI
- **Demo-Ready** — Includes fallbacks for camera/network issues

## 🚢 Deployment

The app is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built for hackathons with ❤️ using modern web technologies.
