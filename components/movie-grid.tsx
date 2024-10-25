"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/lib/tmdb";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieGrid() {
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
          page.results.map((movie) => <div key={movie.id}>{movie.title}</div>)
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
