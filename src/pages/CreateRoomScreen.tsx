import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export function CreateRoomScreen() {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background animate-fade-in">
      <header className="fixed top-0 left-0 right-0 z-40 px-4 h-14 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-text-primary hover:text-text-secondary transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="ml-2 text-[17px] font-semibold text-text-primary">
          Create Room
        </h1>
      </header>

      <main className="pt-20 px-6 max-w-md mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              Room Name
            </label>
            <input type="text" placeholder="e.g. Friday Movie Night" className="w-full bg-surface-elevated text-text-primary px-4 py-4 rounded-xl border border-border-subtle focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-text-tertiary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2 ml-1">
              Streaming Services
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Netflix', 'HBO Max', 'Disney+', 'Prime', 'Hulu', 'Apple TV+'].map(service => <label key={service} className="flex items-center p-4 rounded-xl bg-surface border border-border-subtle cursor-pointer hover:bg-surface-elevated transition-colors">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent bg-transparent" />
                  <span className="ml-3 text-sm font-medium text-text-primary">
                    {service}
                  </span>
                </label>)}
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-lg shadow-glow active:scale-[0.98] transition-transform">
              Create Room
            </button>
          </div>
        </div>
      </main>
    </div>;
}