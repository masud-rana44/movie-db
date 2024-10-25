"use client";

import { Movie } from "@/lib/tmdb";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWatchlist } from "@/hooks/use-watchlist";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card className="overflow-hidden group relative">
      <CardContent className="p-0">
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

        <div className="p-4">
          <h2 className="font-semibold line-clamp-1 mb-2">{movie.title}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {new Date(movie.release_date).getFullYear()}
          </p>

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
      </CardContent>
    </Card>
  );
}
