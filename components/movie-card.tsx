"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Genre, Movie } from "@/lib/tmdb";
import { Heart, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useWatchlist } from "@/hooks/use-watchlist";

export default function MovieCard({
  movie,
  genres,
}: {
  movie: Movie;
  genres?: Genre[];
}) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);

  const movieGenres =
    genres?.filter((genre) => movie.genre_ids?.includes(genre.id)) || [];

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card className="overflow-hidden group relative flex flex-col justify-between">
      <CardContent className="p-0 flex flex-col flex-grow">
        <Link href={`/movie/${movie.id}`}>
          <div className="aspect-[2/3] relative">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-semibold line-clamp-1 mb-2">{movie.title}</h2>

          {!!genres && (
            <div className="flex flex-wrap gap-1 mb-2">
              {movieGenres.map((genre) => (
                <Badge key={genre.id} variant="outline">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
            <div className="flex text-sm items-center text-muted-foreground ">
              <Star className="h-3 w-3  mr-1" />
              <span className="mr-[2px]">{movie.vote_average.toFixed(1)}</span>
              <span>({movie.vote_count})</span>
            </div>
            <p className="text-sm text-muted-foreground ">
              {new Date(movie.release_date).getFullYear()}
            </p>
          </div>

          <div className="mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleWatchlistClick}
            >
              <Heart
                className={cn(
                  "h-4 w-4 mr-2",
                  isWatchlisted ? "fill-current text-red-500" : ""
                )}
              />
              {isWatchlisted ? "Remove" : "Add to Watchlist"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
