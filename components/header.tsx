"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-6 w-6" />
            <span className="text-xl font-bold">MovieDB</span>
          </Link>

          <div className="flex-1 mx-4 max-w-xl">
            <Input
              type="search"
              placeholder="Search movies..."
              className="w-full"
              {...register("search")}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/watchlist">
              <Button variant="outline">Watchlist</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
