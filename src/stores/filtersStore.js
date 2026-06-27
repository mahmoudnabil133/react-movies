import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFiltersStore = create(
  persist(
    (set) => ({
      activeTab: 'popular',
      selectedSubject: '',
      sortBy: 'relevance',
      yearFrom: '',
      yearTo: '',
      scrollMode: 'infinite',

      setActiveTab: (activeTab) => set({ activeTab }),
      setSelectedSubject: (selectedSubject) => set({ selectedSubject }),
      setSortBy: (sortBy) => set({ sortBy }),
      setYearFrom: (yearFrom) => set({ yearFrom }),
      setYearTo: (yearTo) => set({ yearTo }),
      setScrollMode: (scrollMode) => set({ scrollMode }),
      resetFilters: () =>
        set({
          selectedSubject: '',
          sortBy: 'relevance',
          yearFrom: '',
          yearTo: '',
        }),
    }),
    {
      name: 'book-filters',
      partialize: (state) => ({
        activeTab: state.activeTab,
        selectedSubject: state.selectedSubject,
        sortBy: state.sortBy,
        yearFrom: state.yearFrom,
        yearTo: state.yearTo,
        scrollMode: state.scrollMode,
      }),
    }
  )
);
