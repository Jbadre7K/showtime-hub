import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Calendar } from "lucide-react";
import { movies } from "@/data/movies";

const ComingSoonSection = () => {
  const comingSoonMovies = movies.filter((movie) => movie.isComingSoon);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, "0")}`;
  };

  return (
    <section className="py-16 md:py-24 bg-cinema-surface">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Prochainement
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Les films les plus attendus arrivent bientôt dans nos salles
          </p>
        </div>

        {/* Coming Soon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comingSoonMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="group cinema-card flex flex-col sm:flex-row overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Poster */}
              <div className="relative w-full sm:w-48 aspect-[2/3] sm:aspect-auto flex-shrink-0 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Sortie le {new Date(movie.releaseDate).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{movie.genre}</span>
                    <span>•</span>
                    <span>{formatDuration(movie.duration)}</span>
                    <span>•</span>
                    <span>{movie.director}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {movie.synopsis}
                  </p>
                </div>

                <div className="mt-4">
                  <Button variant="cinema-outline" size="sm" className="group/btn">
                    <Bell className="w-4 h-4" />
                    M'alerter de la sortie
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
