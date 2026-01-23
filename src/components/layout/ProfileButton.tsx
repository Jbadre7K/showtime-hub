import { User, Settings, Ticket, LogOut, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProfileButtonProps {
  user?: {
    name: string;
    email: string;
    role: "admin" | "cashier" | "client";
    avatar?: string;
  };
}

const ProfileButton = ({ user }: ProfileButtonProps) => {
  // Mock user for demo - replace with real auth
  const mockUser = user || {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    role: "client" as const,
    avatar: undefined,
  };

  const roleLabels = {
    admin: "Administrateur",
    cashier: "Caissier",
    client: "Client",
  };

  const menuItems = [
    { icon: User, label: "Mon profil", href: "/profile" },
    { icon: Ticket, label: "Mes réservations", href: "/reservations" },
    { icon: CreditCard, label: "Paiements", href: "/payments" },
    { icon: Settings, label: "Paramètres", href: "/settings" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="cinema-ghost"
          size="icon"
          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary transition-colors"
        >
          {mockUser.avatar ? (
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">
                {mockUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72 p-0 bg-card border-border/50 shadow-xl"
      >
        {/* Header with user info */}
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50">
              {mockUser.avatar ? (
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {mockUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {mockUser.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {mockUser.email}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
                {roleLabels[mockUser.role]}
              </span>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-2">
          {menuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-accent/50 hover:text-primary rounded-lg transition-colors">
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="p-2 border-t border-border/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;
