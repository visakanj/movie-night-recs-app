import React from 'react';
import { AppBar } from '../components/AppBar';
import { BottomNav } from '../components/BottomNav';
import { MoviePosterTile } from '../components/MoviePosterTile';
export function WatchedScreen() {
  const history = [{
    id: 101,
    title: 'Oppenheimer',
    year: '2023',
    imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    rating: '9.0'
  }, {
    id: 102,
    title: 'Barbie',
    year: '2023',
    imageUrl: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    rating: '7.2'
  }, {
    id: 103,
    title: 'The Batman',
    year: '2022',
    imageUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    rating: '8.1'
  }];
  return <div className="min-h-screen bg-background pb-28 animate-fade-in">
      <AppBar title="History" />

      <main className="pt-20 px-4 max-w-md mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            Previously Watched
          </h2>
          <p className="text-text-tertiary text-sm mt-1">
            Movies your group has finished.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {history.map(movie => <MoviePosterTile key={movie.id} title={movie.title} year={movie.year} imageUrl={movie.imageUrl} rating={movie.rating} />)}
        </div>
      </main>

      <BottomNav />
    </div>;
}