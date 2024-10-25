import MovieGrid from "@/components/movie-grid";

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Popular Movies</h1>
      <MovieGrid />
    </div>
  );
}
