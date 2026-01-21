import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-gold mx-auto mb-8">
          <Film className="w-10 h-10 text-primary-foreground" />
        </div>

        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
          Page non trouvée
        </h2>
        <p className="text-muted-foreground mb-8">
          Oups ! La page que vous recherchez semble avoir disparu dans l'obscurité de la salle de cinéma.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="cinema" size="lg">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/movies">
            <Button variant="cinema-outline" size="lg">
              <Film className="w-5 h-5" />
              Voir les films
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
