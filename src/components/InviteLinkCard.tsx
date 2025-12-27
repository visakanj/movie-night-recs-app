import React, { useState } from 'react';
import { Copy, Check, Share2, Link as LinkIcon } from 'lucide-react';
interface InviteLinkCardProps {
  link: string;
  roomName: string;
}
export function InviteLinkCard({
  link,
  roomName
}: InviteLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${roomName}`,
          text: `Join me for movie night in ${roomName}!`,
          url: link
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };
  return <div className="w-full p-4 rounded-xl bg-[#1A1A1D]/60 backdrop-blur-md border border-white/[0.06] flex flex-col gap-3">
      <h3 className="text-sm font-medium text-text-tertiary px-1">
        Invite Link
      </h3>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-3 px-3 py-3 rounded-lg bg-black/20 border border-white/10 overflow-hidden">
          <LinkIcon size={16} className="text-text-tertiary flex-shrink-0" />
          <span className="text-sm text-text-secondary truncate font-mono">
            {link.replace(/^https?:\/\//, '')}
          </span>
        </div>

        <button onClick={handleCopy} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition-colors text-text-secondary" aria-label="Copy link">
          {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
        </button>

        <button onClick={handleShare} className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 active:bg-accent/30 border border-accent/20 transition-colors text-accent" aria-label="Share link">
          <Share2 size={20} />
        </button>
      </div>
    </div>;
}