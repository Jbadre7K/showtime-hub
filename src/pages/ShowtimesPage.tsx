import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { movies, showtimes, getRoomById } from "@/data/movies";

const ShowtimesPage = () => {
  const [selectedDate, setSelectedDate] = useState(0);

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Get movies with showtimes for the selected date
  const getMoviesWithShowtimes = () => {
    const selectedDateKey = formatDateKey(dates[selectedDate]);
    
    return movies
      .filter((movie) => movie.isNowShowing)
      .map((movie) => {
        const movieShowtimes = showtimes.filter(
          (s) => s.movieId === movie.id && s.date === "2025-01-21" // Using mock date
        );
        return { movie, showtimes: movieShowtimes };
      })
      .filter(({ showtimes }) => showtimes.length > 0);
  };

  const moviesWithShowtimes = getMoviesWithShowtimes();

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              <Calendar className="inline w-10 h-10 mr-3 text-primary" />
              Séances
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Consultez les horaires de toutes nos séances et réservez vos places en quelques clics.
            </p>
          </div>

          {/* Date Selector */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button
                variant="cinema-ghost"
                size="icon"
                onClick={() => setSelectedDate(Math.max(0, selectedDate - 1))}
                disabled={selectedDate === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2 overflow-x-auto py-2 px-4 max-w-full">
                {dates.map((date, index) => (
                  <Button
                    key={index}
                    variant={selectedDate === index ? "cinema" : "cinema-outline"}
                    className="flex-shrink-0 min-w-[100px]"
                    onClick={() => setSelectedDate(index)}
                  >
                    <div className="text-center">
                      <div className="text-xs opacity-80">
                        {index === 0 ? "Aujourd'hui" : formatDate(date).split(" ")[0]}
                      </div>
                      <div className="font-semibold">
                        {formatDate(date).split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <Button
                variant="cinema-ghost"
                size="icon"
                onClick={() => setSelectedDate(Math.min(6, selectedDate + 1))}
                disabled={selectedDate === 6}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Movies with Showtimes */}
          {moviesWithShowtimes.length > 0 ? (
            <div className="space-y-8">
              {moviesWithShowtimes.map(({ movie, showtimes: movieShowtimes }) => (
                <div key={movie.id} className="cinema-card p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Movie Poster */}
                    <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-32 h-48 object-cover rounded-lg shadow-card mx-auto md:mx-0 hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Movie Info & Showtimes */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <Link to={`/movie/${movie.id}`}>
                          <h2 className="font-display text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                            {movie.title}
                          </h2>
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="border-primary/50 text-primary">
                            {movie.genre}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.floor(movie.duration / 60)}h{(movie.duration % 60).toString().padStart(2, "0")}
                          </span>
                          <span>{movie.director}</span>
                        </div>
                      </div>

                      {/* Showtimes Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {movieShowtimes.map((showtime) => {
                          const room = getRoomById(showtime.roomId);
                          const occupancy = Math.round(
                            ((showtime.totalSeats - showtime.availableSeats) / showtime.totalSeats) * 100
                          );
                          const isAlmostFull = showtime.availableSeats < 20;

                          return (
                            <Link
                              key={showtime.id}
                              to={`/booking/${showtime.id}`}
                              className="group"
                            >
                              <div className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="text-2xl font-bold text-primary group-hover:scale-105 transition-transform">
                                    {showtime.time}
                                  </div>
                                  <Badge
                                    variant={room?.type === "imax" ? "default" : "outline"}
                                    className={`text-xs ${
                                      room?.type === "imax"
                                        ? "bg-primary"
                                        : room?.type === "vip"
                                        ? "border-amber-500 text-amber-500"
                                        : "border-border"
                                    }`}
                                  >
                                    {room?.type === "imax" ? "IMAX" : room?.type === "vip" ? "VIP" : "Standard"}
                                  </Badge>
                                </div>

                                <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                                  <MapPin className="w-3 h-3" />
                                  {room?.name}
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                  <span className={isAlmostFull ? "text-destructive" : "text-muted-foreground"}>
                                    {showtime.availableSeats} places
                                  </span>
                                  <span className="font-semibold text-foreground">
                                    {showtime.price.toFixed(2)} €
                                  </span>
                                </div>

                                {/* Occupancy bar */}
                                <div className="mt-2 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all ${
                                      isAlmostFull
                                        ? "bg-destructive"
                                        : "bg-gradient-to-r from-primary to-amber-600"
                                    }`}
                                    style={{ width: `${occupancy}%` }}
                                  />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 cinema-card">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Aucune séance disponible
              </h3>
              <p className="text-muted-foreground mb-4">
                Il n'y a pas de séances programmées pour cette date.
              </p>
              <Link to="/movies">
                <Button variant="cinema">Voir tous les films</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ShowtimesPage;
