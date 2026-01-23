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
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordModal = ({ open, onOpenChange }: ChangePasswordModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (form.newPassword.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    
    setIsLoading(false);
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <Shield className="w-5 h-5 text-primary" />
            Changer le mot de passe
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Mot de passe actuel</Label>
            <div className="relative">
              <Input
                type={showPasswords.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
                className="bg-secondary border-border pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                type={showPasswords.new ? "text" : "password"}
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="bg-secondary border-border pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum 8 caractères
            </p>
          </div>

          <div className="space-y-2">
            <Label>Confirmer le nouveau mot de passe</Label>
            <div className="relative">
              <Input
                type={showPasswords.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="bg-secondary border-border pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
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
              {isLoading ? "Modification..." : "Modifier"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
