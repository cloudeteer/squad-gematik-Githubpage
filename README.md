# Cloudetair Chat - Landing Page

Eine moderne, statische Landing Page für Cloudetair Chat, die sichere KI-Plattform der Cloudeteer GmbH.

## Über Cloudetair Chat

Cloudetair Chat ist eine DSGVO-konforme KI-Plattform mit umfassenden Funktionen für:
- Retrieval-Augmented Generation (RAG)
- Multimodale Eingaben (Speech-to-Text, Bilder, Videos)
- Integration in Microsoft Teams und Atlassian
- Prompt-Management und Wissensmanagement
- Bildgenerierung und -analyse
- Deutschsprachiger Support

Entwickelt von der **Cloudeteer GmbH**, dem spezialisierten Cloud-Only-Dienstleister aus Hamburg (ISO 27001 zertifiziert).

## Features der Website

- ✅ **Static Export**: Optimiert für GitHub Pages Deployment
- ✅ **Responsive Design**: Mobile-first mit Tailwind CSS
- ✅ **Dark/Light Mode**: Theme-Wechsel mit next-themes
- ✅ **Video-Platzhalter**: Bereiche für Schulungs- und Demo-Videos
- ✅ **SEO Optimiert**: Vollständige Meta-Tags, Sitemap, robots.txt
- ✅ **GDPR Konform**: Keine externen Fonts oder Tracker
- ✅ **Performance**: Minimales JavaScript, statische HTML-Generierung

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS mit CSS Custom Properties
- **Icons**: Lucide React
- **Theme**: next-themes für Dark/Light Mode
- **Deployment**: GitHub Pages mit Static Export

## Content-Struktur

Die Landing Page präsentiert Cloudetair Chat mit:
- **Hero Section**: Haupttitel und Call-to-Action
- **Features Section**: Alle 50+ Funktionen gem. Anforderungskatalog
- **About Section**: Cloudeteer GmbH Vorstellung
- **Video Section**: Platzhalter für Demo- und Schulungsvideos
- **CTA Section**: Kontakt und Demo-Anforderung
- **Footer**: Impressum, Datenschutz, Kontakt

## Impressum & Rechtliches

**Cloudeteer GmbH**  
Brandshofer Deich 68  
20539 Hamburg  
Deutschland

- Geschäftsführer: Marc Sundermann und Oliver Möhl
- Handelsregister: HRB 155873, Amtsgericht Hamburg
- USt-IdNr.: DE316437624
- ISO 27001 zertifiziert

## Development

```bash
# Abhängigkeiten installieren
pnpm install

# Development Server starten
pnpm dev

# Für Produktion bauen
pnpm build

# Statischen Export erstellen
pnpm export
```

## Deployment auf GitHub Pages

Die Seite ist für GitHub Pages vorkonfiguriert:

1. Code zum `main` Branch pushen
2. Gehe zu **Settings** > **Pages** > **Source**, und wähle **GitHub Actions**
3. Die Seite wird automatisch gebaut und deployed

Die Seite ist verfügbar unter: `https://<username>.github.io/website-olivebytes/`

## Implementierte Anforderungen

Die Plattform erfüllt folgende Hauptanforderungen:

### Kern-Funktionen (S1-S11)
- **S1**: RAG (Retrieval-Augmented Generation)
- **S2.1**: FAQ-Management für lizenzierte Nutzer
- **S3.1-S3.3**: Chat-Sharing, Prompt-Templates, Textvorschläge
- **S4.1-S4.2**: Speech-to-Text & Text-to-Speech
- **S5.1-S5.7**: Connectors (Teams, Atlassian, Vektordatenbanken, MCP, Datei-Uploads)
- **S6.1-S6.7**: Multimodale Features (Bilderkennung, Bildgenerierung, Video-Analyse, Übersetzung, Präsentationen)
- **S9.1-S9.3**: Admin-Funktionen (LLM-Zugriffskontrolle, CI-Integration, Daten-Aufbewahrung)
- **S10**: IDE-Integration (VS Code, IntelliJ)
- **S11.1-S11.2**: Fehlerbehandlung & eLearning-Videos

### Performance & Sicherheit
- **300.8.1**: OWASP-konforme Sicherheit
- **500.3.1**: Performance-SLA (~1s Dialog, ~40s Auswertungen)

### Support
- **800.3**: Deutschsprachiger Support (E-Mail & Telefon)
- **800.5.2**: Webbasiertes Kundenportal für Ticket-Management

## Kontakt

**Cloudeteer GmbH**  
E-Mail: legal@cloudeteer.de  
Telefon: +49 40 271644-00  
Web: https://www.cloudeteer.de

## Lizenz

© 2025 Cloudeteer GmbH. Alle Rechte vorbehalten.
- Sitemap.xml and robots.txt included
- Ready for privacy-compliant analytics (Plausible recommended)
- No tracking cookies or external requests

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## License

© 2025 Olivebytes. All rights reserved.
