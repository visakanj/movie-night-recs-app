import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Trash2, X, Calendar, Star, Tv, Users } from 'lucide-react';
import { ContributorChip } from './ContributorChip';
interface Contributor {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}
interface Movie {
  id: string;
  title: string;
  year: string;
  posterUrl: string;
  contributors: Contributor[];
  addedBy?: string;
  synopsis?: string;
  rating?: string;
  streamingProviders?: string[];
}
interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  movie: Movie | null;
}
export function ActionSheet({
  isOpen,
  onClose,
  onRemove,
  movie
}: ActionSheetProps) {
  const [active, setActive] = useState(false);
  const sheetHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const [{
    y
  }, apiY] = useSpring(() => ({
    y: sheetHeight,
    config: {
      tension: 280,
      friction: 30
    }
  }));
  useEffect(() => {
    if (isOpen) {
      setActive(true);
      apiY.start({
        y: 0
      });
    } else {
      apiY.start({
        y: sheetHeight,
        onRest: () => setActive(false)
      });
    }
  }, [isOpen, sheetHeight, apiY]);
  const bind = useDrag(({
    active,
    movement: [, my],
    cancel,
    last
  }) => {
    if (my < -20) cancel();
    if (last && my > 100) {
      onClose();
    } else {
      apiY.start({
        y: active ? Math.max(0, my) : 0,
        immediate: active
      });
    }
  }, {
    from: () => [0, y.get()],
    filterTaps: true,
    bounds: {
      top: 0
    },
    rubberband: true
  });
  if (!active && !isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      {/* Backdrop - z-0 to ensure it stays behind */}
      <animated.div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto z-0" style={{
      opacity: y.to([0, sheetHeight], [1, 0])
    }} onClick={onClose} />

      {/* Sheet Container - z-10 to ensure it stays on top */}
      <animated.div className="relative z-10 w-full max-w-md bg-[#1A1A1C] rounded-t-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col h-[85vh]" style={{
      y
    }}>
        {/* Drag Handle Area */}
        <div {...bind()} className="w-full flex justify-center pt-4 pb-2 bg-[#1A1A1C] touch-none cursor-grab active:cursor-grabbing z-20 shrink-0">
          <div className="w-12 h-1.5 bg-white/20 rounded-full" />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/5 rounded-full transition-colors z-30">
          <X size={20} />
        </button>

        {movie && <>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain bg-[#1A1A1C]">
              <div className="p-6 pt-2 space-y-6">
                {/* Header: Poster + Basic Info */}
                <div className="flex gap-5 shrink-0">
                  <div className="shrink-0 w-32 aspect-[2/3] rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-gray-800">
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 py-1">
                    <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                      {movie.title}
                    </h2>

                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-text-secondary mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 opacity-70" />
                        <span>{movie.year}</span>
                      </div>
                      {movie.rating && <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 mr-1.5 fill-current" />
                          <span className="font-medium">{movie.rating}</span>
                          <span className="text-text-tertiary ml-1">/ 10</span>
                        </div>}
                    </div>

                    {/* Streaming Providers */}
                    {movie.streamingProviders && movie.streamingProviders.length > 0 && <div className="flex flex-wrap gap-2 mt-auto">
                          {movie.streamingProviders.map((provider, i) => <span key={i} className="px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-xs font-medium text-white/90">
                              {provider}
                            </span>)}
                        </div>}
                  </div>
                </div>

                {/* Synopsis */}
                {movie.synopsis && <div className="space-y-2 shrink-0">
                    <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                      Synopsis
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {movie.synopsis}
                    </p>
                  </div>}

                {/* Contributors */}
                {movie.contributors && movie.contributors.length > 0 && <div className="space-y-3 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white/90 uppercase tracking-wide">
                      <Users className="w-4 h-4" />
                      Contributors
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {movie.contributors.map(contributor => <ContributorChip key={contributor.id} name={contributor.name} role={contributor.role} avatarUrl={contributor.avatarUrl} />)}
                    </div>
                  </div>}
              </div>
            </div>

            {/* Pinned Footer with Remove Button */}
            <div className="p-6 pt-4 bg-[#1A1A1C] border-t border-white/5 shrink-0 pb-10">
              <button onClick={onRemove} className="w-full py-3.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 font-semibold text-base transition-colors flex items-center justify-center gap-2 border border-red-500/20 active:scale-[0.98]">
                <Trash2 size={18} />
                Remove from Pool
              </button>
            </div>
          </>}
      </animated.div>
    </div>;
}