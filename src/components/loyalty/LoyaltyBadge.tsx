import { Crown, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface LoyaltyBadgeProps {
  points: number;
  level: string;
  compact?: boolean;
}

const LoyaltyBadge = ({ points, level, compact = false }: LoyaltyBadgeProps) => {
  const getLevelIcon = () => {
    switch (level) {
      case "Platine":
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case "Or":
        return <Crown className="w-4 h-4 text-primary" />;
      case "Argent":
        return <Star className="w-4 h-4 text-gray-400" />;
      default:
        return <Star className="w-4 h-4 text-amber-600" />;
    }
  };

  const getLevelColor = () => {
    switch (level) {
      case "Platine":
        return "from-purple-500/20 to-purple-900/20 border-purple-500/30";
      case "Or":
        return "from-primary/20 to-amber-900/20 border-primary/30";
      case "Argent":
        return "from-gray-400/20 to-gray-600/20 border-gray-400/30";
      default:
        return "from-amber-600/20 to-amber-900/20 border-amber-600/30";
    }
  };

  if (compact) {
    return (
      <Link
        to="/loyalty"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getLevelColor()} border transition-all hover:scale-105`}
      >
        {getLevelIcon()}
        <span className="text-sm font-semibold text-foreground">
          {points.toLocaleString()} pts
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/loyalty"
      className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${getLevelColor()} border transition-all hover:scale-[1.02]`}
    >
      <div className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center">
        {getLevelIcon()}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Niveau {level}</p>
        <p className="text-lg font-bold text-foreground">
          {points.toLocaleString()} points
        </p>
      </div>
    </Link>
  );
};

export default LoyaltyBadge;
