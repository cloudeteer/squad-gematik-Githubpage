import { Play, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    title: "Cloudetair Chat – Einführung und Überblick",
    description: "Lernen Sie die Hauptfunktionen von Cloudetair Chat kennen und erfahren Sie, wie die Plattform Ihren Arbeitsalltag erleichtert.",
    duration: "3:45"
  },
  {
    title: "RAG & Wissensgraphen in der Praxis",
    description: "Sehen Sie, wie Retrieval-Augmented Generation mit externen Vektordatenbanken Ihre Antworten präziser macht.",
    duration: "5:20"
  },
  {
    title: "Multimodale Eingaben – Speech, Text & Bilder",
    description: "Entdecken Sie die Möglichkeiten von Speech-to-Text, Bilderkennung und Bildgenerierung in einer Demo.",
    duration: "4:15"
  },
  {
    title: "Integration in Microsoft Teams & Atlassian",
    description: "Erfahren Sie, wie Cloudetair Chat nahtlos mit Ihren bestehenden Tools zusammenarbeitet.",
    duration: "6:30"
  }
];

export const ProjectsSection = () => {
  return (
    <section id="videos" className="py-20 bg-secondary/20">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cloudetair Chat in Aktion
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sehen Sie in unseren Videos, wie Cloudetair Chat Ihre Arbeitsweise transformiert – 
            von der ersten Einrichtung bis zu fortgeschrittenen Features.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div key={index} className="bg-background rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-blue-600 dark:text-blue-400 ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                  {video.duration}
                </div>
                <VideoIcon className="w-32 h-32 text-blue-200 dark:text-blue-800 opacity-30" />
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {video.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Möchten Sie eine Live-Demo sehen?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vereinbaren Sie einen Termin mit unserem Team und erleben Sie Cloudetair Chat 
              in einer persönlichen Demo-Session, zugeschnitten auf Ihre Anforderungen.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <a href="mailto:legal@cloudeteer.de?subject=Demo-Anfrage für Cloudetair Chat&body=Guten Tag,%0D%0A%0D%0AIch würde gerne eine persönliche Demo von Cloudetair Chat vereinbaren.%0D%0A%0D%0AMit freundlichen Grüßen">
                Live-Demo anfragen
              </a>
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Weitere Schulungsvideos und Tutorials finden Sie nach dem Login in unserem integrierten Hilfeportal.
          </p>
        </div>
      </div>
    </section>
  );
};