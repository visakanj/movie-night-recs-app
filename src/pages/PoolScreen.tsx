import React, { useState, Component } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppBar } from '../components/AppBar';
import { MoviePosterTile } from '../components/MoviePosterTile';
import { BottomNav } from '../components/BottomNav';
import { ContributorChip } from '../components/ContributorChip';
import { ActionSheet } from '../components/ActionSheet';
export function PoolScreen() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [movies, setMovies] = useState([{
    id: 1,
    title: 'Dune: Part Two',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    rating: '8.8',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    streamingProviders: ['HBO Max', 'Hulu'],
    contributors: [{
      id: '1',
      name: 'Sarah',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
    }, {
      id: '2',
      name: 'Mike',
      role: 'Voted',
      avatarUrl: 'https://i.pravatar.cc/150?u=mike'
    }]
  }, {
    id: 2,
    title: 'Civil War',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg',
    rating: '7.6',
    synopsis: 'In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.',
    streamingProviders: ['Amazon Prime'],
    contributors: [{
      id: '3',
      name: 'Jessica',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=jessica'
    }]
  }, {
    id: 3,
    title: 'Challengers',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsv.jpg',
    rating: '7.4',
    synopsis: "Tashi, a tennis player turned coach, has taken her husband, Art, and transformed him from a mediocre player into a world-famous grand slam champion. To jolt him out of his recent losing streak, she makes him play a 'Challenger' event — close to the lowest level of tournament on the pro tour.",
    streamingProviders: ['MGM+'],
    contributors: [{
      id: '2',
      name: 'Mike',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=mike'
    }]
  }, {
    id: 4,
    title: 'The Fall Guy',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/tSz1qsmSJon0rqnHBxXZmrotuse.jpg',
    rating: '7.3',
    synopsis: "Colt Seavers is a stuntman who left the business a year earlier to focus on his physical and mental health. He's drafted back into service when the star of a mega-budget studio movie, directed by his ex, goes missing.",
    streamingProviders: ['Peacock'],
    contributors: [{
      id: '1',
      name: 'Sarah',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=sarah'
    }]
  }, {
    id: 5,
    title: 'Furiosa',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
    rating: '7.8',
    synopsis: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe.',
    streamingProviders: ['HBO Max'],
    contributors: [{
      id: '3',
      name: 'Jessica',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=jessica'
    }]
  }, {
    id: 6,
    title: 'Kingdom of the Planet of the Apes',
    year: '2024',
    imageUrl: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
    rating: '7.2',
    synopsis: "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey.",
    streamingProviders: ['Hulu', 'Disney+'],
    contributors: [{
      id: '2',
      name: 'Mike',
      role: 'Added by',
      avatarUrl: 'https://i.pravatar.cc/150?u=mike'
    }]
  }]);
  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovieTitle.trim()) return;
    const newMovie = {
      id: Date.now(),
      title: newMovieTitle,
      year: '2024',
      imageUrl: 'https://placehold.co/500x750/1a1a1a/ffffff?text=' + encodeURIComponent(newMovieTitle),
      rating: '-',
      synopsis: 'No synopsis available.',
      streamingProviders: [],
      contributors: [{
        id: '0',
        name: 'You',
        role: 'Added by'
      }]
    };
    setMovies([newMovie, ...movies]);
    setNewMovieTitle('');
    setIsAddModalOpen(false);
  };
  const handleRemoveMovie = () => {
    if (selectedMovie) {
      setMovies(movies.filter(m => m.id !== selectedMovie.id));
      setSelectedMovie(null);
    }
  };
  return <div className="min-h-screen bg-background pb-28 animate-fade-in relative">
      <AppBar title="Action Movies" action={<button onClick={() => setIsAddModalOpen(true)} className="p-2 -mr-2 text-text-primary hover:text-text-secondary transition-colors rounded-full active:bg-white/10">
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
          {movies.map(movie => <div key={movie.id} onClick={() => setSelectedMovie({
          ...movie,
          posterUrl: movie.imageUrl // Map imageUrl to posterUrl for ActionSheet
        })}>
              <MoviePosterTile title={movie.title} year={movie.year} imageUrl={movie.imageUrl} rating={movie.rating} />
            </div>)}
        </div>
      </main>

      {/* Movie Details Sheet */}
      <ActionSheet isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} onRemove={handleRemoveMovie} movie={selectedMovie} />

      {/* Add Movie Modal */}
      <AnimatePresence>
        {isAddModalOpen && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} className="fixed inset-x-4 top-[20%] max-w-sm mx-auto bg-[#1A1A1C] border border-white/10 rounded-2xl p-6 z-50 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Add Movie</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-text-tertiary hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddMovie}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Movie Title
                  </label>
                  <input type="text" value={newMovieTitle} onChange={e => setNewMovieTitle(e.target.value)} placeholder="e.g. The Matrix" autoFocus className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" />
                </div>

                <button type="submit" disabled={!newMovieTitle.trim()} className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors">
                  Add to Pool
                </button>
              </form>
            </motion.div>
          </>}
      </AnimatePresence>

      <BottomNav />
    </div>;
}