import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { movies, genres } from "@/data/movies";
import { Search, Filter } from "lucide-react";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const [showFilter, setShowFilter] = useState<"all" | "nowShowing" | "comingSoon">("all");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.director.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "Tous" || movie.genre === selectedGenre;
    const matchesFilter = showFilter === "all" ||
                         (showFilter === "nowShowing" && movie.isNowShowing) ||
                         (showFilter === "comingSoon" && movie.isComingSoon);
    return matchesSearch && matchesGenre && matchesFilter;
  });

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nos <span className="text-gradient-gold">Films</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de films. Des blockbusters aux films d'auteur, il y en a pour tous les goûts.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher un film ou réalisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border focus:border-primary"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["all", "nowShowing", "comingSoon"].map((filter) => (
                <Button
                  key={filter}
                  variant={showFilter === filter ? "cinema" : "cinema-ghost"}
                  size="sm"
                  onClick={() => setShowFilter(filter as typeof showFilter)}
                >
                  {filter === "all" && "Tous les films"}
                  {filter === "nowShowing" && "À l'affiche"}
                  {filter === "comingSoon" && "Prochainement"}
                </Button>
              ))}
            </div>

            {/* Genre Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className="text-xs"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-muted-foreground">
            {filteredMovies.length} film{filteredMovies.length > 1 ? "s" : ""} trouvé{filteredMovies.length > 1 ? "s" : ""}
          </div>

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Aucun film trouvé
              </h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche.
              </p>
              <Button
                variant="cinema-outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("Tous");
                  setShowFilter("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MoviesPage;
