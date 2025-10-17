"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ImpressumPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto font-normal">
          Impressum
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="center">
        <ScrollArea className="h-96 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Impressum</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Angaben gemäß § 5 TMG</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  CLOUDETEER GmbH<br />
                  Brandshofer Deich 68<br />
                  20539 Hamburg<br />
                  Deutschland
                </p>
              </div>

              <div>
                <h4 className="font-medium">Vertreten durch</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Geschäftsführer: Marc Sundermann und Oliver Möhl
                </p>
              </div>

              <div>
                <h4 className="font-medium">Kontakt</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Telefon: +49 40 271644-00<br />
                  E-Mail: legal[at]cloudeteer.de
                </p>
              </div>

              <div>
                <h4 className="font-medium">Registereintrag</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Eintragung im Handelsregister<br />
                  Registergericht: Amtsgericht Hamburg<br />
                  Registernummer: HRB 155873
                </p>
              </div>

              <div>
                <h4 className="font-medium">Umsatzsteuer-ID</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:<br />
                  DE316437624
                </p>
              </div>

              <div>
                <h4 className="font-medium">Haftung für Inhalte</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Haftung für Links</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Urheberrecht</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Streitschlichtung</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                  <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    http://ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export function DatenschutzPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto font-normal">
          Datenschutz
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="center">
        <ScrollArea className="h-96 p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Datenschutzerklärung</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">1. Datenschutz auf einen Blick</h4>
                <h5 className="font-medium text-sm mt-2">Allgemeine Hinweise</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                  persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h4 className="font-medium">2. Verantwortliche Stelle</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                  CLOUDETEER GmbH<br />
                  Marc Sundermann und Oliver Möhl<br />
                  Brandshofer Deich 68<br />
                  20539 Hamburg<br />
                  Deutschland<br />
                  E-Mail: legal[at]cloudeteer.de<br />
                  Telefon: +49 40 271644-00
                </p>
              </div>

              <div>
                <h4 className="font-medium">3. Datenerfassung auf dieser Website</h4>
                <h5 className="font-medium text-sm mt-2">Server-Log-Dateien</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="text-sm text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Daten werden auf Grundlage von 
                  Art. 6 Abs. 1 lit. f DSGVO erhoben.
                </p>
              </div>

              <div>
                <h4 className="font-medium">4. Ihre Rechte</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, 
                  deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder 
                  Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit 
                  unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
                
                <h5 className="font-medium text-sm mt-2">Recht auf Datenübertragbarkeit</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags 
                  automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format 
                  aushändigen zu lassen.
                </p>

                <h5 className="font-medium text-sm mt-2">Widerspruch gegen Datenerfassung</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Wenn Ihre Daten auf Grundlage von berechtigten Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO verarbeitet 
                  werden, haben Sie das Recht, Widerspruch gegen die Verarbeitung einzulegen.
                </p>
              </div>

              <div>
                <h4 className="font-medium">5. SSL- bzw. TLS-Verschlüsselung</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
                  SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile 
                  des Browsers von "http://" auf "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>

              <div>
                <h4 className="font-medium">6. Kontaktaufnahme</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Bei der Kontaktaufnahme mit uns (z.B. per E-Mail) werden die von Ihnen mitgeteilten Daten von uns 
                  gespeichert, um Ihre Fragen zu bearbeiten und für den Fall von Anschlussfragen. Diese Daten geben wir 
                  nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h4 className="font-medium">7. Änderung der Datenschutzbestimmungen</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
                  Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Stand: Januar 2025
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}