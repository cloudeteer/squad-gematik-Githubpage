import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pb-10 overflow-x-clip">
      {/* Background with layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-950 dark:via-blue-950 dark:to-purple-950"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/80 dark:to-black/80"></div>
      
      {/* Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Button variant="tag" className="mb-6">
            🌿 European AI & Open-Core Solutions
          </Button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Olivebytes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transparente, erklärbare KI-Lösungen für EU-Souveränität, Mittelstand und öffentliche Verwaltung
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" asChild>
              <a href="#about">
                Mehr erfahren
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">
                Unsere Projekte
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};