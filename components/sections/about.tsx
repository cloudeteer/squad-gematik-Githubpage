import { Cloud, Shield, Zap, Award } from "lucide-react";

const aboutItems = [
  {
    icon: Cloud,
    title: "Cloud Expertise",
    description: "Die Cloudeteer GmbH ist Ihr spezialisierter Cloud-Dienstleister mit umfassender Expertise in modernen Cloud-Architekturen und KI-Lösungen."
  },
  {
    icon: Shield,
    title: "Sicher & ISO-zertifiziert",
    description: "Wir sind nach ISO 27001 für Informationssicherheit zertifiziert und setzen höchste Standards im Umgang mit Ihren Daten um."
  },
  {
    icon: Zap,
    title: "Effizient & Agil",
    description: "Mit langjähriger Erfahrung im Betrieb hochverfügbarer Systeme implementieren wir Ihre individuelle KI-Plattform schnell und zuverlässig."
  },
  {
    icon: Award,
    title: "Trusted Advisor",
    description: "Als langfristiger Partner auf Augenhöhe entwickeln wir uns am Puls des Cloud-Marktes kontinuierlich weiter."
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Über Cloudetair Chat
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Cloudetair Chat ist die sichere, DSGVO-konforme KI-Plattform der Cloudeteer GmbH. 
              Mit umfassenden Funktionen für Retrieval-Augmented Generation, multimodalen Eingaben 
              und nahtloser Integration in Ihre bestehende IT-Infrastruktur.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Von FAQ-Management bis zur Bildgenerierung, von Speech-to-Text bis zur Video-Analyse – 
              Cloudetair Chat vereint alle modernen KI-Funktionen in einer benutzerfreundlichen Plattform.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Warum Cloudeteer?
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Die Cloudeteer GmbH ist Ihr spezialisierter Cloud-Only-Dienstleister mit Sitz in Hamburg. 
                  Wir entwickeln uns am rasenden Puls des Cloud-Marktes kontinuierlich weiter und greifen 
                  neue Technologien und Lösungen auf.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Kundenprojekte betrachten wir wie interne Projekte – sie haben höchste Priorität. 
                  Wir arbeiten mit Begeisterung mit unseren Kunden zusammen und setzen deren Wünsche an erste Stelle.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-8">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Unsere Werte
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Customer First – Ihre Projekte sind unsere Priorität
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  Agile Herangehensweise für schnelle Transformation
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Herstellerunabhängige, ergebnis-offene Beratung
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  Höchste Sicherheits- und Qualitätsstandards (ISO 27001)
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Langfristige Partnerschaft auf Augenhöhe
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-background rounded-xl p-6 shadow-sm">
            <div className="text-sm text-muted-foreground mb-2">
              Eine Lösung der
            </div>
            <div className="text-2xl font-bold text-foreground mb-2">
              Cloudeteer GmbH
            </div>
            <div className="text-sm text-muted-foreground">
              Brandshofer Deich 68 • 20539 Hamburg<br />
              ISO 27001 zertifiziert
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
