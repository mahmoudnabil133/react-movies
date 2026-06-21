import { create } from 'zustand';
import { fetchMovieVideos } from '../api/tmdb';
import { toast } from '../lib/toast';

function findTrailer(videos = []) {
  return videos.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
}

export const useTrailerStore = create((set) => ({
  videoKey: null,
  isOpen: false,

  openTrailer: async (movieId, existingVideos) => {
    let trailer = findTrailer(existingVideos);

    if (!trailer && movieId) {
      try {
        const data = await fetchMovieVideos(movieId);
        trailer = findTrailer(data.results);
      } catch {
        toast.error('Failed to load trailer.');
        return;
      }
    }

    if (trailer) {
      set({ videoKey: trailer.key, isOpen: true });
    } else {
      toast.error('No trailer available for this movie.');
    }
  },

  closeTrailer: () => set({ videoKey: null, isOpen: false }),
}));
