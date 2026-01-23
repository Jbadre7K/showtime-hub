import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QrCode, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Reservation {
  id: string;
  movie: string;
  poster: string;
  date: string;
  time: string;
  room: string;
  seats: string[];
  total: number;
}

interface TicketModalProps {
  reservation: Reservation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TicketModal = ({ reservation, open, onOpenChange }: TicketModalProps) => {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-center font-display text-xl">
            Votre Billet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Movie Info */}
          <div className="text-center">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {reservation.movie}
            </h3>
            <p className="text-sm text-muted-foreground">Réf: {reservation.id}</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
              <div className="relative">
                {/* Simulated QR Code pattern */}
                <div className="grid grid-cols-8 gap-[2px]">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${
                        Math.random() > 0.5 ? "bg-black" : "bg-white"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground font-medium ml-auto">
                {new Date(reservation.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Heure:</span>
              <span className="text-foreground font-medium ml-auto">
                {reservation.time}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Salle:</span>
              <span className="text-foreground font-medium ml-auto">
                {reservation.room}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Ticket className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Places:</span>
              <span className="text-foreground font-medium ml-auto">
                {reservation.seats.join(", ")}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between items-center">
              <span className="font-semibold text-foreground">Total payé</span>
              <span className="text-xl font-bold text-primary">
                {reservation.total} €
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="cinema-outline" className="flex-1">
              Télécharger PDF
            </Button>
            <Button variant="cinema" className="flex-1">
              Envoyer par email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
