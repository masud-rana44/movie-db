import {
  getMovieDetails,
  getMovieCredits,
  getMovieRecommendations,
} from "@/lib/tmdb";
import MovieDetails from "@/components/movie-details";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const movieId = parseInt(params.id);
    const [movie, credits, recommendations] = await Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getMovieRecommendations(movieId),
    ]);

    return (
      <MovieDetails
        movie={movie}
        credits={credits}
        recommendations={recommendations}
      />
    );
  } catch (error) {
    notFound();
  }
}
