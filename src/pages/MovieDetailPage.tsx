import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  Star, 
  User, 
  Film, 
  ChevronLeft,
  MapPin,
  Ticket 
} from "lucide-react";
import { getMovieById, getShowtimesByMovieId, getRoomById } from "@/data/movies";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || "");
  const showtimes = getShowtimesByMovieId(id || "");

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, "0")}`;
  };

  if (!movie) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Film non trouvé
            </h1>
            <Link to="/movies">
              <Button variant="cinema">Retour aux films</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Group showtimes by date
  const showtimesByDate = showtimes.reduce((acc, showtime) => {
    if (!acc[showtime.date]) {
      acc[showtime.date] = [];
    }
    acc[showtime.date].push(showtime);
    return acc;
  }, {} as Record<string, typeof showtimes>);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-end">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link to="/movies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="w-5 h-5" />
            Retour aux films
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-xl shadow-card border border-border"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  {movie.isNowShowing && (
                    <Badge className="bg-primary text-primary-foreground">À l'affiche</Badge>
                  )}
                  {movie.isComingSoon && (
                    <Badge className="bg-destructive text-destructive-foreground">Prochainement</Badge>
                  )}
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    {movie.genre}
                  </Badge>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  {movie.title}
                </h1>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span className="font-semibold text-foreground">{movie.rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(movie.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{movie.director}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {movie.synopsis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          <Ticket className="inline w-6 h-6 mr-2 text-primary" />
          Séances disponibles
        </h2>

        {movie.isNowShowing ? (
          <div className="space-y-8">
            {Object.entries(showtimesByDate).map(([date, dateShowtimes]) => (
              <div key={date} className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dateShowtimes.map((showtime) => {
                    const room = getRoomById(showtime.roomId);
                    const occupancy = ((showtime.totalSeats - showtime.availableSeats) / showtime.totalSeats) * 100;
                    
                    return (
                      <div
                        key={showtime.id}
                        className="cinema-card p-4 flex flex-col gap-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-2xl font-bold text-primary">{showtime.time}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {room?.name}
                            </div>
                          </div>
                          <Badge 
                            variant={room?.type === "imax" ? "default" : "outline"}
                            className={room?.type === "imax" ? "bg-primary" : "border-border"}
                          >
                            {room?.type === "imax" ? "IMAX" : room?.type === "vip" ? "VIP" : "Standard"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{showtime.availableSeats} places disponibles</span>
                            <span className="font-semibold text-foreground">{showtime.price.toFixed(2)} €</span>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-amber-600 transition-all duration-300"
                              style={{ width: `${occupancy}%` }}
                            />
                          </div>
                        </div>

                        <Link to={`/booking/${showtime.id}`}>
                          <Button variant="cinema" className="w-full">
                            Réserver
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 cinema-card">
            <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Film à venir
            </h3>
            <p className="text-muted-foreground mb-4">
              Les séances seront disponibles à partir du {new Date(movie.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}.
            </p>
            <Button variant="cinema-outline">
              M'alerter de la sortie
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MovieDetailPage;
