import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Ticket, Calendar, Clock, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import TicketModal from "@/components/modals/TicketModal";

const mockReservations = [
  {
    id: "RES-001",
    movie: "L'Odyssée des Étoiles",
    poster: "/src/assets/movies/movie-1.jpg",
    date: "2026-01-25",
    time: "20:30",
    room: "Salle IMAX 1",
    seats: ["F12", "F13"],
    total: 32,
    status: "confirmed",
  },
  {
    id: "RES-002",
    movie: "Le Dernier Souffle",
    poster: "/src/assets/movies/movie-2.jpg",
    date: "2026-01-28",
    time: "18:00",
    room: "Salle VIP 2",
    seats: ["C5"],
    total: 18,
    status: "confirmed",
  },
  {
    id: "RES-003",
    movie: "Échos du Passé",
    poster: "/src/assets/movies/movie-3.jpg",
    date: "2026-01-15",
    time: "21:00",
    room: "Salle Standard 3",
    seats: ["H8", "H9", "H10"],
    total: 36,
    status: "past",
  },
];

type Reservation = (typeof mockReservations)[0];

const ReservationsPage = () => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  const upcomingReservations = mockReservations.filter(
    (r) => r.status === "confirmed"
  );
  const pastReservations = mockReservations.filter((r) => r.status === "past");

  const handleViewTicket = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setTicketModalOpen(true);
  };

  const ReservationCard = ({
    reservation,
    isPast = false,
  }: {
    reservation: Reservation;
    isPast?: boolean;
  }) => (
    <div
      className={`bg-card rounded-xl border border-border/50 overflow-hidden ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="w-full md:w-32 h-40 md:h-auto flex-shrink-0">
          <img
            src={reservation.poster}
            alt={reservation.movie}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {reservation.movie}
              </h3>
              <p className="text-sm text-muted-foreground">
                Réf: {reservation.id}
              </p>
            </div>
            {!isPast && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                Confirmé
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(reservation.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              {reservation.time}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              {reservation.room}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Ticket className="w-4 h-4 text-primary" />
              {reservation.seats.join(", ")}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-semibold text-primary">{reservation.total} €</p>
            {!isPast && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleViewTicket(reservation)}
              >
                <QrCode className="w-4 h-4" />
                Voir le billet
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Mes Réservations
            </h1>
            <p className="text-muted-foreground mt-1">
              Consultez vos billets et historique
            </p>
          </div>

          {/* Upcoming */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              Réservations à venir
            </h2>
            {upcomingReservations.length > 0 ? (
              <div className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Aucune réservation à venir
                </p>
              </div>
            )}
          </div>

          {/* Past */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              Historique
            </h2>
            {pastReservations.length > 0 ? (
              <div className="space-y-4">
                {pastReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    isPast
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Aucun historique
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      <TicketModal
        reservation={selectedReservation}
        open={ticketModalOpen}
        onOpenChange={setTicketModalOpen}
      />
    </Layout>
  );
};

export default ReservationsPage;
