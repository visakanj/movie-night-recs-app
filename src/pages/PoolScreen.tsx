import React from 'react';
import { Plus } from 'lucide-react';
import { AppBar } from '../components/AppBar';
import { MoviePosterTile } from '../components/MoviePosterTile';
import { BottomNav } from '../components/BottomNav';
import { ContributorChip } from '../components/ContributorChip';
export function PoolScreen() {
  const movies = [{
    id: 1,
    title: 'Dune: Part Two',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    rating: '8.8'
  }, {
    id: 2,
    title: 'Civil War',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
    rating: '7.6'
  }, {
    id: 3,
    title: 'Challengers',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
    rating: '7.4'
  }, {
    id: 4,
    title: 'The Fall Guy',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqnHBxXZmrotuse.jpg',
    rating: '7.3'
  }, {
    id: 5,
    title: 'Furiosa',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
    rating: '7.8'
  }, {
    id: 6,
    title: 'Kingdom of the Planet of the Apes',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
    rating: '7.2'
  }];
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="Action Movies" action={<button className="p-2 -mr-2 text-text-primary hover:text-text-secondary transition-colors rounded-full active:bg-white/10">
            <Plus size={24} />
          </button>} />

      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
          <ContributorChip name="All" active />
          <ContributorChip name="Sarah" />
          <ContributorChip name="Mike" />
          <ContributorChip name="Jessica" />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {movies.map(movie => <MoviePosterTile key={movie.id} title={movie.title} year={movie.year} imageUrl={movie.imageUrl} rating={movie.rating} />)}
        </div>
      </main>

      <BottomNav />
    </div>;
}