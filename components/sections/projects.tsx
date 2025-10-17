import { Users, MessageCircle, Share2, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const astraFeatures = [
  {
    icon: Users,
    title: "Service Twins",
    description: "Digitale Assistenten repräsentieren Rollen in Prozessen für maximale Automatisierung."
  },
  {
    icon: MessageCircle,
    title: "RLHF",
    description: "Continuous Learning durch menschliches Feedback (Reinforcement Learning with Human Feedback)."
  },
  {
    icon: Share2,
    title: "Wissensgraph & HIL",
    description: "Wissensgraph für Kontext, Human-in-the-Loop wo nötig."
  },
  {
    icon: Layers,
    title: "Open-Core Architektur",
    description: "Modulare Open-Source-Kern, erweiterbar für individuelle Lösungen."
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Unser Hauptprojekt
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ASTRA ist unsere Plattform für rollenbasierte Service Twins, RLHF & Wissensgraphen – 
            entwickelt für MSPs, Behörden und KMU.
          </p>
        </div>

        {/* ASTRA Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              {/* ASTRA Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full mb-6">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">A</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  ASTRA
                </h3>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Automatisierung wissensintensiver Dienste
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Eine innovative Plattform, die rollenbasierte KI-Assistenten mit kontinuierlichem Lernen 
                  und strukturiertem Wissen kombiniert, um komplexe Service-Prozesse zu automatisieren.
                </p>
              </div>

              {/* ASTRA Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {astraFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Key Benefits */}
              <div className="border-t border-border pt-8 mb-8">
                <h4 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Warum ASTRA?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">EU-Souverän</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">Open</div>
                    <div className="text-sm text-muted-foreground">Source Kern</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary mb-2">KMU</div>
                    <div className="text-sm text-muted-foreground">Fokus</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group" asChild>
                  <a href="mailto:info@olivebytes.org?subject=Kontaktaufnahme mit Olivebytes - ASTRA&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über ASTRA erfahren.%0D%0A%0D%0AMit freundlichen Grüßen">
                    Mehr über ASTRA erfahren
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:info@olivebytes.org?subject=Demo-Anfrage für ASTRA&body=Guten Tag,%0D%0A%0D%0AIch würde gerne eine Demo von ASTRA anfordern.%0D%0A%0D%0AMit freundlichen Grüßen">
                    Demo anfordern
                  </a>
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Zielgruppen:</span> Managed Service Provider (MSPs), 
                  öffentliche Verwaltung, kleine und mittlere Unternehmen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ASTRA verkörpert unsere Vision von erklärbarer, europäischer KI-Technologie. 
            Open-Source im Kern, kommerziell unterstützt, und speziell für den europäischen 
            Mittelstand entwickelt.
          </p>
        </div>
      </div>
    </section>
  );
};