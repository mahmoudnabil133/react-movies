import { create } from 'zustand';

const BOOK_SUBJECTS = [
  { id: "fiction", name: "Fiction" },
  { id: "fantasy", name: "Fantasy" },
  { id: "science_fiction", name: "Science Fiction" },
  { id: "mystery", name: "Mystery" },
  { id: "thriller", name: "Thriller" },
  { id: "romance", name: "Romance" },
  { id: "history", name: "History" },
  { id: "science", name: "Science" },
  { id: "biography", name: "Biography" },
  { id: "young_adult", name: "Young Adult" },
  { id: "horror", name: "Horror" },
  { id: "philosophy", name: "Philosophy" },
  { id: "poetry", name: "Poetry" },
  { id: "drama", name: "Drama" },
  { id: "comics", name: "Comics & Graphic Novels" },
];

export const useSubjectsStore = create((set, get) => ({
  subjects: BOOK_SUBJECTS,
  isLoading: false,
  error: null,

  loadSubjects: async () => {
    return get().subjects;
  },
}));
