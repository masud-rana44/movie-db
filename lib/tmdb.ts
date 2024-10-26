import { z } from "zod";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()).optional(),
});

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const GenreListSchema = z.object({
  genres: z.array(GenreSchema),
});

export const MovieDetailsSchema = MovieSchema.extend({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  runtime: z.number(),
  status: z.string(),
  tagline: z.string().nullable(),
});

export const MovieListSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const CreditsSchema = z.object({
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      character: z.string(),
      profile_path: z.string().nullable(),
    })
  ),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;
export type MovieList = z.infer<typeof MovieListSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
export type Genre = z.infer<typeof GenreSchema>;
export type GenreList = z.infer<typeof GenreListSchema>;

export async function fetchMovies(page: number = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  return MovieListSchema.parse(data);
}

export async function fetchGenres() {
  const response = await fetch(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`,
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await response.json();
  return GenreListSchema.parse(data);
}

export async function searchMovies(query: string, page: number = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();
  return MovieListSchema.parse(data);
}

export async function getMovieDetails(id: number) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  return MovieDetailsSchema.parse(data);
}

export async function getMovieCredits(id: number) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  const data = await response.json();
  return CreditsSchema.parse(data);
}

export async function getMovieRecommendations(id: number) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie recommendations");
  }

  const data = await response.json();
  return MovieListSchema.parse(data);
}
