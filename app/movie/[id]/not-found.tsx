import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

export default function MovieNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Film className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold text-center">Movie Not Found</h1>
      <p className="text-muted-foreground text-center max-w-md">
        The movie you&apos;re looking for doesn&apos;t exist or has been
        removed.
      </p>
      <Link href="/">
        <Button>Browse Movies</Button>
      </Link>
    </div>
  );
}
