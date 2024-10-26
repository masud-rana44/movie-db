import { Suspense } from "react";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieRecommendations,
} from "@/lib/tmdb";
import MovieDetails from "@/components/movie-details";
import { MovieDetailsSkeleton } from "@/components/skeletons";
import { notFound } from "next/navigation";

type tParams = Promise<{ id: string }>;

export default async function MoviePage(props: { params: tParams }) {
  try {
    const { id } = await props.params;
    const movieId = parseInt(id);
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
  } catch (error) {
    notFound();
  }
}
