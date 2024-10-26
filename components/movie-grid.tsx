"use client";

import { useEffect } from "react";
import MovieCard from "./movie-card";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { fetchMovies, GenreList } from "@/lib/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export default function MovieGrid({ genres }: GenreList) {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: ({ pageParam }) => fetchMovies(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading movies</div>;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))
        )}
      </div>

      <div className="flex justify-center" ref={ref}>
        {isFetchingNextPage && (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more
          </Button>
        )}
      </div>
    </div>
  );
}
