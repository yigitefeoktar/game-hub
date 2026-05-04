import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATA ---
// Replace the gameUrls with your actual game links, and icons with your own artwork.
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
  { id: 'react-chess', title: 'React Chess', iconUrl: '/icons/ai-test/react-chess-ai.png', gameUrl: 'https://react-chess-sage-two.vercel.app' },
  { id: '100-player-chess', title: '100 Player Chess', iconUrl: '/icons/ai-test-100-player/100-player-chess-option-1.png', gameUrl: 'https://100playerchess.com' },
  { id: 'neon-drift', title: 'Neon Drift', iconUrl: '/icons/ai-test-neon-drift-ship/neon-drift-neon-3.png', gameUrl: 'https://neon-drift-deploy.vercel.app' },
  { id: 'gemini-clash-village', title: 'Gemini Clash Village', iconUrl: '/icons/ai-test-2/gemini-clash-village-ai-2.png', gameUrl: 'https://gemini-clash-village.vercel.app' },
  { id: 'compute-the-agi-race', title: 'Compute: The AGI Race', iconUrl: '/icons/compute-the-agi-race.svg', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-1', title: 'Compute Option 1', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-1.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-2', title: 'Compute Option 2', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-2.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-3', title: 'Compute Option 3', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-3.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-4', title: 'Compute Option 4', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-4.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-5', title: 'Compute Option 5', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-5.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-6', title: 'Compute Option 6', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-6.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-7', title: 'Compute Option 7', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-7.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'compute-the-agi-race-option-8', title: 'Compute Option 8', iconUrl: '/icons/ai-test-compute-the-agi-race/compute-option-8.png', gameUrl: 'https://compute-the-agi-race.vercel.app' },
  { id: 'toy-box', title: 'Toy Box', iconUrl: '/icons/toy-box.svg', gameUrl: 'https://toy-box-umber.vercel.app' },
];

const STORY_CARDS = [
  {
    id: 's1',
    tag: 'THE STUDIO',
    title: 'Why We Build Games',
    description: 'We believe games should be instantly accessible. No downloads, no waiting. Just pure, unadulterated fun crafted with love and passion. Here is a look into our philosophy and why we started this journey.',
    imageUrl: 'https://picsum.photos/seed/studio/800/1000',
  },
  {
    id: 's2',
    tag: 'DEVELOPER DIARY',
    title: 'Designing War of Planets',
    description: 'Creating a balanced sci-fi strategy game meant balancing hundreds of variables across four unique factions. Dive into our design notebook to see how we brought this galaxy to life.',
    imageUrl: '/assets/war-of-planets-promo.png',
  },
  {
    id: 's3',
    tag: 'UPCOMING',
    title: 'The 2026 Roadmap',
    description: 'We are just getting started. Over the next few months, we will be rolling out three new puzzle games, a retro racing arcade, and maybe even a few surprises. Check out our timeline.',
    imageUrl: 'https://picsum.photos/seed/roadmap2/800/1000',
  }
];

export default function App() {
  const [activeGame, setActiveGame] = useState<{ id: string; gameUrl: string; title: string } | null>(null);
  const [activeStory, setActiveStory] = useState<{ id: string; title: string; description: string; imageUrl: string; tag: string } | null>(null);

  // Stop body scroll when a game or story is active
  React.useEffect(() => {
    if (activeGame || activeStory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeGame, activeStory]);

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
            
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-white font-semibold py-3 px-12 rounded-full transition-all duration-300">
              Play
            </button>

          </div>
        </section>

        {/* All Games Grid */}
        <section className="px-6 md:px-0 pb-12">
          <SectionHeader title="All Games" />
          <GameGrid games={ALL_GAMES} onPlay={(game) => setActiveGame(game)} />
        </section>

        {/* Stories / Editorial Section */}
        <section className="px-6 md:px-0 pb-24">
          <SectionHeader title="Behind the Games" />
          <StoryGrid stories={STORY_CARDS} onStoryClick={setActiveStory} />
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

      {/* Story Modal Overlay */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 outline-none"
          >
            {/* Overlay background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-2xl md:max-w-5xl bg-[#111] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[78vh]">
              <button 
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 p-3 rounded-full transition-all group flex items-center justify-center shadow-xl hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" strokeWidth={2.5} />
              </button>
              
              {/* Header Image */}
              <div className="relative w-full aspect-[16/9] md:aspect-auto md:w-[46%] md:h-full shrink-0">
                <img src={activeStory.imageUrl} alt={activeStory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#111]" />
              </div>
              
              {/* Story Text Content */}
              <div className="p-6 md:p-10 lg:p-12 overflow-y-auto md:flex-1">
                <span className="text-xs md:text-sm font-bold text-white/70 tracking-wider uppercase mb-3 block">
                  {activeStory.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {activeStory.title}
                </h3>
                <div className="text-base md:text-lg text-white/80 space-y-6 leading-relaxed whitespace-pre-wrap">
                  {activeStory.description}
                  
                  {/* Let's throw in a bit of generated lorem text here so it actually scrolls! */}
                  <div className="w-full h-px bg-white/10 my-8" />
                  <p>And so the journey began. We knew from the start that building a seamless experience meant putting the user at the very center of the universe. Every shade of gradient, every corner radius, and every pixel was chosen to tell a distinct story.</p>
                  <p>As the development cycles progressed, our vision crystallized. The countless iterations of testing lead to breakthroughs that refined our core gameplay loops.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StoryGrid({ stories, onStoryClick }: { stories: any[], onStoryClick: (story: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {stories.map((story) => (
        <button 
          key={story.id}
          onClick={() => onStoryClick(story)}
          className="group relative w-full aspect-[4/5] object-cover overflow-hidden rounded-[32px] bg-[#111] text-left transition-transform duration-300 hover:scale-[1.02] active:scale-95 shadow-xl"
        >
          {/* Background Image */}
          <img 
            src={story.imageUrl} 
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
            <span className="text-xs md:text-sm font-bold text-white/70 tracking-wider uppercase mb-3">
              {story.tag}
            </span>
            <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight line-clamp-2">
              {story.title}
            </h4>
            <p className="text-sm md:text-base text-white/80 line-clamp-3">
              {story.description}
            </p>
          </div>
          
          {/* Inner border for glass effect */}
          <div className="absolute inset-0 rounded-[32px] border border-white/10 pointer-events-none" />
        </button>
      ))}
    </div>
  );
}

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

