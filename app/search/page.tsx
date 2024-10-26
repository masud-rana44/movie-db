"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["movies", "search", query],
      queryFn: ({ pageParam }) => searchMovies(query, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      enabled: query.length >= 2,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (query.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Search className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-center">Search Movies</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Enter at least 2 characters to search for movies
        </p>
      </div>
    );
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error searching movies</div>;
  }

  const totalResults = data.pages[0].total_results;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Search Results</h1>
        <p className="text-muted-foreground">
          {totalResults} {totalResults === 1 ? "result" : "results"} for &quot;
          {query}&quot;
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <Search className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-bold text-center">No results found</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.pages.map((page) =>
              page.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
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
        </>
      )}
    </div>
  );
}
