"use client";

import Image from "next/image";
import {
  MovieDetails as MovieDetailsType,
  Credits,
  MovieList,
} from "@/lib/tmdb";
import { useWatchlist } from "@/hooks/use-watchlist";
import { Button } from "./ui/button";
import { Heart, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import MovieCard from "./movie-card";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  credits: Credits;
  recommendations: MovieList;
}

export default function MovieDetails({
  movie,
  credits,
  recommendations,
}: MovieDetailsProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-xl text-muted-foreground mb-4">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>

            <Button size="lg" onClick={handleWatchlistClick} className="gap-2">
              <Heart
                className={cn(
                  "h-5 w-5",
                  isWatchlisted ? "fill-current text-red-500" : ""
                )}
              />
              {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg leading-relaxed">{movie.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-full flex-wrap lg:flex-nowrap space-x-4 p-4">
                {credits.cast.slice(0, 20).map((actor) => (
                  <div key={actor.id} className="w-[150px] space-y-3">
                    <div className="aspect-[2/3] overflow-hidden rounded-lg relative">
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <h3 className="font-medium leading-none">{actor.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-muted-foreground">Status</dt>
                <dd className="text-lg">{movie.status}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Release Date</dt>
                <dd className="text-lg">
                  {new Date(movie.release_date).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.results.length > 0 && (
        <section className="space-y-6">
          <Separator />
          <h2 className="text-2xl font-bold">Recommended Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.results.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
