import { Shield, Globe, Code, Building } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Erklärbare KI",
    description: "KI-Systeme, deren Entscheidungswege nachvollziehbar und vertrauenswürdig sind – keine Black Boxes."
  },
  {
    icon: Globe,
    title: "EU-Souveränität", 
    description: "Datenhosting in Europa, offene Standards, keine Abhängigkeit von Big Tech-Anbietern."
  },
  {
    icon: Code,
    title: "Open-Core Produkte",
    description: "Quelloffene Kerntechnologie mit kommerziellem Support für nachhaltige Innovation."
  },
  {
    icon: Building,
    title: "Für Mittelstand & Verwaltung",
    description: "Lösungen maßgeschneidert für kleine und mittlere Unternehmen sowie öffentliche Verwaltung."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unsere Schwerpunkte
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wir schaffen transparente KI-Lösungen für eine digitale Zukunft in europäischer Hand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};