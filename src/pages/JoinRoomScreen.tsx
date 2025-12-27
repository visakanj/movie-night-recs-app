import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export function JoinRoomScreen() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background animate-fade-in">
      <header className="fixed top-0 left-0 right-0 z-40 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-primary hover:text-text-secondary transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="ml-2 text-[17px] font-semibold text-text-primary">
          Join Room
        </h1>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-surface-elevated rounded-2xl mx-auto mb-6 flex items-center justify-center border border-border-subtle shadow-lg">
            <span className="text-4xl">🎫</span>
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Have a code?
          </h2>
          <p className="text-text-secondary">
            Enter the invite code shared by your friend.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <input type="text" placeholder="ENTER CODE" className="w-full bg-surface-elevated text-text-primary text-center text-2xl tracking-[0.2em] font-mono px-4 py-6 rounded-xl border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-text-tertiary uppercase" />
          </div>

          <div className="pt-4">
            <button className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-lg shadow-glow active:scale-[0.98] transition-transform">
              Join Room
            </button>
          </div>
        </div>
      </main>
    </div>;
}