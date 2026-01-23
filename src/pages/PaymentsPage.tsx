import Layout from "@/components/layout/Layout";
import { CreditCard, Receipt, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockPayments = [
  {
    id: "PAY-001",
    date: "2026-01-23",
    description: "Réservation - L'Odyssée des Étoiles",
    amount: 32,
    method: "Visa •••• 4242",
    status: "completed",
  },
  {
    id: "PAY-002",
    date: "2026-01-20",
    description: "Réservation - Le Dernier Souffle",
    amount: 18,
    method: "Mastercard •••• 8888",
    status: "completed",
  },
  {
    id: "PAY-003",
    date: "2026-01-10",
    description: "Réservation - Échos du Passé",
    amount: 36,
    method: "Visa •••• 4242",
    status: "completed",
  },
];

const PaymentsPage = () => {
  const totalSpent = mockPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground">
              Paiements
            </h1>
            <p className="text-muted-foreground mt-1">
              Historique de vos transactions
            </p>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-r from-primary/20 to-amber-600/20 rounded-xl p-6 border border-primary/30 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total dépensé</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {totalSpent} €
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-primary/20">
              <p className="text-sm text-muted-foreground">
                {mockPayments.length} transactions ce mois-ci
              </p>
            </div>
          </div>

          {/* Payments List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Receipt className="w-5 h-5 text-primary" />
              Transactions récentes
            </h2>

            {mockPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {payment.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>
                        {new Date(payment.date).toLocaleDateString("fr-FR")}
                      </span>
                      <span>•</span>
                      <span>{payment.method}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-foreground">
                    {payment.amount} €
                  </p>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Moyens de paiement enregistrés
            </h2>
            <div className="space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium text-foreground">•••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expire 12/27</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded">
                  Par défaut
                </span>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    MC
                  </div>
                  <div>
                    <p className="font-medium text-foreground">•••• 8888</p>
                    <p className="text-sm text-muted-foreground">Expire 08/26</p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              + Ajouter un moyen de paiement
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentsPage;
