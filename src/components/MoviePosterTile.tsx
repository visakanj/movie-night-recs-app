import React, { lazy } from 'react';
interface MoviePosterTileProps {
  title: string;
  imageUrl: string;
  year?: string;
  rating?: string;
  selected?: boolean;
  onClick?: () => void;
}
export function MoviePosterTile({
  title,
  imageUrl,
  year,
  rating,
  selected,
  onClick
}: MoviePosterTileProps) {
  return <div onClick={onClick} className="relative flex flex-col gap-2 group cursor-pointer">
      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-elevated shadow-lg transition-all duration-300 ${selected ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}>
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {selected && <div className="absolute inset-0 bg-accent/20 backdrop-blur-[1px] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6666 1L5.49992 10.1667L1.33325 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>}
      </div>

      <div className="space-y-0.5">
        <h4 className="text-sm font-medium text-text-primary truncate leading-snug">
          {title}
        </h4>
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span>{year}</span>
          {rating && <span className="px-1.5 py-0.5 rounded bg-white/10 text-text-secondary font-medium text-[10px]">
              {rating}
            </span>}
        </div>
      </div>
    </div>;
}