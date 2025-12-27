import React from 'react';
interface ContributorChipProps {
  name: string;
  avatarUrl?: string;
  active?: boolean;
}
export function ContributorChip({
  name,
  avatarUrl,
  active
}: ContributorChipProps) {
  return <div className={`inline-flex items-center pl-1 pr-3 py-1 rounded-full border transition-colors ${active ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-surface border-white/10 text-text-secondary'}`}>
      {avatarUrl ? <img src={avatarUrl} alt={name} className="w-5 h-5 rounded-full mr-2 object-cover" /> : <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-[10px] font-bold ${active ? 'bg-accent text-white' : 'bg-white/10 text-text-secondary'}`}>
          {name.charAt(0)}
        </div>}
      <span className="text-xs font-medium">{name}</span>
    </div>;
}