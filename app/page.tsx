import { Suspense } from "react";
import MovieGrid from "@/components/movie-grid";
import { MovieListSkeleton } from "@/components/skeletons";
import { fetchGenres } from "@/lib/tmdb";

export default async function Home() {
  const { genres } = await fetchGenres();

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Popular Movies</h1>
      <Suspense fallback={<MovieListSkeleton />}>
        <MovieGrid genres={genres} />
      </Suspense>
    </div>
  );
}
