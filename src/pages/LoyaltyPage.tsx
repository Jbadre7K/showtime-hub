import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Gift,
  Trophy,
  Ticket,
  Popcorn,
  Crown,
  Sparkles,
  ChevronRight,
  Clock,
} from "lucide-react";

const LoyaltyPage = () => {
  // Mock user loyalty data
  const loyaltyData = {
    points: 1250,
    level: "Or",
    nextLevel: "Platine",
    pointsToNextLevel: 750,
    totalPointsForNextLevel: 2000,
    memberSince: "2024-03-15",
    totalReservations: 18,
  };

  const levels = [
    {
      name: "Bronze",
      minPoints: 0,
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-600/20",
    },
    {
      name: "Argent",
      minPoints: 500,
      icon: Star,
      color: "text-gray-400",
      bgColor: "bg-gray-400/20",
    },
    {
      name: "Or",
      minPoints: 1000,
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/20",
    },
    {
      name: "Platine",
      minPoints: 2000,
      icon: Sparkles,
      color: "text-purple-400",
      bgColor: "bg-purple-400/20",
    },
  ];

  const rewards = [
    {
      id: 1,
      name: "Place de cinéma gratuite",
      points: 500,
      icon: Ticket,
      available: true,
    },
    {
      id: 2,
      name: "Menu Popcorn + Boisson",
      points: 300,
      icon: Popcorn,
      available: true,
    },
    {
      id: 3,
      name: "Surclassement VIP",
      points: 400,
      icon: Crown,
      available: true,
    },
    {
      id: 4,
      name: "Avant-première exclusive",
      points: 1000,
      icon: Sparkles,
      available: true,
    },
    {
      id: 5,
      name: "Coffret collector",
      points: 1500,
      icon: Gift,
      available: false,
    },
  ];

  const history = [
    {
      id: 1,
      action: "Réservation - The Last Kingdom",
      points: 100,
      date: "2025-01-20",
      type: "earned",
    },
    {
      id: 2,
      action: "Bonus inscription",
      points: 200,
      date: "2024-03-15",
      type: "earned",
    },
    {
      id: 3,
      action: "Réservation - Neon Dreams",
      points: 100,
      date: "2025-01-15",
      type: "earned",
    },
    {
      id: 4,
      action: "Menu Popcorn échangé",
      points: -300,
      date: "2025-01-10",
      type: "spent",
    },
    {
      id: 5,
      action: "Réservation - Ocean's Whisper",
      points: 100,
      date: "2025-01-05",
      type: "earned",
    },
  ];

  const currentLevel = levels.find((l) => l.name === loyaltyData.level);
  const progressPercentage =
    ((loyaltyData.points - 1000) /
      (loyaltyData.totalPointsForNextLevel - 1000)) *
    100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Programme Fidélité
            </h1>
            <p className="text-muted-foreground">
              Gagnez des points à chaque réservation et profitez de récompenses
              exclusives
            </p>
          </div>

          {/* Points Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-card to-amber-900/20 rounded-2xl p-8 border border-primary/30 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {currentLevel && (
                      <div
                        className={`w-12 h-12 rounded-full ${currentLevel.bgColor} flex items-center justify-center`}
                      >
                        <currentLevel.icon
                          className={`w-6 h-6 ${currentLevel.color}`}
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Niveau actuel
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {loyaltyData.level}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Membre depuis{" "}
                    {new Date(loyaltyData.memberSince).toLocaleDateString(
                      "fr-FR",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground mb-1">
                    Vos points
                  </p>
                  <p className="text-5xl font-display font-bold text-foreground">
                    {loyaltyData.points.toLocaleString()}
                  </p>
                  <p className="text-sm text-primary">points disponibles</p>
                </div>
              </div>

              {/* Progress to next level */}
              <div className="mt-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Progression vers {loyaltyData.nextLevel}
                  </span>
                  <span className="text-foreground font-medium">
                    {loyaltyData.pointsToNextLevel} points restants
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </div>
          </div>

          {/* Levels Overview */}
          <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              Niveaux de fidélité
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {levels.map((level) => {
                const isActive = level.name === loyaltyData.level;
                const isPassed = loyaltyData.points >= level.minPoints;
                return (
                  <div
                    key={level.name}
                    className={`relative p-4 rounded-lg border transition-all ${
                      isActive
                        ? "border-primary bg-primary/10"
                        : isPassed
                        ? "border-border/50 bg-secondary/50"
                        : "border-border/30 bg-background/50 opacity-60"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`w-10 h-10 rounded-full ${level.bgColor} flex items-center justify-center mb-2`}
                    >
                      <level.icon className={`w-5 h-5 ${level.color}`} />
                    </div>
                    <p className="font-semibold text-foreground">{level.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {level.minPoints}+ points
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="bg-card rounded-xl border border-border/50 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Récompenses disponibles
              </h2>
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {rewards.map((reward) => {
                const canRedeem =
                  reward.available && loyaltyData.points >= reward.points;
                return (
                  <div
                    key={reward.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      canRedeem
                        ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
                        : "border-border/30 bg-background/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          canRedeem ? "bg-primary/20" : "bg-secondary"
                        } flex items-center justify-center`}
                      >
                        <reward.icon
                          className={`w-5 h-5 ${
                            canRedeem ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            canRedeem ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {reward.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {reward.points} points
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={canRedeem ? "cinema" : "outline"}
                      size="sm"
                      disabled={!canRedeem}
                    >
                      {canRedeem ? "Échanger" : "Insuffisant"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Section */}
          <div className="bg-card rounded-xl border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Historique des points
              </h2>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.type === "earned" ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm text-foreground">{item.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      item.type === "earned" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.type === "earned" ? "+" : ""}
                    {item.points}
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-muted-foreground hover:text-foreground"
            >
              Voir tout l'historique
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoyaltyPage;
