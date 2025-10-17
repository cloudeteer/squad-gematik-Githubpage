import { DatenschutzPopover, ImpressumPopover } from "./legal-popovers";

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-gray-200 dark:border-gray-700">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Olivebytes
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Europäische Projektgesellschaft für erklärbare KI-Systeme und Open-Core-Produkte.
              Wir schaffen transparente Lösungen für eine digitale Zukunft in europäischer Hand.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Unternehmen</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projekte
                </a>
              </li>
              <li>
                <a href="#astra" className="text-muted-foreground hover:text-foreground transition-colors">
                  ASTRA Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <DatenschutzPopover />
              </li>
              <li>
                <ImpressumPopover />
              </li>
              <li>
                <a href="mailto:info@olivebytes.org?subject=Kontaktaufnahme mit Olivebytes&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Olivebytes erfahren.%0D%0A%0D%0AMit freundlichen Grüßen" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Olivebytes. Alle Rechte vorbehalten.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Made with 🌿 in Europe
          </p>
        </div>
      </div>
    </footer>
  );
};