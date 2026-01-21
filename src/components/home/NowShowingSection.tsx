import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import MovieCard from "@/components/movies/MovieCard";
import { movies } from "@/data/movies";

const NowShowingSection = () => {
  const nowShowingMovies = movies.filter((movie) => movie.isNowShowing);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              À l'affiche
            </h2>
            <p className="text-muted-foreground mt-2">
              Les films qui font sensation en ce moment
            </p>
          </div>
          <Link to="/movies">
            <Button variant="cinema-outline" className="group">
              Voir tous les films
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nowShowingMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NowShowingSection;
