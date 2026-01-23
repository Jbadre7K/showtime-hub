import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Moon,
  Globe,
  Shield,
  Trash2,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import ConfirmActionModal from "@/components/modals/ConfirmActionModal";

const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    language: "fr",
    twoFactor: false,
  });

  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [logoutAllModalOpen, setLogoutAllModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Paramètre mis à jour",
      description: "Vos préférences ont été enregistrées.",
    });
  };

  const handleLogoutAll = () => {
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté de tous les appareils.",
    });
    setLogoutAllModalOpen(false);
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé définitivement.",
      variant: "destructive",
    });
    setDeleteAccountModalOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Paramètres
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos préférences et votre compte
            </p>
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-xl p-6 border border-border/50 mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Notifications email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des emails pour vos réservations
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle("emailNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Rappels avant vos séances
                  </p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle("pushNotifications")}
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-card rounded-xl p-6 border border-border/50 mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-primary" />
              Apparence
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">
                  Utiliser le thème sombre
                </p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle("darkMode")}
              />
            </div>
          </div>

          {/* Language */}
          <div className="bg-card rounded-xl p-6 border border-border/50 mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-primary" />
              Langue
            </h2>
            <div className="flex gap-3">
              <Button
                variant={settings.language === "fr" ? "cinema" : "outline"}
                onClick={() => setSettings({ ...settings, language: "fr" })}
              >
                🇫🇷 Français
              </Button>
              <Button
                variant={settings.language === "en" ? "cinema" : "outline"}
                onClick={() => setSettings({ ...settings, language: "en" })}
              >
                🇬🇧 English
              </Button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-xl p-6 border border-border/50 mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              Sécurité
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">
                    Authentification à deux facteurs
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={() => handleToggle("twoFactor")}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setPasswordModalOpen(true)}
              >
                Changer le mot de passe
              </Button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card rounded-xl p-6 border border-destructive/30 mb-6">
            <h2 className="text-lg font-semibold text-destructive flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5" />
              Zone de danger
            </h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-foreground hover:text-destructive hover:border-destructive"
                onClick={() => setLogoutAllModalOpen(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter de tous les appareils
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive border-destructive/50 hover:bg-destructive/10"
                onClick={() => setDeleteAccountModalOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer mon compte
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={passwordModalOpen}
        onOpenChange={setPasswordModalOpen}
      />

      {/* Logout All Modal */}
      <ConfirmActionModal
        open={logoutAllModalOpen}
        onOpenChange={setLogoutAllModalOpen}
        title="Se déconnecter de tous les appareils"
        description="Vous serez déconnecté de tous vos appareils, y compris celui-ci. Vous devrez vous reconnecter."
        confirmLabel="Se déconnecter"
        onConfirm={handleLogoutAll}
      />

      {/* Delete Account Modal */}
      <ConfirmActionModal
        open={deleteAccountModalOpen}
        onOpenChange={setDeleteAccountModalOpen}
        title="Supprimer mon compte"
        description="Cette action est irréversible. Toutes vos données, réservations et historique seront définitivement supprimés."
        confirmLabel="Supprimer définitivement"
        variant="destructive"
        onConfirm={handleDeleteAccount}
      />
    </Layout>
  );
};

export default SettingsPage;
