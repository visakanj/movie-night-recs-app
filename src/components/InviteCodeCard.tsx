import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
interface InviteCodeCardProps {
  code: string;
  expiresAt?: Date;
}
export function InviteCodeCard({
  code,
  expiresAt
}: InviteCodeCardProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };
  return <div className="w-full p-6 rounded-2xl bg-[#1A1A1D]/80 backdrop-blur-md border border-white/[0.06] shadow-lg flex flex-col items-center justify-center space-y-4 animate-fade-in">
      <div className="text-center space-y-1">
        <h3 className="text-sm font-medium text-text-tertiary uppercase tracking-wider">
          Room Code
        </h3>
        {expiresAt && <p className="text-xs text-text-tertiary">
            Expires in{' '}
            {Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60))}{' '}
            hours
          </p>}
      </div>

      <div onClick={handleCopy} className="relative group cursor-pointer">
        <div className="text-5xl md:text-6xl font-mono font-bold tracking-widest text-white group-hover:text-accent transition-colors duration-300">
          {code}
        </div>
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {copied ? <Check className="text-green-500" size={24} /> : <Copy className="text-text-tertiary" size={24} />}
        </div>
      </div>

      <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors border border-white/10 text-sm font-medium text-text-secondary">
        {copied ? <>
            <Check size={16} className="text-green-500" />
            <span>Copied</span>
          </> : <>
            <Copy size={16} />
            <span>Tap to copy</span>
          </>}
      </button>
    </div>;
}