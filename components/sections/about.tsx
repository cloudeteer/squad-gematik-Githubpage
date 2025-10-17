import { Users, Target, Lightbulb, Award } from "lucide-react";

const aboutItems = [
  {
    icon: Target,
    title: "Unsere Mission",
    description: "Wir entwickeln transparente KI-Lösungen, die Vertrauen schaffen und europäische Werte widerspiegeln – für eine digitale Souveränität, die Menschen und Institutionen stärkt."
  },
  {
    icon: Lightbulb,
    title: "Innovation & Expertise",
    description: "Als europäische Projektgesellschaft verbinden wir modernste KI-Forschung mit praktischen Anwendungen für Mittelstand und öffentliche Verwaltung."
  },
  {
    icon: Users,
    title: "Partnerschaftlich",
    description: "Wir arbeiten eng mit Forschungsinstitutionen, Unternehmen und Behörden zusammen, um nachhaltige und ethische KI-Lösungen zu entwickeln."
  },
  {
    icon: Award,
    title: "Qualität & Vertrauen",
    description: "Unsere Open-Core-Philosophie gewährleistet Transparenz, während professioneller Support und Wartung höchste Qualitätsstandards sicherstellen."
  }
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Über Olivebytes
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Olivebytes ist eine europäische Projektgesellschaft für erklärbare Künstliche Intelligenz. 
              Wir schaffen transparente, vertrauensvolle KI-Systeme, die europäische Werte und Standards respektieren.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Unser Fokus liegt auf Open-Core-Technologien, die sowohl innovative Forschung als auch 
              praktische Anwendungen ermöglichen – maßgeschneidert für den Mittelstand und die öffentliche Verwaltung.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {aboutItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-background rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
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

        {/* Additional company info */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Warum Olivebytes?
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  In einer Zeit, in der KI-Systeme oft als unverständliche "Black Boxes" 
                  entwickelt werden, setzen wir auf Transparenz und Erklärbarkeit. Unsere 
                  Lösungen basieren auf Open-Source-Prinzipien und europäischen Datenschutzstandards.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wir glauben daran, dass vertrauensvolle KI-Systeme nur entstehen können, 
                  wenn Menschen verstehen, wie diese Systeme funktionieren und Entscheidungen treffen.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/50 dark:to-blue-950/50 rounded-xl p-8">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Unsere Kernprinzipien
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Transparenz und Erklärbarkeit in allen KI-Systemen
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  EU-konforme Datenverarbeitung und -speicherung
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Open-Core-Philosophie für nachhaltige Innovation
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  Partnerschaftliche Zusammenarbeit mit Kunden
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};