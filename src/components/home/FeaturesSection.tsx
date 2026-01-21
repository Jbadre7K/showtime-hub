import { Ticket, Armchair, Popcorn, CreditCard } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Réservation simple",
    description: "Réservez vos places en quelques clics. Choisissez votre film, votre séance et vos sièges préférés.",
  },
  {
    icon: Armchair,
    title: "Confort premium",
    description: "Nos fauteuils inclinables en cuir vous offrent une expérience de visionnage incomparable.",
  },
  {
    icon: Popcorn,
    title: "Snacks gourmets",
    description: "Du popcorn artisanal aux cocktails signature, savourez nos délices pendant votre film.",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description: "Transactions 100% sécurisées. Carte bancaire, PayPal ou Apple Pay acceptés.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Pourquoi <span className="text-gradient-gold">CinéLuxe</span> ?
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Une expérience cinématographique pensée pour votre confort
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
