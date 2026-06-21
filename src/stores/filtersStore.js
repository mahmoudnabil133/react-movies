import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFiltersStore = create(
  persist(
    (set) => ({
      activeTab: 'now_playing',
      selectedGenre: '',
      sortBy: 'popularity.desc',
      yearFrom: '',
      yearTo: '',
      scrollMode: 'infinite',

      setActiveTab: (activeTab) => set({ activeTab }),
      setSelectedGenre: (selectedGenre) => set({ selectedGenre }),
      setSortBy: (sortBy) => set({ sortBy }),
      setYearFrom: (yearFrom) => set({ yearFrom }),
      setYearTo: (yearTo) => set({ yearTo }),
      setScrollMode: (scrollMode) => set({ scrollMode }),
      resetFilters: () =>
        set({
          selectedGenre: '',
          sortBy: 'popularity.desc',
          yearFrom: '',
          yearTo: '',
        }),
    }),
    {
      name: 'movie-filters',
      partialize: (state) => ({
        activeTab: state.activeTab,
        selectedGenre: state.selectedGenre,
        sortBy: state.sortBy,
        yearFrom: state.yearFrom,
        yearTo: state.yearTo,
        scrollMode: state.scrollMode,
      }),
    }
  )
);
