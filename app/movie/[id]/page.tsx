import { Suspense } from "react";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieRecommendations,
} from "@/lib/tmdb";
import MovieDetails from "@/components/movie-details";
import { MovieDetailsSkeleton } from "@/components/skeletons";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const movieId = parseInt(params.id, 10);
    const [movie, credits, recommendations] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getMovieRecommendations(movieId),
    ]);

    return (
      <Suspense fallback={<MovieDetailsSkeleton />}>
        <MovieDetails
          movie={movie}
          credits={credits}
          recommendations={recommendations}
        />
      </Suspense>
    );
  } catch {
    notFound();
  }
}
