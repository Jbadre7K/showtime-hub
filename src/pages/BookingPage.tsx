import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  Calendar,
  Minus,
  Plus,
  CreditCard,
  Ticket,
  CheckCircle
} from "lucide-react";
import { showtimes, getMovieById, getRoomById } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";

const BookingPage = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const showtime = showtimes.find((s) => s.id === showtimeId);
  const movie = showtime ? getMovieById(showtime.movieId) : null;
  const room = showtime ? getRoomById(showtime.roomId) : null;
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState<"seats" | "payment" | "confirmation">("seats");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, "0")}`;
  };

  if (!showtime || !movie || !room) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Séance non trouvée
            </h1>
            <Link to="/movies">
              <Button variant="cinema">Retour aux films</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const totalPrice = quantity * showtime.price;

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStep("confirmation");
    setIsProcessing(false);
  };

  if (step === "confirmation") {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md text-center cinema-card p-8 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Réservation confirmée !
            </h1>
            <p className="text-muted-foreground mb-6">
              Vos billets ont été envoyés à votre adresse email.
            </p>

            <div className="bg-secondary rounded-lg p-4 mb-6 space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Film</span>
                <span className="font-semibold text-foreground">{movie.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground">{new Date(showtime.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heure</span>
                <span className="text-foreground">{showtime.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salle</span>
                <span className="text-foreground">{room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Places</span>
                <span className="text-foreground">{quantity}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-primary">{totalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/" className="flex-1">
                <Button variant="cinema-outline" className="w-full">
                  Accueil
                </Button>
              </Link>
              <Link to="/movies" className="flex-1">
                <Button variant="cinema" className="w-full">
                  Autres films
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to={`/movie/${movie.id}`} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 pt-8"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour au film
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Réservation
              </h1>

              {/* Movie Info */}
              <div className="cinema-card p-6 flex gap-6">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-24 h-36 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {movie.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(showtime.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {showtime.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {room.name}
                    <Badge variant="outline" className="ml-2">
                      {room.type === "imax" ? "IMAX" : room.type === "vip" ? "VIP" : "Standard"}
                    </Badge>
                  </div>
                </div>
              </div>

              {step === "seats" && (
                <div className="cinema-card p-6 space-y-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Nombre de places
                  </h3>
                  
                  <div className="flex items-center justify-center gap-6">
                    <Button
                      variant="cinema-outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    <div className="text-4xl font-bold text-primary w-16 text-center">
                      {quantity}
                    </div>
                    <Button
                      variant="cinema-outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      disabled={quantity >= 10 || quantity >= showtime.availableSeats}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    {showtime.availableSeats} places disponibles • Maximum 10 places par réservation
                  </p>

                  <Button 
                    variant="cinema" 
                    size="lg" 
                    className="w-full"
                    onClick={() => setStep("payment")}
                  >
                    Continuer vers le paiement
                  </Button>
                </div>
              )}

              {step === "payment" && (
                <div className="cinema-card p-6 space-y-6">
                  <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Informations de paiement
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Numéro de carte</Label>
                      <Input 
                        placeholder="4242 4242 4242 4242" 
                        className="bg-secondary border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date d'expiration</Label>
                        <Input 
                          placeholder="MM/AA" 
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input 
                          placeholder="123" 
                          className="bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Nom sur la carte</Label>
                      <Input 
                        placeholder="Jean Dupont" 
                        className="bg-secondary border-border"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="cinema-outline" 
                      onClick={() => setStep("seats")}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button 
                      variant="cinema" 
                      size="lg" 
                      className="flex-1"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Traitement..." : "Payer maintenant"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="cinema-card p-6 sticky top-24 space-y-4">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-primary" />
                  Récapitulatif
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prix unitaire</span>
                    <span className="text-foreground">{showtime.price.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantité</span>
                    <span className="text-foreground">x {quantity}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">{totalPrice.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
