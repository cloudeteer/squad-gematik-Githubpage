import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pb-10 overflow-x-clip">
      {/* Background with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/80 dark:to-black/80"></div>
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Button variant="tag" className="mb-6">
            ☁️ Powered by Cloudeteer GmbH
          </Button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cloudetair Chat
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Die sichere, intelligente KI-Plattform für Ihr Unternehmen – DSGVO-konform, leistungsstark und einfach zu bedienen
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <a href="#features">
                Funktionen entdecken
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#about">
                Mehr erfahren
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};