import { 
  Database, 
  MessageSquare, 
  Share2, 
  Mic, 
  FileText, 
  Image, 
  Video, 
  Languages,
  Users,
  Shield,
  Zap,
  Settings
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "RAG & Wissensdatenbank",
    description: "Retrieval-Augmented Generation mit Anbindung an externe Vektordatenbanken für präzise, kontextbezogene Antworten."
  },
  {
    icon: MessageSquare,
    title: "FAQ & Chat-Management",
    description: "Zentrale Beantwortung häufiger Fragen für Mitarbeitende mit Teilen von Chats und Prompts unter Nutzern."
  },
  {
    icon: Share2,
    title: "Prompt-Vorlagen",
    description: "Zentrales Management von Prompt Templates – wiederverwendbar, versioniert und für verschiedene Nutzergruppen freigegeben."
  },
  {
    icon: Mic,
    title: "Speech-to-Text & Text-to-Speech",
    description: "Unterstützung für Spracheingabe und natürliche Sprachausgabe in mehreren Sprachen – parallel zur Textausgabe."
  },
  {
    icon: FileText,
    title: "Umfassende Datei-Uploads",
    description: "Hochladen großer Dateien: DOCX, PPTX, PDF, XLSX, CSV, XML, HTML, JSON, JPG, PNG und mehr."
  },
  {
    icon: Image,
    title: "Erweiterte Bildfunktionen",
    description: "Bilderkennung, Beschreibung von Inhalten, Bildgenerierung mit CI-konformer Gestaltung und iterative Überarbeitung."
  },
  {
    icon: Video,
    title: "Video-Analyse",
    description: "Automatische Analyse, Zusammenfassung und Transkription von Videos über YouTube-Links oder eingebettete Videos."
  },
  {
    icon: Languages,
    title: "Professionelle Übersetzung",
    description: "Übersetzung langer Texte (Deutsch/Englisch) mit präziser Kalkulation – ideal für Dokumente und Berichte."
  },
  {
    icon: Users,
    title: "Microsoft Teams & Atlassian",
    description: "Standardconnektoren für MS Teams (Kanäle, Chats) und Atlassian Data Center (JIRA, Confluence)."
  },
  {
    icon: Settings,
    title: "Model Context Protocol",
    description: "Integration des Model Context Protocol für flexible Anbindung verschiedener Datenquellen und LLMs."
  },
  {
    icon: Shield,
    title: "Admin & Compliance",
    description: "Granulare Rechteverwaltung, LLM-Zugriffskontrolle, CI-Vorgaben und einstellbare Aufbewahrungszeiten für Prompt-Daten."
  },
  {
    icon: Zap,
    title: "IDE-Integration & Support",
    description: "Erweiterungen für VS Code und IntelliJ, eLearning-Videos, sprechende Fehlermeldungen und deutschsprachiger Support."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Funktionsumfang von Cloudetair Chat
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Eine umfassende KI-Plattform, die alle Anforderungen moderner Unternehmen und Verwaltungen erfüllt
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-left p-6 rounded-lg hover:bg-accent/50 transition-colors border border-border">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Performance & Security Badges */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">~1s</div>
              <div className="text-sm text-muted-foreground">Mittlere Antwortzeit für Dialog-Eingaben</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">~40s</div>
              <div className="text-sm text-muted-foreground">Max. Antwortzeit für komplexe Auswertungen</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">OWASP</div>
              <div className="text-sm text-muted-foreground">Sicherheitsstandard-konform</div>
            </div>
          </div>
        </div>

        {/* Support Features */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Premium Support & Service
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-foreground mb-1">Deutschsprachiger Support</div>
                <div className="text-sm text-muted-foreground">E-Mail & Telefon-Support auf Deutsch</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-foreground mb-1">Webbasiertes Kundenportal</div>
                <div className="text-sm text-muted-foreground">Ticket-Verwaltung und Status-Einsicht</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-foreground mb-1">Direkter 2nd-Level-Kontakt</div>
                <div className="text-sm text-muted-foreground">Schnelle Eskalation bei Bedarf</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <div className="font-semibold text-foreground mb-1">eLearning-Videos</div>
                <div className="text-sm text-muted-foreground">Umfassende Schulungsmaterialien</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};