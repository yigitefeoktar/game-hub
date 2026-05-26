import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATA ---
// Replace the gameUrls with your actual game links, and icons with your own artwork.
const FEATURED_GAME = {
  id: 'featured',
  title: 'War of Planets',
  subtitle: 'STRATEGY',
  tag: 'Live',
  description: 'Command one of four unique factions in a strategic battle for total galactic control!',
  coverUrl: '/assets/war-of-planets.png',
  iconUrl: '/icons/war-of-planets-ai.png',
  gameUrl: 'https://war-of-planets.vercel.app',
};

const ALL_GAMES = [
  { id: 'featured-grid', title: 'War of Planets', iconUrl: '/icons/war-of-planets-ai.png', gameUrl: 'https://war-of-planets.vercel.app', status: 'Live' },
  { id: 'react-chess', title: 'React Chess', iconUrl: '/icons/ai-test/react-chess-ai.png', gameUrl: 'https://react-chess-sage-two.vercel.app', status: 'Beta' },
  { id: '100-player-chess', title: '100 Player Chess', iconUrl: '/icons/ai-test-100-player/100-player-chess-option-1.png', gameUrl: 'https://100playerchess.com', status: 'Prototype' },
  { id: 'neon-drift', title: 'Neon Drift', iconUrl: '/icons/ai-test-neon-drift-ship/neon-drift-neon-3.png', gameUrl: 'https://neon-drift-deploy.vercel.app', status: 'Beta' },
  { id: 'gemini-clash-village', title: 'Gemini Clash', iconUrl: '/icons/ai-test-2/gemini-clash-village-ai-2.png', gameUrl: 'https://gemini-clash-village.vercel.app', status: 'Beta' },
  { id: 'compute-the-agi-race', title: 'Compute', iconUrl: '/icons/ai-test-compute-agi-race-text/compute-text-option-1.png', status: 'Coming Soon' },
  { id: 'machine-craft', title: 'Machine Craft', iconUrl: '/icons/machine-craft.png', status: 'Coming Soon' },
  { id: 'project-red-dot', title: 'Project Red Dot', iconUrl: '/icons/project-red-dot.png', status: 'Coming Soon' },
  { id: 'toy-box', title: 'Toy Box', iconUrl: '/icons/ai-test-toy-box-games/toy-box-games-option-6.png', gameUrl: 'https://toy-box-umber.vercel.app', status: 'Beta' },
  { id: 'ricochet-arena', title: 'Ricochet Arena', iconUrl: '/icons/ricochet-arena.png', gameUrl: 'https://ricochet-arena.vercel.app', status: 'Beta' },
];

const STATUS_ORDER: Record<string, number> = {
  Live: 0,
  Beta: 1,
  Prototype: 2,
  'Coming Soon': 3,
};

const SORTED_GAMES = [...ALL_GAMES].sort((a, b) => {
  const statusDifference = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);

  if (statusDifference !== 0) {
    return statusDifference;
  }

  return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
});

const AI_TOOLS_RECOMMENDATION = `The tools I started with, what I use now, and what I would recommend depending on your budget.

This is not a complete ranking of every AI tool. It is the path I would recommend based on what I actually used to build games and the Game Hub.

It is important to use the right tools in the right way. I think of it like hiring the right employee for the job. Some tools are better for starting quickly, some are better for serious projects, and some are better if you do not want to deal with technical things.

My recommendation is simple: start with Google AI Studio for free, move to Codex if you get more serious, and use Base44 only if you are not technical and have a higher budget.

The easiest way to start vibe coding today is to go to Google AI Studio and build a simple app there for free. That was how I started, and it is how I made most of my early games.

The Gemini model they have right now is not as capable as the best models from Anthropic and OpenAI, but Google AI Studio makes up for that in other ways. It is easy to use, it works in the browser, you can start working on one device and continue on another device, and the free limits are pretty good. It can even do more advanced things like setting up databases and auth. You could theoretically build complex multiplayer games with it too, although serious multiplayer still gets difficult quickly.

Tools like OpenAI Codex and Claude Code are different. They are more serious coding tools. They run on your computer, so they can control files, run commands, test your app, and connect to other software through things like MCP plugins or skills. You can think of those like extra tools the AI is allowed to use.

The reason these tools matter is that they are not just chatbots. They can work inside real projects, use tools, run commands, and sometimes support multiple AI agents working on the same codebase. I personally recommend the desktop apps instead of the CLI versions because they are much easier to use.

Why I use Codex

Out of Codex and Claude Code, I use Codex because, for my workflow, it is just better. It has an in-app browser that the AI can use and that I can also see. So if I am making a web app, I can preview it right there, and the AI can also test it.

I also like the Vercel plugin in Codex because you can just tell the AI to deploy the app, and it gives you a public URL you can share with people. That simplicity matters a lot.

One downside is that Codex can feel heavy on computers with less RAM, especially if you are running the app, a local dev server, browser preview, and multiple tools at the same time. So if your computer is weaker, Google AI Studio or a cloud/web-based tool may feel smoother.

Claude Code can do many similar things, and some people may prefer it. I still prefer Codex because its browser preview and Vercel workflow feel smoother for the kind of web apps and games I build.

At the time of writing, the serious individual plans are around 20 dollars a month, although Codex access can depend on your ChatGPT plan and region. I think it is worth it, especially because the same subscription also gives you access to the normal chat apps like ChatGPT or Claude AI.

Why AI agents matter

From my perspective, most people do not realize what they are missing until they seriously start using an AI agent in their daily lives. AI models like Claude Opus and GPT reasoning models are significantly smarter than the free versions, and when they are used inside tools like Claude Code and Codex, they can help with almost any work you do on a computer.

That is why I do not think AI agents are only for coding. They are closer to general computer-work assistants than simple code generators. Everyone pays for internet or cellular service, right? I think AI is slowly becoming something like that.

Google also has a desktop app called Antigravity, which is marketed as an IDE for the age of AI. I tried it, but I did not get that much value from it. You need to approve too many things the AI does, and after a while that gets annoying. Also, in my experience, Gemini models are still not as strong as the best models from OpenAI and Anthropic for serious coding work.

What about Base44 and Lovable?

There are also platforms like Base44 and Lovable. They combine smart AI models with the simple web app feeling of Google AI Studio. These can be really good if you are not technical and you want the easiest possible experience.

I think the best one is Base44, but to get real value out of it, you need to pay around 40 dollars a month. That is a lot if you are doing vibe coding as a hobby.

So my final recommendation is: use Google AI Studio to start for free, use Codex if you get more serious, and use Base44 if you are not technical and have a higher budget.

AI tools change quickly, so some features and prices may be different by the time you read this.`;

const ONE_PERSON_AI_COMPANY = `Our workflow for using AI agents like a small team.

We are effectively a one-person company powered by AI. Every line of code in anything we have deployed is vibe coded, including all the games and the Game Hub itself.

The point is not just that we use AI sometimes. The point is that the whole workflow is built around AI agents doing real work.

Separate AIs for separate jobs

In our larger games, we do not just use one AI chat for everything. We usually have a designer AI alongside the AI that actually writes the code.

This helps solve the context rot problem. The programmer AI has the code changes in its context window, and the designer AI has everything about the game mechanics in its context window. In this system, those two things do not get mixed up. This makes critical design decisions much easier.

The AI CEO

We also use an AI CEO to manage time and direction. Every week, we have a meeting to decide what to focus on next week. It gives me around three major tasks, and I decide when to do each of them during the week.

Having an AI CEO helps me get more done over the course of an entire month, not just one day. It also helps me think on a larger time scale about what kind of things I should build in the future.

The 10-80-10 rule

I am also switching to a more structured way of building games. I am using the 10-80-10 rule.

The idea is that I should do the first 10 percent of a project and the last 10 percent of the project. The middle 80 percent should be done mostly by AI.

In the first 10 percent, I sit down with the designer AI and write a GDD, or game design document. This is where the core idea, rules, mechanics, goals, and constraints are decided. After that, the coding AI can build the game step by step.

During the middle 80 percent, I can do other work while the AI builds. I might be planning another game, writing website content, testing previous projects, or just watching the build process and stepping in when needed. This is the real power of AI agents: they let one person run more than one stream of work at the same time.

Then, in the final 10 percent, I come back in heavily. I do extensive playtesting, look for what feels wrong, decide what needs to change, and push the game closer to something worth publishing.

Why this matters

This system can help us build games much faster, reducing development time from weeks to days, or maybe even hours for simple games.

It also changes what one person can realistically attempt. Instead of thinking like a solo developer who has to manually do every step, I can think more like a small studio: direction, design, coding, review, testing, and planning can all happen in parallel with AI agents.`;

const STORY_SECTION_HEADINGS = new Set([
  'Why I use Codex',
  'Why AI agents matter',
  'What about Base44 and Lovable?',
  'Separate AIs for separate jobs',
  'The AI CEO',
  'The 10-80-10 rule',
  'Why this matters',
]);

const STORY_CARDS = [
  {
    id: 's1',
    tag: 'VIBE CODING',
    title: 'What AI Tools I Recommend',
    description: AI_TOOLS_RECOMMENDATION,
    imageUrl: 'https://picsum.photos/seed/studio/800/1000',
  },
  {
    id: 's2',
    tag: 'WORKFLOW',
    title: 'How We Build Games',
    description: ONE_PERSON_AI_COMPANY,
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
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-0 md:pt-10 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <section className="relative -mx-4 w-[calc(100%+2rem)] aspect-[4/5] overflow-hidden rounded-none group cursor-pointer md:mx-0 md:w-full md:aspect-[21/9] md:rounded-[32px]" onClick={() => setActiveGame(FEATURED_GAME)}>
          {/* Background Image */}
          <img 
            src={FEATURED_GAME.coverUrl} 
            alt={FEATURED_GAME.title} 
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:from-black/80 md:via-black/20" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/90 via-black/40 to-transparent w-full md:w-3/4" />

          <div className="absolute left-1/2 top-4 md:top-5 z-10 -translate-x-1/2">
            <div className="rounded-full border border-white/10 bg-white/20 px-4 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-md md:px-5">
              Made by Yiğit Efe Oktar
            </div>
          </div>

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
          <GameGrid games={SORTED_GAMES} onPlay={(game) => setActiveGame(game)} />
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
                <div className="space-y-5 text-[15px] leading-7 text-white/80 md:text-base md:leading-8">
                  {renderStoryDescription(activeStory.description)}
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

function renderStoryDescription(description: string) {
  return description.split('\n\n').map((block, index) => {
    const text = block.trim();

    if (!text) {
      return null;
    }

    if (STORY_SECTION_HEADINGS.has(text)) {
      return (
        <div key={`${text}-${index}`} className="pt-7">
          <div className="mb-5 h-px w-full bg-white/10" />
          <h4 className="text-lg font-semibold tracking-tight text-white md:text-xl">
            {text}
          </h4>
        </div>
      );
    }

    return (
      <p
        key={`${text.slice(0, 24)}-${index}`}
        className={index === 0 ? 'text-base font-medium leading-7 text-white/90 md:text-lg md:leading-8' : undefined}
      >
        {text}
      </p>
    );
  });
}

function StoryGrid({ stories, onStoryClick }: { stories: any[], onStoryClick: (story: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {stories.map((story) => (
        <button 
          key={story.id}
          onClick={() => onStoryClick(story)}
          className="group relative w-full aspect-[4/5] object-cover overflow-hidden rounded-[32px] bg-[#111] text-left transition-shadow duration-300 shadow-xl hover:shadow-2xl active:scale-[0.99]"
        >
          {/* Background Image */}
          <img 
            src={story.imageUrl} 
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
          
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
          <div className="absolute inset-0 rounded-[32px] border border-white/10 transition-colors duration-300 group-hover:border-white/20 pointer-events-none" />
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

function getStatusClass(status: string) {
  switch (status) {
    case 'Live':
      return 'bg-emerald-400/12 text-emerald-200 border-emerald-300/20';
    case 'Beta':
      return 'bg-amber-400/12 text-amber-200 border-amber-300/20';
    case 'Prototype':
      return 'bg-sky-400/12 text-sky-200 border-sky-300/20';
    case 'Coming Soon':
      return 'bg-white/10 text-white/70 border-white/15';
    default:
      return 'bg-white/8 text-white/65 border-white/10';
  }
}

function GameGrid({ games, onPlay }: { games: any[], onPlay: (game: any) => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-7 md:gap-x-6 md:gap-y-9 pb-6">
      {games.map((game) => {
        const isComingSoon = game.status === 'Coming Soon';

        return (
        <button 
          key={game.id} 
          onClick={() => {
            if (!isComingSoon && game.gameUrl) {
              onPlay(game);
            }
          }}
          aria-disabled={isComingSoon}
          className={`flex flex-col items-center text-center group w-full ${isComingSoon ? 'cursor-default' : ''}`}
        >
          {/* Squircle App Icon equivalent */}
          <div className={`w-full aspect-square relative rounded-2xl md:rounded-3xl overflow-hidden mb-2 bg-[#222] shadow-lg transition-transform duration-300 ${isComingSoon ? '' : 'group-hover:scale-[1.03] active:scale-95'}`}>
            <img 
              src={game.iconUrl} 
              alt={game.title} 
              className={`w-full h-full object-cover ${isComingSoon ? 'opacity-75 saturate-[0.85]' : ''}`}
              loading="lazy"
            />
            {isComingSoon && (
              <div className="absolute inset-0 flex items-end justify-center bg-black/45 px-2 pb-3 backdrop-blur-[1px]">
                <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80 shadow-lg">
                  Soon
                </span>
              </div>
            )}
            {/* Subtle inner shadow for 3D effect on icon */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 pointer-events-none" />
          </div>
          <span className={`block w-full truncate font-medium text-[11px] leading-tight md:text-sm ${isComingSoon ? 'opacity-65' : 'opacity-90 group-hover:opacity-100'}`}>{game.title}</span>
          {game.status && (
            <span className={`mt-1 inline-flex max-w-full items-center justify-center rounded-full border px-2 py-0.5 text-[10px] md:text-[11px] font-semibold leading-tight ${getStatusClass(game.status)}`}>
              {game.status}
            </span>
          )}
        </button>
        );
      })}
    </div>
  );
}

