import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddPaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPaymentMethodModal = ({ open, onOpenChange }: AddPaymentMethodModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Carte ajoutée",
      description: "Votre moyen de paiement a été enregistré avec succès.",
    });
    
    setIsLoading(false);
    setForm({ cardNumber: "", expiry: "", cvv: "", name: "" });
    onOpenChange(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <CreditCard className="w-5 h-5 text-primary" />
            Ajouter une carte
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Numéro de carte</Label>
            <Input
              placeholder="4242 4242 4242 4242"
              value={form.cardNumber}
              onChange={(e) =>
                setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })
              }
              maxLength={19}
              className="bg-secondary border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date d'expiration</Label>
              <Input
                placeholder="MM/AA"
                value={form.expiry}
                onChange={(e) =>
                  setForm({ ...form, expiry: formatExpiry(e.target.value) })
                }
                maxLength={5}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input
                placeholder="123"
                value={form.cvv}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cvv: e.target.value.replace(/[^0-9]/g, "").slice(0, 4),
                  })
                }
                maxLength={4}
                type="password"
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nom sur la carte</Label>
            <Input
              placeholder="Jean Dupont"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary border-border"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="cinema-outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="cinema"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter la carte"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentMethodModal;
