"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import MovieCard from "@/components/movie-card";
import { Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
  const { movies } = useWatchlist();

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Film className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-center">
          Your watchlist is empty
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Start adding movies to your watchlist by browsing our collection
        </p>
        <Link href="/">
          <Button>Browse Movies</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">My Watchlist</h1>
        <p className="text-muted-foreground">
          {movies.length} {movies.length === 1 ? "movie" : "movies"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
