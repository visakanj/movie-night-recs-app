import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Star, Play } from 'lucide-react';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
// --- Types ---
interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string;
  duration: string;
  rating: string;
  description: string;
  year: string;
  streamingService?: string;
  pickedBy?: string;
}
// --- Mock Data ---
const MOVIES: Movie[] = [{
  id: '1',
  title: 'Dune: Part Two',
  poster: 'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
  genre: 'Sci-Fi',
  duration: '2h 46m',
  rating: '8.8',
  description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
  year: '2024',
  streamingService: 'HBO Max',
  pickedBy: 'Sarah'
}, {
  id: '2',
  title: 'Poor Things',
  poster: 'https://image.tmdb.org/t/p/original/kCGlIMZRfwROtH6CNq7zELSTn9m.jpg',
  genre: 'Comedy',
  duration: '2h 21m',
  rating: '8.1',
  description: 'The incredible tale and fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
  year: '2023',
  streamingService: 'Hulu',
  pickedBy: 'Mike'
}, {
  id: '3',
  title: 'Oppenheimer',
  poster: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  genre: 'Drama',
  duration: '3h 00m',
  rating: '8.6',
  description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
  year: '2023',
  streamingService: 'Peacock',
  pickedBy: 'Alex'
}, {
  id: '4',
  title: 'The Zone of Interest',
  poster: 'https://image.tmdb.org/t/p/original/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg',
  genre: 'History',
  duration: '1h 45m',
  rating: '7.9',
  description: 'The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig, strive to build a dream life for their family in a house and garden next to the camp.',
  year: '2023',
  streamingService: 'HBO Max',
  pickedBy: 'Jessica'
}, {
  id: '5',
  title: 'Past Lives',
  poster: 'https://image.tmdb.org/t/p/original/k3waqVXSnvCZWfJYNkX98Jvk0W.jpg',
  genre: 'Romance',
  duration: '1h 46m',
  rating: '7.9',
  description: 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after her family emigrates from South Korea.',
  year: '2023',
  streamingService: 'Paramount+',
  pickedBy: 'David'
}, {
  id: '6',
  title: 'Anatomy of a Fall',
  poster: 'https://image.tmdb.org/t/p/original/kQs6keheMwCxHtEHQfS2h2yD3q.jpg',
  genre: 'Thriller',
  duration: '2h 31m',
  rating: '7.8',
  description: "A woman is suspected of her husband's murder, and their blind son faces a moral dilemma as the sole witness.",
  year: '2023',
  streamingService: 'Hulu',
  pickedBy: 'Emma'
}];
// Duplicate movies to create a long strip for scrolling
const SLOT_ITEMS = [...MOVIES, ...MOVIES, ...MOVIES, ...MOVIES, ...MOVIES, ...MOVIES];
// --- Confetti Component ---
const ConfettiParticle = ({
  delay
}: {
  delay: number;
}) => {
  const randomX = Math.random() * 100 - 50; // -50 to 50
  const randomY = Math.random() * -100 - 50; // -50 to -150 (upwards)
  const randomRotate = Math.random() * 360;
  const colors = ['#FFD700', '#FF4500', '#4169E1', '#32CD32', '#FF69B4'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return <motion.div initial={{
    x: 0,
    y: 0,
    opacity: 1,
    scale: 0
  }} animate={{
    x: randomX * 5,
    y: randomY * 5,
    opacity: 0,
    scale: [0, 1, 0.5],
    rotate: randomRotate + 720
  }} transition={{
    duration: 2.5,
    ease: 'easeOut',
    delay
  }} className="absolute w-3 h-3 rounded-full pointer-events-none z-50" style={{
    backgroundColor: color
  }} />;
};
const ConfettiExplosion = () => {
  return <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-50">
      {Array.from({
      length: 40
    }).map((_, i) => <ConfettiParticle key={i} delay={Math.random() * 0.2} />)}
    </div>;
};
export function TonightScreen() {
  // --- State ---
  const [tonightMovie, setTonightMovie] = useState<Movie | null>(null);
  // Pick Animation State
  const [state, setState] = useState<'idle' | 'holding' | 'spinning' | 'revealing' | 'finished'>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const [winningIndex, setWinningIndex] = useState(0);
  const [isMarkingWatched, setIsMarkingWatched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const holdInterval = useRef<NodeJS.Timeout | null>(null);
  // Constants
  const ITEM_WIDTH = 220;
  const ITEM_HEIGHT = 330;
  const ITEM_GAP = 24;
  const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_GAP;
  // Initialize winning index
  useEffect(() => {
    const middleStart = Math.floor(SLOT_ITEMS.length / 2);
    const randomOffset = Math.floor(Math.random() * MOVIES.length);
    setWinningIndex(middleStart + randomOffset);
    // Check local storage for existing tonight pick
    const savedPick = localStorage.getItem('tonightMovie');
    if (savedPick) {
      setTonightMovie(JSON.parse(savedPick));
    }
  }, []);
  // --- Handlers ---
  const startHold = () => {
    if (state !== 'idle') return;
    setState('holding');
    let progress = 0;
    const duration = 3000; // 3 seconds
    const interval = 16; // ~60fps
    const step = 100 / (duration / interval);
    holdInterval.current = setInterval(() => {
      progress += step;
      if (progress >= 100) {
        setHoldProgress(100);
        triggerSpin();
        if (holdInterval.current) clearInterval(holdInterval.current);
      } else {
        setHoldProgress(progress);
      }
    }, interval);
  };
  const cancelHold = () => {
    if (state === 'holding') {
      if (holdInterval.current) clearInterval(holdInterval.current);
      setState('idle');
      setHoldProgress(0);
    }
  };
  const triggerSpin = async () => {
    setState('spinning');
    // Calculate target X to center the winning item
    // The winning item's left edge is at: winningIndex * TOTAL_ITEM_WIDTH
    // We want its center (left edge + ITEM_WIDTH/2) to align with container center
    // Initial offset: the strip starts with pl-[50vw] which puts first item's center at screen center
    // So we need to move left by: (winningIndex * TOTAL_ITEM_WIDTH)
    const targetX = -(winningIndex * TOTAL_ITEM_WIDTH);
    await controls.start({
      x: targetX,
      transition: {
        duration: 4,
        ease: [0.1, 0.8, 0.2, 1],
        type: 'tween'
      }
    });
    setState('revealing');
    // After reveal animation, set the picked movie
    setTimeout(() => {
      const winner = SLOT_ITEMS[winningIndex];
      setTonightMovie(winner);
      localStorage.setItem('tonightMovie', JSON.stringify(winner));
      setState('finished');
    }, 2500);
  };
  const handleMarkAsWatched = () => {
    setIsMarkingWatched(true);
    // Simulate API call / transition
    setTimeout(() => {
      if (tonightMovie) {
        // Add to watched history in localStorage
        const history = JSON.parse(localStorage.getItem('watchedHistory') || '[]');
        const newHistory = [tonightMovie, ...history];
        localStorage.setItem('watchedHistory', JSON.stringify(newHistory));
        // Clear current pick
        localStorage.removeItem('tonightMovie');
        setTonightMovie(null);
        // Reset animation state
        setState('idle');
        setHoldProgress(0);
        setIsMarkingWatched(false);
        // Pick new random winner for next time
        const middleStart = Math.floor(SLOT_ITEMS.length / 2);
        const randomOffset = Math.floor(Math.random() * MOVIES.length);
        setWinningIndex(middleStart + randomOffset);
        controls.set({
          x: 0
        });
      }
    }, 1500);
  };
  // --- Render ---
  // State 1: Pick Animation (No movie picked yet)
  if (!tonightMovie) {
    return <div className="min-h-screen bg-background pb-28 animate-fade-in overflow-hidden flex flex-col">
        <AppBar title="Tonight's Pick" action={<></>} />

        <main className="flex-1 pt-20 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Horizontal Scroll Container */}
          <div ref={containerRef} className="relative w-full h-[400px] flex items-center overflow-hidden bg-surface/30 border-y border-white/5 backdrop-blur-sm shadow-inner">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            {/* The Strip */}
            <motion.div animate={controls} initial={{
            x: 0
          }} className="flex items-center absolute left-0 pl-[50vw] md:pl-[50%]" style={{
            marginLeft: -ITEM_WIDTH / 2
          }}>
              {SLOT_ITEMS.map((movie, index) => {
              const isWinner = index === winningIndex;
              return <motion.div key={`${movie.id}-${index}`} className="relative flex-shrink-0 flex justify-center items-center" style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginRight: ITEM_GAP
              }} animate={state === 'revealing' && isWinner ? {
                scale: 1.1,
                zIndex: 30,
                y: -10
              } : {
                scale: 1,
                zIndex: 1,
                y: 0
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15
              }}>
                    <div className={`
                        relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500
                        ${state === 'revealing' && isWinner ? 'ring-4 ring-yellow-500 shadow-[0_0_50px_rgba(255,215,0,0.6)]' : ''}
                        ${state === 'spinning' ? 'blur-[2px]' : ''}
                      `}>
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      {state === 'revealing' && !isWinner && <div className="absolute inset-0 bg-black/60 transition-opacity duration-500" />}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>;
            })}
            </motion.div>

            {state === 'revealing' && <ConfettiExplosion />}
          </div>

          {/* Movie Details (Fade In during reveal) */}
          <AnimatePresence>
            {state === 'revealing' && <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="mt-8 text-center max-w-xs px-4">
                <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.7
            }} className="flex items-center justify-center space-x-2 mb-3">
                  <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-text-secondary border border-white/5">
                    {SLOT_ITEMS[winningIndex].genre}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-medium text-text-secondary border border-white/5">
                    {SLOT_ITEMS[winningIndex].duration}
                  </span>
                  <div className="flex items-center text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20">
                    <Star size={12} fill="currentColor" className="mr-1" />
                    <span className="text-xs font-bold">
                      {SLOT_ITEMS[winningIndex].rating}
                    </span>
                  </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
                  {SLOT_ITEMS[winningIndex].title}
                </h2>
              </motion.div>}
          </AnimatePresence>

          {/* Hold Button */}
          {state !== 'revealing' && state !== 'finished' && <div className="mt-6 relative mb-8">
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 -rotate-90 pointer-events-none">
                <circle cx="48" cy="48" r="46" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                <motion.circle cx="48" cy="48" r="46" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-accent" strokeDasharray="289.02" strokeDashoffset={289.02 - 289.02 * holdProgress / 100} strokeLinecap="round" />
              </svg>

              <button onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold} onTouchStart={startHold} onTouchEnd={cancelHold} disabled={state === 'spinning'} className={`
                  w-20 h-20 rounded-full flex items-center justify-center shadow-glow transition-all duration-200
                  ${state === 'spinning' ? 'bg-gray-700 cursor-not-allowed scale-90' : 'bg-accent active:scale-95'}
                `}>
                {state === 'spinning' ? <motion.div animate={{
              rotate: 360
            }} transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear'
            }}>
                    <Sparkles size={32} className="text-white/50" />
                  </motion.div> : <Play size={32} fill="white" className="text-white ml-1" />}
              </button>

              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider animate-pulse">
                  {state === 'holding' ? 'Keep holding...' : 'Hold to pick'}
                </p>
              </div>
            </div>}
        </main>

        <BottomNav />
      </div>;
  }
  // State 2: Picked Movie Display
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="Tonight's Pick" action={<></>} />

      <main className="pt-20 px-4 max-w-md mx-auto text-center">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5
      }} className="mb-8 relative mx-auto w-full max-w-[300px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <img src={tonightMovie.poster} alt={tonightMovie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 px-4 flex-wrap">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-sm font-bold shadow-lg">
              <span className="mr-1">🏆</span> {tonightMovie.pickedBy}'s Pick
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-text-primary text-xs font-semibold shadow-lg border border-white/10">
              {tonightMovie.streamingService || 'HBO Max'}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            {tonightMovie.title}
          </h2>
          <p className="text-text-tertiary text-sm mb-8 line-clamp-3 px-4">
            {tonightMovie.description}
          </p>

          <div className="space-y-3">
            <button onClick={handleMarkAsWatched} disabled={isMarkingWatched} className={`
                w-full py-4 rounded-xl font-semibold text-lg shadow-glow transition-all duration-300 flex items-center justify-center gap-2
                ${isMarkingWatched ? 'bg-green-500 scale-95' : 'bg-accent active:scale-[0.98]'}
              `}>
              {isMarkingWatched ? <>
                  <Check size={24} className="animate-bounce" />
                  <span>Marked as Watched!</span>
                </> : 'Mark as Watched'}
            </button>
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>;
}