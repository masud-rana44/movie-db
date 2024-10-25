"use client";

import { Movie } from "@/lib/tmdb";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WatchlistStore {
  movies: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlist = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      movies: [],
      addToWatchlist: (movie) =>
        set((state) => ({
          movies: [...state.movies, movie],
        })),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieId),
        })),
      isInWatchlist: (movieId) =>
        get().movies.some((movie) => movie.id === movieId),
    }),
    {
      name: "watchlist-storage",
    }
  )
);
