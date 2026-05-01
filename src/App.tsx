import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FEATURED_GAME = {
  id: 'featured',
  title: 'War of Planets',
  subtitle: 'STRATEGY',
  tag: 'Out Now',
  description: 'Command one of four unique factions in a strategic battle for total galactic control!',
  coverUrl: '/assets/war-of-planets.png',
  iconUrl: '/icons/app-icon.svg',
  gameUrl: 'https://war-of-planets.vercel.app',
};

const ALL_GAMES = [
  { id: 'featured-grid', title: 'War of Planets', iconUrl: '/icons/app-icon.svg', gameUrl: 'https://war-of-planets.vercel.app' },
  { id: 'react-chess', title: 'React Chess', iconUrl: '/icons/react-chess-premium.png', gameUrl: 'https://react-chess-sage-two.vercel.app' },
  { id: '100-player-chess', title: '100 Player Chess', iconUrl: '/icons/100-player-chess-premium.png', gameUrl: 'https://100playerchess.com' },
  { id: 'neon-drift', title: 'Neon Drift', iconUrl: '/icons/neon-drift-premium.png', gameUrl: 'https://neon-drift-deploy.vercel.app' },
  { id: 'gemini-clash-village', title: 'Gemini Clash Village', iconUrl: '/icons/gemini-clash-village.svg', gameUrl: 'https://gemini-clash-village.vercel.app' },
];

export default function App() {
  const [activeGame, setActiveGame] = useState<{ id: string; gameUrl: string; title: string } | null>(null);

  React.useEffect(() => {
    if (activeGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeGame]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30">
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-10 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <section className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-3xl md:rounded-[32px] overflow-hidden group cursor-pointer" onClick={() => setActiveGame(FEATURED_GAME)}>
          {/* Background Image */}
          <img 
            src={FEATURED_GAME.coverUrl} 
            alt={FEATURED_GAME.title} 
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:from-black/80 md:via-black/20" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/90 via-black/40 to-transparent w-full md:w-3/4" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 md:pb-16 text-center md:text-left items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <img src={FEATURED_GAME.iconUrl} alt="icon" className="w-6 h-6 rounded-md shadow-sm" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{FEATURED_GAME.subtitle}</span>
              <span className="text-xs font-semibold text-white/40">•</span>
              <span className="text-xs font-semibold text-white/60">{FEATURED_GAME.tag}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 max-w-full md:max-w-md lg:max-w-xl">{FEATURED_GAME.title}</h2>
            <p className="text-sm md:text-base text-white/70 mb-6 max-w-full md:max-w-sm lg:max-w-md">{FEATURED_GAME.description}</p>
            
            <button
              onClick={() => setActiveGame(FEATURED_GAME)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-white font-semibold py-3 px-12 rounded-full transition-all duration-300"
            >
              Play
            </button>

            {/* Pagination Dots (Visual only for now) */}
            <div className="flex gap-2 mt-8 opacity-40">
              <div className="w-2 h-2 rounded-full bg-white opacity-100"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
              <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
            </div>
          </div>
        </section>

        {/* All Games Grid */}
        <section className="px-6 md:px-0 pb-12">
          <SectionHeader title="All Games" />
          <GameGrid games={ALL_GAMES} onPlay={(game) => setActiveGame(game)} />
        </section>

      </main>

      {/* Fullscreen Game Overlay */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* The Floating X Button */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
              <button 
                onClick={() => setActiveGame(null)}
                className="bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 p-4 rounded-full transition-all group flex items-center justify-center shadow-xl hover:scale-105 active:scale-95"
                title="Close Game"
              >
                <X className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" strokeWidth={2.5} />
              </button>
            </div>

            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
              <a
                href={activeGame.gameUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 p-4 rounded-full transition-all group flex items-center justify-center shadow-xl hover:scale-105 active:scale-95"
                title="Open Game"
              >
                <ExternalLink className="w-6 h-6 text-white group-hover:text-cyan-300 transition-colors" strokeWidth={2.5} />
              </a>
            </div>
            
            {/* Game Iframe */}
            {/* Important: allow full capabilities to the web game inside the iframe */}
            <iframe 
              src={activeGame.gameUrl}
              className="w-full h-full border-none flex-1 bg-black"
              title={activeGame.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
              allow="autoplay; fullscreen; gyroscope; accelerometer; magnetometer; focus-without-user-activation"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 text-left">
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
        {title}
      </h3>
    </div>
  );
}

function GameGrid({ games, onPlay }: { games: any[], onPlay: (game: any) => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8 pb-6">
      {games.map((game) => (
        <button 
          key={game.id} 
          onClick={() => onPlay(game)}
          className="flex flex-col text-left group w-full"
        >
          {/* Squircle App Icon equivalent */}
          <div className="w-full aspect-square relative rounded-2xl md:rounded-3xl overflow-hidden mb-2 bg-[#222] shadow-lg transition-transform duration-300 group-hover:scale-[1.03] active:scale-95">
            <img 
              src={game.iconUrl} 
              alt={game.title} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle inner shadow for 3D effect on icon */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 pointer-events-none" />
          </div>
          <span className="font-medium text-xs md:text-sm line-clamp-2 opacity-90 group-hover:opacity-100 leading-tight">{game.title}</span>
        </button>
      ))}
    </div>
  );
}

