"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sun, Moon, Film } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const { register } = useForm({
    defaultValues: {
      search: "",
    },
  });

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
              onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/watchlist">
              <Button variant="outline">Watchlist</Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
