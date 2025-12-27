import React from 'react';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
export function TonightScreen() {
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="Tonight's Pick" />

      <main className="pt-20 px-4 max-w-md mx-auto text-center">
        <div className="mb-8 relative mx-auto w-full max-w-[300px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
          <img src="https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg" alt="Civil War" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 px-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-white text-sm font-bold shadow-lg">
              <span className="mr-1">🏆</span> Sarah's Pick
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-text-primary text-xs font-semibold shadow-lg border border-white/10">
              HBO Max
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-text-primary mb-8">Civil War</h2>

        <div className="space-y-3">
          <button className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-lg shadow-glow active:scale-[0.98] transition-transform">
            Mark as Watched
          </button>
        </div>
      </main>

      <BottomNav />
    </div>;
}