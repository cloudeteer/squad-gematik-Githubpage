import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bereit für transparente, erklärbare KI?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Entdecken Sie, wie Olivebytes Ihnen dabei helfen kann, KI-Lösungen zu entwickeln, 
            die sowohl leistungsstark als auch nachvollziehbar sind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              asChild
            >
              <a href="mailto:info@olivebytes.org?subject=Kontaktaufnahme mit Olivebytes&body=Guten Tag,%0D%0A%0D%0AIch würde gerne mehr über Olivebytes erfahren.%0D%0A%0D%0AMit freundlichen Grüßen">
                Kontakt aufnehmen
              </a>
            </Button>
            <Button variant="outline" size="lg">
              ASTRA kennenlernen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};