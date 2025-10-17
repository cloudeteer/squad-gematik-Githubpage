import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bereit für Ihre sichere KI-Plattform?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Entdecken Sie, wie Cloudetair Chat Ihre Arbeitsweise transformiert –
            mit DSGVO-Konformität, umfassenden Features und professionellem Support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              asChild
            >
              <a href="mailto:legal@cloudeteer.de?subject=Kontaktaufnahme - Cloudetair Chat&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Cloudetair Chat erfahren und einen Termin für eine Beratung vereinbaren.%0D%0A%0D%0AMit freundlichen Grüßen">
                Kontakt aufnehmen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};