import { DatenschutzPopover, ImpressumPopover } from "./legal-popovers";

export const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-gray-200 dark:border-gray-700">
      <div className="container px-4 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cloudetair Chat
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Die sichere, DSGVO-konforme KI-Plattform der Cloudeteer GmbH für moderne Unternehmen und Verwaltungen.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Cloudeteer GmbH</p>
              <p>Brandshofer Deich 68</p>
              <p>20539 Hamburg</p>
              <p className="mt-2">ISO 27001 zertifiziert</p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Produkt</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Funktionen
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#videos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Videos & Demos
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              <li>
                <ImpressumPopover />
              </li>
              <li>
                <DatenschutzPopover />
              </li>
              <li>
                <a href="mailto:legal@cloudeteer.de?subject=Kontaktaufnahme - Cloudetair Chat&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Cloudetair Chat erfahren.%0D%0A%0D%0AMit freundlichen Grüßen" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="https://www.cloudeteer.de" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cloudeteer.de
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Cloudeteer GmbH. Alle Rechte vorbehalten.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Made with ☁️ in Hamburg
          </p>
        </div>
      </div>
    </footer>
  );
};