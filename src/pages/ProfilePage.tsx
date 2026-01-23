import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de Paris, 75001 Paris",
    birthDate: "1990-05-15",
  });

  const handleSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Mon Profil
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos informations personnelles
              </p>
            </div>
            <Button
              variant={isEditing ? "outline" : "cinema"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Annuler" : "Modifier"}
            </Button>
          </div>

          {/* Avatar Section */}
          <div className="bg-card rounded-xl p-6 border border-border/50 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-gold">
                <span className="text-primary-foreground font-bold text-3xl">
                  {formData.firstName.charAt(0)}
                  {formData.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-muted-foreground">{formData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/20 text-primary">
                  Client
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-xl p-6 border border-border/50 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nom
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Téléphone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Adresse
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                disabled={!isEditing}
                className="bg-background/50"
              />
            </div>

            {isEditing && (
              <Button variant="cinema" className="w-full" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
