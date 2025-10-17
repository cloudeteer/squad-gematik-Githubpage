# Technische und gestalterische Konzeption für cloudeteer-chat & ASTRA Landing Pages

## 1. Monorepo vs. Multi-Repo Strategie

**Vergleich:** Für die zwei Landing Pages (cloudeteer-chat und ASTRA) gibt es zwei grundlegende Strategien: ein Monorepo (gemeinsames Repository) oder getrennte Repositories (Multi-Repo). Die folgende Tabelle vergleicht beide Ansätze:

| **Kriterium**              | **Monorepo (gemeinsam)**                                      | **Multi-Repo (getrennt)**                                |
|---------------------------|---------------------------------------------------------------|----------------------------------------------------------|
| **Code-/UI-Sharing**      | Einfaches Teilen von Komponenten, Design-System und Konfiguration zwischen beiden Seiten. Keine Duplikation von Code. | Komponenten/Design müssen dupliziert oder in ein drittes gemeinsames Paket ausgelagert werden. Pflege von Konsistenz aufwändiger. |
| **Entwicklungs-Workflow** | Einheitliche Umgebung: einrichten, linten, testen in einem Rutsch. Änderungen am gemeinsamen Design wirken sofort auf beide Seiten. Nutzung von Workspaces (z.B. npm oder Turborepo) möglich für modulare Struktur. | Separater Entwicklungsaufwand pro Projekt. Änderungen am Design-System erfordern Synchronisation in beiden Repos (Gefahr von Abweichungen). |
| **Deployment**            | Komplexer: Ein Repository müsste zwei statische Sites ausliefern. Möglich via zwei **GitHub Pages** Branches oder durch Deployment eines Teilprojekts auf externes Repo. Erfordert sorgfältige CI/CD-Konfiguration. | Einfacher: Jedes Repo deployt eigenständig auf GitHub Pages mit eigenem Custom Domain Setup. Standard-Pipeline pro Projekt möglich. |
| **Domains**               | Schwieriger: Ein Repo kann nur einen Pages-Custom-Domain-Eintrag haben. Lösung: z.B. eine Site über `gh-pages` Branch und die zweite über ein *ausgelagertes* Subtree-Repo deployen. | Klar getrennt: cloudeteer-chat.org und astra.cloudeteer-chat.org sind jeweils einem Repo zugeordnet, mit jeweils eigenem Pages-Setup und Custom Domain. |
| **Wartung & Skalierung**  | Zentralisierung: nur ein Repo updaten (z.B. Dependency-Updates, CI-Config). Aber evtl. etwas größere Komplexität im Repo (zwei App-Pakete verwalten). | Isolierung: Änderungen an einer Seite betreffen die andere nicht. Allerdings doppelter Pflegeaufwand (z.B. Abhängigkeiten aktualisieren, CI pflegen in beiden Repos). |

**Empfehlung:** Aufgrund der starken Gemeinsamkeiten (Design, Komponenten, Technologie) ist ein **Monorepo mit zwei Next.js-Projekten** sinnvoll, um Duplikation zu vermeiden und ein konsistentes Erscheinungsbild sicherzustellen. Die Monorepo-Strategie erlaubt es, ein zentrales UI-/Design-System zu definieren, das beide Sites nutzen. Für das Deployment kann dennoch eine getrennte Ausspielung konfiguriert werden (siehe Abschnitt 5). Falls das Deployment zu kompliziert würde, wäre als Alternative ein *Multi-Repo mit gemeinsamem UI-Package* denkbar, jedoch erhöht dies die Komplexität in der Synchronisierung.

**Ordnerstruktur-Vorschlag (Monorepo):** Wir richten im Repository z.B. einen Yarn/NPM-Workspace oder Turborepo ein. Die Struktur könnte folgendermaßen aussehen:

```plaintext
repository-root/
├── package.json (Workspaces für apps/* und packages/*, gemeinsame Dev-Dependencies)
├── apps/
│   ├── cloudeteer-chat-site/
│   │   ├── next.config.mjs
│   │   ├── public/      (statische Assets, z.B. CNAME, Bilder, Fonts)
│   │   ├── src/         (App-Router Pages, Components, etc. für cloudeteer-chat)
│   │   └── ...          
│   └── astra-site/
│       ├── next.config.mjs
│       ├── public/      (CNAME für astra Subdomain, eigene Assets falls nötig)
│       ├── src/         (App-Router Pages, Components, etc. für ASTRA)
│       └── ...
└── packages/
    ├── ui/              (gemeinsames Design System, z.B. Komponenten, Tailwind-Konfig, Hooks)
    └── ...              (weitere gemeinsame Pakete, z.B. translations, content-Modelle)
```

In dieser Struktur befinden sich zwei Next.js Apps unter `apps/`, die beide auf Next.js 15 basieren und via App Router ihre Seiten generieren. Unter `packages/ui` kann das extrahierte UI-System (Farben, Buttons, Layout-Komponenten etc.) liegen, das per Import in beiden Apps genutzt wird. Beide Apps können ihre jeweils spezifischen Inhalte und Konfigurationen haben (z.B. ASTRA hat evtl. andere Seiten als cloudeteer-chat), greifen aber auf das gemeinsame UI und evtl. gemeinsame Utility-Funktionen zurück.

## 2. Next.js Konfiguration für SSG/Export

Beide Landing Pages sollen **statisch generiert** und als reine HTML/JS/CSS ohne Server ausgeliefert werden. Hierfür nutzen wir in Next.js den **App Router** (verfügbar ab Next 13+) und aktivieren das Static-HTML-Export-Feature.

### `next.config.mjs` Einstellungen

In der Next.js Konfiguration setzen wir `output: 'export'`, damit Next beim Build einen statischen Export erzeugt (ähnlich dem früheren `next export`). Außerdem müssen wir Next.js mitteilen, dass wir keine Image-Optimierungen serverseitig benötigen und ggf. andere Einschränkungen von static export beachten:

```js
// apps/cloudeteer-chat-site/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // Statischer Export (SSG)
  images: {
    unoptimized: true      // Next/Image ohne Optimierung nutzen (für static export) 
  },
  // Optional: Basis-Pfad setzen, falls das Projekt nicht auf Domain-Root liegt.
  // basePath: process.env.SITE === 'astra' ? '/astra' : '/',
  // (Für astra.cloudeteer-chat.org vermutlich nicht nötig, da eigene Domain)
};
export default nextConfig;
```

Erläuterungen:
- **`output: 'export'`:** Aktiviert den static HTML Export. Dadurch werden beim Build in einem `out/` Ordner HTML-Dateien generiert. Wichtig: Viele dynamische Features (z.B. `getServerSideProps`) sind damit deaktiviert. 
- **Images:** Next.js’ `<Image>` Komponente würde normalerweise optimierte Bilder via Image-Proxy laden, was ohne Server nicht geht. Durch `images.unoptimized: true` umgehen wir das und Next.js nutzt `<img>` Tags ohne weitere Verarbeitung. Alternativ können wir für statische Inhalte auch direkt `<img>` verwenden oder Bilder in `public/` ablegen.
- **Keine i18n im Config:** Next.js erlaubt nicht, die integrierte i18n-Routing-Funktion zusammen mit static export zu nutzen – ein Config-Eintrag `i18n: { locales: [...] }` führt zu einem Build-Error *"Specified \"i18n\" cannot be used with \"output: export\""*. Daher **verzichten wir auf `i18n` in next.config** und lösen Mehrsprachigkeit via Routen (siehe unten).
- **Weitere Optionen:** Bei Bedarf könnten wir `trailingSlash: true` setzen, damit Next alle Links als Ordner ausgibt (z.B. `/en/about/index.html` statt `/en/about.html`). Für GitHub Pages ist das meist nicht nötig, solange man pfleglich mit Pfaden umgeht.

### Sprachrouting und i18n-Lösung

Wir benötigen mindestens Deutsch (DE) und Englisch (EN) als Sprachen. Da die built-in i18n-Funktion nicht mit static export funktioniert, verwenden wir **Sub-Path Routing**: Jede Sprache erhält einen eigenen URL-Pfad (z.B. `/de/...` und `/en/...`). Dies lässt sich im **App Router** über einen dynamischen Segment-Ordner `[locale]` umsetzen:

**Struktur in `src/app` (Beispiel für cloudeteer-chat-Seite):**

```
src/app/
├── [locale]/
│   ├── page.tsx            // Leitet ggf. um oder rendert Language Index
│   ├── layout.tsx          // Layout für sprachspezifische Seiten
│   └── ...weitere Seiten...
├── page.tsx                // Root: leitet auf default locale um
└── layout.tsx              // Root-Layout
```

- Die `app/page.tsx` im Root kann per `redirect()` sofort auf die Default-Sprache umleiten, z.B. `redirect('/de')` oder `/en`. So landet ein Besucher ohne Pfad-Angabe direkt auf der deutschsprachigen Seite (wenn DE die primäre Sprache ist).
- Der Ordner `app/[locale]` enthält alle Seiten pro Sprache. In `app/[locale]/layout.tsx` definieren wir `generateStaticParams()` mit allen unterstützten Locales, damit Next diese beim Export berücksichtigt. Beispiel:
  ```tsx
  export async function generateStaticParams() {
    return [{ locale: 'de' }, { locale: 'en' }];
  }
  ```
  Dies sorgt dafür, dass Next die Routen `/de` und `/en` (und darunterliegende Seiten) statisch erstellt.
- `app/[locale]/layout.tsx` kann außerdem je nach `params.locale` die passenden Übersetzungs-Ressourcen laden und via Kontext bereitstellen. Hierfür bietet sich die Bibliothek **next-intl** an, die mit App Router und static export kompatibel ist. Wir würden JSON-Übersetzungsdateien z.B. in `src/i18n/de.json` und `src/i18n/en.json` ablegen und in diesem Layout entsprechend importieren. Alternativ, für einfach strukturierte Landing-Page-Texte, könnten wir auch ohne externe Lib arbeiten und die Texte pro Sprache in einfachen Objekten halten.
- Im `app/[locale]/page.tsx` der Startseite pro Sprache wird dann der eigentliche Inhalt gerendert (Hero, Features, etc. mit lokalisierten Strings).

Mit dieser Struktur erstellt Next beim Build folgende Ausgabe (analog zum gezeigten Beispielprojekt):

```
out/
├── de/
│   ├── index.html        (Startseite auf Deutsch)
│   └── ...               (weitere deutsche Seiten als index.html in Unterordnern)
├── en/
│   ├── index.html        (Startseite auf Englisch)
│   └── ...
├── de.html               (interne Next-Redirect-Seite für /de Pfad)
├── en.html               (interne Next-Redirect-Seite für /en Pfad)
└── ...                   (assets etc.)
```

Dadurch sind beide Sprachen unter getrennten Pfaden abrufbar, was SEO-freundlich ist (sprachgetrennte URLs). Die `de.html` und `en.html` dienen als Fallbacks, die Besucher auf die Ordner umleiten (dies geschieht automatisch durch Next’s Exportmechanismus). **Wichtig:** Auf GitHub Pages werden diese Ordner als Verzeichnisse mit `index.html` unterstützt, sodass z.B. `https://cloudeteer-chat.org/de` die deutsche Seite lädt.

Für Verlinkungen zwischen den Sprachen oder Unterseiten nutzt man relative Links oder Next’s `<Link>` mit `href="/de/kontakt"` etc. – diese funktionieren im statischen Modus, solange die Seiten existieren.

Zusammengefasst: Wir implementieren i18n, indem wir **für jede Sprache vollständig statische Seiten generieren**, anstatt auf Runtime-Language-Switching zu setzen. So umgehen wir das Verbot von i18n im Export und erhalten trotzdem zweisprachige Sites.

### Umgang mit Images im Static Export

Bilder können wir bedenkenlos in Next.js nutzen, aber einige Anpassungen sind nötig:
- **Next/Image unoptimized:** Wie oben konfiguriert, verwenden wir `next/image` mit `unoptimized: true`, damit beim Export kein externer Image-Optimizer erwartet wird. Das `<Image>`-Component verhält sich dann ähnlich wie ein normales `<img>` und greift direkt auf die Bild-URL.
- **Bildquellen:** Am einfachsten legen wir alle benötigten Bilder (Logos, Illustrationen) ins `public/` Verzeichnis der jeweiligen App. So können wir mit `/hero-bg.png` oder ähnlichen Pfaden darauf verweisen. Diese Dateien werden unverändert ins `out/` kopiert.
- **Responsive/Modern Formate:** Da keine laufende Node-App dahinter steht, müssen wir ggf. manuell verschiedene Auflösungen bereitstellen oder einfach ausreichend große Bilder nutzen und via CSS skalieren. Alternativ kann man auch `<picture>` mit WebP-Fallbacks nutzen, aber für MVP-Landingpages reicht oft ein gutes Kompromissformat.
- **Verzicht auf große Next-Optimierungen:** Features wie Blur-Up Placeholder von Next/Image funktionieren im Exportmodus nicht out-of-the-box. Stattdessen könnte man Low-Res-Versionen vorab einbauen oder darauf verzichten. Die Performance-Budget-Vorgabe (dazu später mehr) legt ohnehin nahe, Bilder klein zu halten.

### GitHub Pages Einschränkungen

Da wir auf **GitHub Pages** hosten, gibt es einige technische Rahmenbedingungen:
- **Keine Server-Side Features:** Alles muss zur Buildzeit entschieden werden. Wir haben das berücksichtigt, indem wir SSG und static routing einsetzen (keine SSR oder API-Routen von Next). Funktionen wie Middleware sind nicht verfügbar, was aber dank statischer Pfade auch nicht nötig ist (z.B. Sprachauswahl über Subdomain könnten wir sonst per Middleware lösen, hier aber fest via Pfad).
- **Routen/404:** GitHub Pages kann nur vorhandene Dateien ausliefern. Deshalb sollten wir einen `404.html` mit exportieren, damit unbekannte URLs eine sinnvolle Fehlerseite zeigen. Next erzeugt standardmäßig `404.html` aus einer `app/[locale]/not-found.tsx` oder globalen `not-found.tsx` Datei, die wir bereitstellen können.
- **Kein echtes Fallback Routing:** Wenn etwa jemand auf `cloudeteer-chat.org/irgendwas` geht, liefert Pages starr 404 (oder den redirect wenn wir manuell einen einbauen). In unserem Fall sind alle relevanten Pfade bekannt. Für ASTRA-Seite (falls unter Subdomain) gilt das gleiche.
- **BasePath bei Project Pages:** (Für den Fall, dass wir doch z.B. astra.cloudeteer-chat.org als *Projektseite* in einem user/org Repo hosten) – Dann müsste Next mit `basePath` arbeiten, z.B. `basePath: '/astra'`. Da wir aber Custom Domains direkt nutzen, entfällt das: Jede Domain kann als Root dienen, kein zusätzlicher Pfad nötig.
- **Asset Pfade:** Alle internen Links, Skript- und CSS-Pfade werden relativ zur Domain generiert, was Next im Export normalerweise richtig macht. Es lohnt sich, `crossOrigin` auf `'anonymous'` zu lassen oder wegzulassen, damit z.B. Fonts geladen werden können, und sicherzustellen, dass die `<base href>` im HTML (falls verwendet) korrekt ist. In der Regel kann man Next vertrauen, solange `basePath` stimmt oder nicht notwendig ist.

Zusammenfassend stellen wir sicher, dass unsere Next.js-Konfiguration den statischen Export unterstützt, i18n über statische Routen löst und mit den Besonderheiten von GitHub Pages harmoniert (z.B. ungehashte Asset-Pfade, CNAME-Datei im Output, etc.). Im nächsten Schritt passen wir das Design System an.

## 3. UI/Design System Adaption

Wir bauen das Design der Landing Pages auf dem bestehenden **FundMe-Frontend-Prototyp** (`jmkrieg/fundme-frontend`) auf. Dieses Projekt nutzt ein modernes **Design System mit Tailwind CSS und shadcn/ui** Komponenten. Ziel ist es, Farben, Typografie und wiederverwendbare UI-Bausteine daraus **wiederzuverwenden und anzupassen**. So erreichen wir ein konsistentes Erscheinungsbild für cloudeteer-chat und ASTRA, ohne von Grund auf neu gestalten zu müssen.

### Farbpalette und Design-Tokens

Der FundMe-Prototyp definiert Farbtokens via CSS Custom Properties in `globals.css`. Diese können wir direkt übernehmen. Es handelt sich um ein neutrales, zurückhaltendes Theme (Base-Farbe „stone“/Grau) mit definierten Semantic Colors (Primary, Secondary, Accent etc.). Hier ein Auszug der **Light Mode** Farben aus dem Prototyp:

- `--primary`: **dunkles Anthrazit** (HSL 24, 9.8% Sätt., 10% Helligkeit) – Primärfarbe für wichtige Aktionen, Texte auf sekundärem Grund etc.
- `--primary-foreground`: **Fast weiß** (HSL 60, 9.1%, 97.8%) – Textfarbe auf Primary.
- `--secondary`: **Hellgrau** (HSL 60, 4.8%, 95.9%) – Sekundär-Hintergrund (z.B. Cards, Absetzungen).
- `--secondary-foreground`: **Anthrazit** (HSL 24, 9.8%, 10%) – Text auf Secondary.
- `--muted`: **Hellgrau (gleich wie Secondary)** – Für zurückgenommene Elemente.
- `--muted-foreground`: **Mittleres Grau** (HSL 25, 5.3%, 44.7%) – Textfarbe auf muted Hintergründen.
- `--border`: **Grauton** (HSL 20, 5.9%, 90%) – Standard für Ränder.
- Weitere: `--background` (Weiß), `--foreground` (nahe Schwarz) für generellen Text, `--accent` (gleich Secondary), `--destructive` (rot für Fehler, #E60026 ca.). Zusätzlich definierte Chart-Farben (für Diagramme) und spezielle Sidebar-Farben, die für uns weniger relevant sind, außer wir implementieren ein Darkmode oder Sidebar.

**Dark Mode:** Das Design-System unterstützt Dark Mode via `.dark` Klasse mit eigenen Variablen. Für die Landing Pages könnten wir eine Dunkelmodus-Option anbieten (nicht zwingend, aber als Accessibilty-Plus). Da Next und das Designsystem (shadcn + next-themes) dies vorsehen, werden wir es mit minimalem Aufwand aktivieren (ThemeToggle in Header).

**Adaption für cloudeteer-chat/ASTRA:** Wir können die obigen neutrales Farbschema beibehalten, da es modern und seriös wirkt (passend für B2B/öffentl. Sektor). Allerdings könnte man **Akzentfarben** an die Marken anpassen:
- *cloudeteer-chat:* Der Name suggeriert evtl. **Olivegrün** als Markenfarbe. Falls erwünscht, könnten wir `--primary` oder `--accent` leicht in einen grünlichen Ton ändern. Ohne konkretes Branding-Guide belassen wir es zunächst beim neutralen Scheme, um Fokus auf Inhalte zu legen.
- *ASTRA:* Könnte eine eigene Farbnuance bekommen (z.B. ein Blau oder Türkis, um Technologie und Zukunft zu symbolisieren). Denkbar wäre, ASTRA-Seite per Design-Token leicht zu variieren – z.B. einen anderen `--primary` Wert nur in ASTRA-App setzen. Das lässt sich via Tailwind Theme oder zur Not per CSS-Override in astra spezifisch machen.

Für die Planung gehen wir davon aus, beide Sites nutzen **das gleiche Grundtheme** (für Konsistenz mit Corporate Identity). Feinjustierung der Primärfarbe je Seite wäre optional später.

Wir extrahieren die Farben in ein zentrales **Design Token Modul** (z.B. `packages/ui/tokens.ts` oder via Tailwind Config). In Tailwind lässt sich das über `theme.extend.colors` abbilden oder wir nutzen direkt CSS Variablen. Da Shadcn’s System bereits Utilities wie `bg-background` nutzt, behalten wir den Ansatz bei:
- In `globals.css` definieren wir die Variablen (kopiert aus FundMe) und wenden sie global an (Root und `.dark` Selektor).
- Tailwind-Klassen wie `bg-primary` oder `text-foreground` werden über die Konfiguration auf diese Variablen gemappt. (Shadcn’s `@shadcn/ui` CLI hat wahrscheinlich bereits die Utilities generiert, wie `text-foreground { color: var(--foreground) }` etc. in einem Tailwind layer.)

Beispiel **Tailwind Config** Ausschnitt zur Verdeutlichung (Pseudo-Code, da Shadcn’s `components.json` das meist intern regelt):

```js
// packages/ui/tailwind.config.js (auszugsweise)
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",       // white
        foreground: "hsl(20, 14.3%, 4.1%)",   // near-black
        primary: "hsl(24, 9.8%, 10%)",        // dark anthracite
        secondary: "hsl(60, 4.8%, 95.9%)",    // light gray
        destructive: "hsl(0, 84.2%, 60.2%)",  // red
        // ... etc.
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      borderRadius: {
        lg: "0.6rem"  // as per --radius
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'), // already used in FundMe
    // ...evtl. forms plugin etc.
  ]
};
```

Die o.g. Werte stammen aus FundMe und werden für uns übernommen. Damit erhalten wir konsistente Farbnamen in Tailwind (z.B. `bg-secondary` entspricht hellgrau). Im Dark Mode werden die CSS Custom Properties via `.dark` Klasse umdefiniert, was dank Tailwind’s JIT-Engine funktioniert, da z.B. `bg-background` auf `--background` referenziert, welches durch `.dark` wechselt.

### Typografie

FundMe verwendet die Schriftfamilie **Geist Sans** (eine moderne Sans-Serif von Vercel) und **Geist Mono** für Monospace-Elemente. Diese Fonts wurden als `.ttf` Dateien ins Projekt eingebunden und via `next/font` in `layout.tsx` integriert. Wir übernehmen:
- **Geist Sans** als primäre Schrift für Fließtext und Überschriften.
- **Geist Mono** als Zweitschrift für Code-Texte oder Ziffern (wahrscheinlich auf Landing Pages selten gebraucht, evtl. für Tech-Snippets oder ID-Nummern etc.).

Die Fonts liegen bereits im Repo (`src/assets/fonts/Geist/...`). Wir können sie ins neue Projekt kopieren (oder das Monorepo hat Zugriff) und ähnlich einbinden:
```ts
import localFont from "next/font/local";
const geistSans = localFont({
  src: [
    { path: '../assets/fonts/Geist/static/Geist-Regular.ttf', weight: '400' },
    { path: '../assets/fonts/Geist/static/Geist-Medium.ttf', weight: '500' },
    { path: '../assets/fonts/Geist/static/Geist-Bold.ttf', weight: '700' }
  ],
  variable: "--font-geist-sans"
});
```
Dann `<body className={geistSans.variable}>` im RootLayout (ähnlich wie in FundMe). Zusätzlich definieren wir in CSS oder Tailwind, dass unsere `font-sans` Klasse auf `var(--font-geist-sans)` referenziert (siehe Tailwind config oben). Dadurch haben wir saubere Schrift ohne Google Fonts, komplett DSGVO-konform (lokal gehostet). 

**Typografische Größen & Abstände:** Das Designsystem bringt vermutlich Standardabstände mit. Überschriften etc. können wir mit Tailwind’s default Scale nutzen oder anpassen. Geist Sans ist optisch ähnlich wie Inter; wir können also z.B. Tailwind’s Default (`font-normal`, `text-xl`, `leading-relaxed` etc.) übernehmen. Falls der Prototyp bestimmte Heading-Styles hatte (z.B. sehr große Hero-Font), könnten wir schauen: Wahrscheinlich wurden im Hero-Section explizit Klassen gesetzt (z.B. `text-4xl md:text-5xl font-bold`). Wir werden bei den Komponenten konkret definieren.

### Komponenten (Hero, CTA, FeatureGrid, etc.)

Für die Landing Pages identifizieren wir wiederverwendbare **Section-Komponenten**:
- **Hero**: Der obere Bereich mit prägnanter Überschrift, Subtitle und einem Call-To-Action Button. Oft vor einem Hintergrundbild oder -muster. Dieser soll sofort vermitteln, *wer* oder *was* das ist und einen ersten Handlungsaufforderung geben.
- **Feature Grid**: Abschnitt, der mehrere Leistungsmerkmale/Features in übersichtlicher Form darstellt – typischerweise ein Grid (z.B. 3 Spalten) mit Icons oder Illustrationen und kurzen Beschreibungen pro Feature.
- **CTA Section**: Ein auffälliger Abschnitt am Ende (oder zwischendrin) mit einem **Call-To-Action**, z.B. „Jetzt Kontakt aufnehmen“ oder „Demo anfordern“. Meist bestehend aus einem kurzen Text + Button.
- **Navbar & Footer**: Navigationsleiste (vermutlich einfach gehalten, z.B. Logo + Sprache wechseln + evtl. ein Link) und Footer mit Impressum/Datenschutz Links, vielleicht Adresse. In FundMe gab es ein `<Navbar>` und `<FooterSection>` bereits – diese können wir anpassen.
- **Logo Wall / Partner Section**: FundMe hatte `LogoSection` (Ticker mit Logos). Für cloudeteer-chat könnte man Logos von Partnern/Referenzen zeigen, sofern vorhanden. Für ASTRA evtl. Logos von Technologien (z.B. „built with OSS“ logos) oder Förderern.
- **Showcase**: In FundMe gab es eine `<Showcase>` und `<Pricing>` Sektion. Für unsere Seiten:
  - cloudeteer-chat (Unternehmen) – ein Showcase könnte Projekte oder Use-Cases zeigen, oder ein allgemeines „Was machen wir“ in visueller Form.
  - ASTRA (Produkt) – ein Showcase könnte ein Screenshot oder Ablaufdiagramm der Plattform sein.
- **Pricing**: Für ASTRA wäre zu klären, ob Pricing-Infos öffentlich sind (z.B. SaaS-Angebot). Da ASTRA als Open-Core für MSP/Behörden positioniert ist, gibt es evtl. kein klassisches Preismodell auf der Seite (eher individuelle Angebote). Daher könnte man den Pricing-Abschnitt weglassen oder umwidmen (z.B. „ASTRA Editionen: Community vs Enterprise“ Übersicht).
- **FAQ** (optional): Für komplexe Themen (Erklärbare KI, etc.) wäre ein FAQ-Sektion denkbar, aber nur falls Content vorhanden.
- **Kontaktformular** (optional): Evtl. auf cloudeteer-chat-Seite ein Formular für Projektanfragen. Aber siehe Punkt 8 – Formulare ohne eigenen Server – hier müssten wir Lösungen finden (z.B. Drittanbieterdienste). Man könnte auch einfach Kontakt-Links (Mailto) nutzen.

Wir erstellen diese Komponenten als React-Komponenten, idealerweise **als Teil des gemeinsamen Design Systems**, aber mit spezifischem Content pro Seite. Praktisch könnte jede Seite eine Art Page-Composer sein, der die Sektionen in passender Reihenfolge einbindet (ähnlich wie FundMe’s `page.tsx` das tat). Der Inhalt (Texte/Bilder) wird pro Seite bzw. Sprache geliefert, während das Styling und Layout in der Komponente steckt.

Beispiel: **HeroSection Komponente** – in `packages/ui/components/Hero.tsx` definieren wir ein generisches Hero-Layout mit Props für `headline`, `subline`, `ctaLabel`, `ctaHref`, `image` etc. Die cloudeteer-chat-Seite importiert diese und füllt sie mit dem deutsch/englischen Text für cloudeteer-chat; die ASTRA-Seite füllt sie mit ASTRA-Texten. Vorteil: Einheitliches Aussehen (Schriftgrößen, Abstände, Button-Stil gleich).

Ähnlich verfahren wir mit FeatureGrid: Eine Komponente, der man eine Liste von Feature-Objekten (Icon + Titel + Beschreibung) übergibt. So können cloudeteer-chat und ASTRA jeweils ihre Feature-Liste einfügen, aber die Darstellung (Icon circle, responsive Grid) bleibt gleich.

Wir nutzen hierbei Tailwind und ggf. Shadcn/UI-Primitive:
- Buttons können wir aus FundMe übernehmen (`<Button>` Component in `ui/button.tsx` war vermutlich vorhanden im Prototyp). Dadurch haben wir einen stilisierten Button mit Variants (Primary, Secondary etc.). Den CTA-Button im Hero nutzen wir dann als `<Button variant="primary">Los geht’s</Button>` o.Ä.
- Icons: Das Projekt verwendete **Lucide-Icons** (modernes Iconset). Wir können Lucide weiter nutzen (leichtgewichtig, via `lucide-react` Package bereits drin). FeatureGrid-Items könnten z.B. <CheckCircle> oder spezifische Symbols bekommen.
- Layout-Utilities: Tailwind-Flex/Grid, Padding/Margin entsprechend Design. Wir halten Abschnitte z.B. auf max-w-screen-xl zentriert, mit padding (FundMe hatte sicher ähnliche Container-Klassen).

**Beispiel Implementierung – Hero Section (Auszug):**

```tsx
// packages/ui/components/Hero.tsx
import { Button } from "./Button";
import Image from "next/image";
interface HeroProps { 
  title: string; 
  subtitle: string; 
  ctaText: string; 
  ctaHref: string; 
  imageSrc?: string; // optional background or side image
}
export function HeroSection({ title, subtitle, ctaText, ctaHref, imageSrc }: HeroProps) {
  return (
    <section className="relative bg-background py-16 md:py-24">
      {imageSrc && (
        <Image src={imageSrc} alt="" fill className="object-cover opacity-20" />
      )}
      <div className="container relative z-10 text-center px-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="mt-8">
          <Button as="a" href={ctaHref} size="lg">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

*(Erläuterung: Hier wird ein optionales Hintergrundbild halbtransparent eingebunden und der Text zentriert platziert. `Button` kommt aus Design System, `text-foreground` und `text-muted-foreground` nutzen unsere Farbvariablen.)*

Wir würden analog **FeatureGridSection**, **CTASection** etc. bauen. Mit Tailwind und unserer Farbpalette stellen wir sicher, dass Kontraste WCAG-gerecht sind. Zum Beispiel: `text-muted-foreground` ist ein Mittelgrau auf weiß (Kontrast ok für Fließtext), `text-foreground` (sehr dunkel) auf `bg-background` (weiß) hat einen hohen Kontrast (ca. 15:1), was deutlich über AA-Anforderung liegt.

Alle Komponenten gestalten wir **responsiv** (Tailwind’s responsive utilities) und **zugänglich**:
- Verwendung semantischer HTML-Elemente (Sections, Headlines `<h1>-<h2>` Hierarchie, Listen etc.).
- Buttons als echte `<button>` oder `<a>` mit Rollen.
- Alt-Texte für Bilder.
- Fokuszustände für interaktive Elemente (Tailwind hat `focus:outline` Utilities; Radix UI (shadcn) Buttons haben meist schon zugängliche Markup).

Zudem definieren wir **Design Tokens** nicht nur für Farben, sondern auch ggf. für:
- **Spacing:** z.B. Abstände zwischen Sektionen einheitlich (FundMe: `gap-4` global etc.). Wir könnten ein paar Variablen für Section-Spacing definieren oder Tailwind’s Padding scale benutzen (z.B. immer `py-16`).
- **Radius:** In FundMe war `--radius: 0.6rem` global und abgeleitete sm/md/xl Werte:contentReference[oaicite:41]{index=41}. Buttons/Eingabefelder nutzen diese. Wir übernehmen diese Border-Radius-Werte, um ein konsistentes abgerundetes Design zu haben (z.B. Buttons mit ~4px Radius).
- **Shadows:** Falls benötigt, definieren wir leichte Schatten für Card-Elemente.
- **Transitions:** FundMe hat `transition-all duration-200` an manchen Container gelegt für smooth Sidebar-Ein-/Ausklappen. Für unsere static page brauchen wir nur einfache Hover-Transitions (z.B. Button Hover).

Durch die Adaption des bestehenden Systems sparen wir Entwicklungszeit und profitieren von erprobten, einheitlichen UI-Bausteinen. Wichtig ist, dass wir überflüssige Komponenten aus FundMe (z.B. komplexe Sidebar/Auth UI) nicht übernehmen, um die Landing Pages schlank zu halten.

## 4. SEO, Analytics und Rechtliches

Beim Launch der Seiten müssen wir Suchmaschinenoptimierung, datenschutzkonformes Tracking und die rechtlichen Pflichtangaben berücksichtigen.

### SEO-Optimierungen

Eine **SEO-Checkliste** für statische Landing Pages:
- **Saubere URLs & Sprachsuffixe:** Durch die `/de/` und `/en/` Pfade haben wir bereits sprachspezifische URLs. Wir sollten einen `<link rel="alternate" hreflang="x">` für DE und EN setzen, damit Google die Zusammengehörigkeit erkennt. Next-Intl kann das evtl. automatisch, sonst manuell im `<head>`.
- **Seitentitel und Meta Description:** Für jede Seite definieren wir passende `<title>` und `<meta name="description">`. Im Next App Router können wir pro Seite `export const metadata = { title: "...", description: "..." }` setzen. Z.B. cloudeteer-chat DE: title = "cloudeteer-chat – Erklärbare KI & Open-Core", description = "cloudeteer-chat ist eine europäische Projektgesellschaft für erklärbare KI-Systeme..." (ca. 150 Zeichen). Diese Infos erscheinen dann im generierten HTML `<head>` und sind für Google relevant.
- **Strukturierte Überschriften:** Nur ein `<h1>` pro Seite (z.B. im Hero der Produkt-/Firmename + Slogan), darunter sinnvolle `<h2>` für Abschnittstitel (z.B. „Unsere Leistungen“, „ASTRA Features“) usw. Das hilft Suchmaschinen beim Inhaltsscan.
- **Open Graph / Social Tags:** Wir erstellen Open Graph Meta-Tags, damit beim Teilen in sozialen Medien schöne Vorschaukarten erscheinen. D.h. `<meta property="og:title">`, `og:description`, `og:image`, `og:url` pro Sprache. Next 15 bietet dafür die Möglichkeit, im `metadata` Objekt ein `openGraph` Feld zu definieren. Wir könnten ein repräsentatives Bild definieren (z.B. Firmenlogo auf dunklem Grund oder ein Hero-Ausschnitt). Ebenso `twitter:card` Meta.
- **Sitemap.xml und robots.txt:** Next.js kann optional beim Export eine `sitemap.xml` generieren, oder wir fügen manuell eine an. Aufgrund geringer Seitenzahl kann man eine statische Sitemap anlegen (listet cloudeteer-chat.org/de/, /en/, astra.cloudeteer-chat.org/de/, /en/ jeweils). Auch ein `robots.txt` mit `Allow: /` und dem Link zur Sitemap wird bereitgestellt. Diese Dateien legen wir im `public/` Ordner ab, sodass sie unter `/robots.txt` und `/sitemap.xml` ausgeliefert werden.
- **Performance & Best Practices:** Eine schnelle Seite rankt besser. Durch unseren performance-bewussten Ansatz (wenig JS, optimierte Assets) erzielen wir gute Lighthouse-Performancewerte. Darauf achten wir im QA (siehe Abschnitt 8).
- **Local Business Markup (optional):** Für cloudeteer-chat (falls relevant als Unternehmen) könnte man schema.org Markup im Impressum oder Footer einbinden (Adresse, Firmierung). Für ASTRA evtl. Product schema (Name, description). Das sind Bonuspunkte, aber optional.

### DSGVO-konforme Analytics

Wir möchten Besucherzahlen messen, aber **ohne Tracking-Sünden**. Ein Vorschlag ist **Plausible Analytics**, ein leichtgewichtiges, EU-gehostetes Tool, das **ohne Cookies und ohne personenbezogene Daten** auskommt. Vorteile:
- **Datenschutz:** Plausible speichert keine personenbezogenen Daten oder IPs und ist konform mit GDPR/CCPA/PECR. Daher kann man i.d.R. auf den nervigen Cookie-Banner verzichten, solange man sonst keine Cookies setzt.
- **Hosting:** Wir könnten Plausible Cloud verwenden (gehostet in EU) oder sogar selbst hosten (Open Source). Für unseren Zweck genügt wahrscheinlich die Cloud-Version mit einfacher Integration via `<script>` Tag.
- **Integration:** Man fügt im `<head>` oder Ende `<body>` einen Script-Snippet von Plausible ein. Z.B.:
  ```html
  <script defer data-domain="cloudeteer-chat.org" src="https://plausible.io/js/script.js"></script>
  ```
  Bzw. für astra.cloudeteer-chat.org ebenso (Plausible kann mehrere Domains tracken oder man initiiert es zweimal). 
- **Kein Cookiebanner nötig:** Da Plausible kein Nutzeridentifikations-Tracking macht, **bedarf es keiner Einwilligung** nach aktuellen Richtlinien (Information in Datenschutzerklärung reicht).
- **Alternativen:** Matomo (ehem. Piwik) wäre eine andere Open-Source-Analytics-Lösung – jedoch komplexer und oft mit Cookies, daher Plausible bevorzugt. Google Analytics ist wegen Datenübertragung in die USA problematisch und würde Cookie-Consent erfordern, daher ausgeschlossen.

### Lokale Fonts & Ressourcen

Wir verwenden **keine externen Ressourcen**, die ungefragt Daten senden:
- Fonts sind lokal eingebunden (Geist), somit kein Google-Font-Request und keine Drittserver.
- Icons (Lucide) kommen als npm-Package, werden ins Bundle integriert, kein externer Call.
- Falls wir Web-Fonts per `@font-face` in CSS einbinden, achten wir auf korrektes `font-display: swap` für Performance.
- Andere externe Scripts: Einzige Ausnahme ist das Plausible Script (Domain plausible.io). Dieses ist laut Plausible sehr klein (~1 KB) und datenschutzkonform. Wenn maximaler Datenschutz gewünscht, könnten wir sogar darauf verzichten.

### Impressum und Datenschutzseiten

Als deutsches/europäisches Unternehmen ist ein **Impressum** Pflicht (Angaben über Firma, Ansprechpartner, Adresse, Kontakt, UStID etc.), ebenso eine **Datenschutzerklärung**:
- Wir erstellen separate Seiten dafür. Z.B. `app/[locale]/impressum/page.tsx` und `app/[locale]/datenschutz/page.tsx` für DE, sowie `.../legal-notice` und `.../privacy` für EN.
- Diese Seiten werden in der jeweiligen Sprache verfasst und im Footer verlinkt (z.B. kleine Footer-Navigation).
- Inhalte: Hier kann man Textbausteine nutzen. Das Impressum muss vollständig die Anbieterkennzeichnung enthalten (Geschäftsführer, Register, Kontakt). Die Datenschutzerklärung muss u.a. Nutzung von Analytics (Plausible), der Website-Technik etc. erläutern. Wir können hierfür Standardtexte heranziehen und anpassen. Wichtig: Erwähnen, dass keine Cookies außer technisch notwendige genutzt werden, und dass Analytics anonymisiert ist.
- **Zugänglichkeit der Infos:** In der Footer Section platzieren wir gut sichtbar die Links "Impressum" und "Datenschutz". In der mobilen Ansicht eventuell als Dropdown oder einfach untereinander.

### Weitere rechtliche Aspekte

- **Cookies/Consent:** Da wir planmäßig keine Cookies setzen (außer evtl. ein Darkmode-Preference in LocalStorage oder ein rein technisches Cookie für Sidebar-Status, was aber wohl nicht vorhanden sein wird außer wir übernehmen Sidebar-Code) und Analytics ohne Cookies nutzen, können wir auf ein Cookie-Banner verzichten. Sollten wir doch mal ein Drittanbieter-Embed (z.B. YouTube Video) integrieren, müssten wir neu evaluieren. Aktuell aber nicht geplant.
- **Barrierefreiheitserklärung:** Für öffentliche Stellen in EU (falls cloudeteer-chat Auftraggeber in öffentl. Hand ist) wäre eine Barrierefreiheitserklärung nötig. cloudeteer-chat ist aber wohl ein Unternehmen, keine Behörde, somit nicht verpflichtend. Dennoch: Wir streben WCAG AA an, was praktisch diese Anforderungen abdeckt. Man könnte auf der Seite irgendwo angeben „Wir bemühen uns um Barrierefreiheit“ etc., aber das ist eher freiwillig.
- **Tracking Opt-Out:** Auch wenn Plausible datenschutzkonform ist, kann man in der Datenschutzerklärung einen Opt-Out-Link anbieten (Plausible bietet Option, per URL-Parameter Tracking für einen User zu deaktivieren). Dies ist nice-to-have.
- **Hosting-Standort:** GitHub Pages hostet die Seiten vermutlich auf weltweiten CDNs (Fastly, mit PoPs auch in EU). Für DSGVO sollte das okay sein, da es keine personenbezogenen Daten involviert beim reinen Seitenaufruf. Dennoch ein Satz in der Datenschutzerklärung, dass GitHub (USA) als Hoster fungiert, schadet nicht, inkl. Hinweis auf entsprechenden Auftragsverarbeiter-Deal GitHub/Microsoft. Das ist formell, aber gehört oft dazu.

Durch diese Maßnahmen stellen wir sicher, dass die Seiten suchmaschinenfreundlich, legal abgesichert und ohne Datenschutz-Bauchschmerzen betrieben werden können.

## 5. Deployment auf GitHub Pages

Beide Seiten sollen via **GitHub Pages** mit Custom Domains veröffentlicht werden – `cloudeteer-chat.org` (Apex Domain) und `astra.cloudeteer-chat.org` (Subdomain). Der Deployment-Prozess umfasst DNS-Konfiguration und eine CI-Pipeline, die den statischen Export in die Pages-Umgebung stellt.

### DNS-Konfiguration für Custom Domains

**cloudeteer-chat.org (Apex-Domain):** Für die Hauptdomain richten wir A-Records ein, die auf GitHub Pages zeigen. GitHub stellt vier IP-Adressen bereit, die hinter Pages liegen:
```
185.199.108.153  
185.199.109.153  
185.199.110.153  
185.199.111.153
```
Wir erstellen im DNS-Provider je einen A-Record von `cloudeteer-chat.org` auf jede dieser vier IPs (für Ausfallsicherheit). Zusätzlich kann man AAAA-Records (IPv6) analog hinzufügen, das ist optional aber zukunftssicher:
```
2606:50c0:8000::153  
2606:50c0:8001::153  
2606:50c0:8002::153  
2606:50c0:8003::153
```
So wird jeder Aufruf von `cloudeteer-chat.org` an GitHub’s Pages-Server geleitet.

**ASTRA Subdomain:** Für `astra.cloudeteer-chat.org` verwenden wir einen CNAME-Record. Dieser CNAME soll auf die Pages-Hostname des entsprechenden GitHub Pages Projekts zeigen. Wenn ASTRA als separate GitHub Pages Site in einem Repo deployt wird, ist die Pages-Default-URL meist `<user>.github.io/<repo>`:
- Angenommen, wir deployen ASTRA auf `jmkrieg.github.io/astra` (Projektseiten), dann setzen wir `CNAME astra -> jmkrieg.github.io.` (ohne repo-Name laut GitHub Empfehlung).
- Falls wir ASTRA im selben Repo wie cloudeteer-chat auf einer anderen Branch deployen, wäre es komplexer – vermutlich werden wir ASTRA auf **einem eigenen Repo oder Branch** hosten, das dann auch eine Pages-Instanz hat. Für das Prinzip nehmen wir an, ASTRA hat z.B. ein Repo `cloudeteer-chat-astra` mit Pages. Dann CNAME von `astra.cloudeteer-chat.org` auf `cloudeteer-chat-astra.pages.dev` (bzw. wieder `jmkrieg.github.io` falls es unter dem gleichen User läuft).
- Wichtig: In den GitHub Pages Einstellungen des ASTRA-Pages-Repos muss `astra.cloudeteer-chat.org` als Custom Domain eingetragen sein, damit GitHub weiß, dass es Anfragen dafür bedienen soll. Gleiches für `cloudeteer-chat.org` im Hauptrepo.

**CNAME-Dateien:** Bei GitHub Pages (wenn man es via Branch/docs ausliefert) ist es üblich, eine `CNAME` Datei im Root des Pages-Inhalts zu haben, die die Domain enthält. Da wir über Actions publishen, können wir:
- Im cloudeteer-chat-Build eine `CNAME` Datei mit Inhalt `cloudeteer-chat.org` generieren (oder in `public/` legen, damit sie beim Export in `out/` erscheint).
- Ebenso für ASTRA `astra.cloudeteer-chat.org` in dessen public.
GitHub erkennt diese Datei und verbindet sie mit dem Setting. (Bei Actions basierter Deploy kann man auch im Settings einstellen ohne Datei, aber die Datei schadet nicht).

Zusammengefasst:
- DNS: A-Records fürs Apex, CNAME fürs Subdomain.
- GitHub: Custom Domain im Repo-Settings eintragen (erzwingt automatisch HTTPS via Let’s Encrypt; das Häkchen "Enforce HTTPS" aktivieren nach Propagation).

### Build & Deploy mit GitHub Actions

Wir richten pro Site eine **GitHub Actions Workflow** ein, der bei Push ins Main-Branch (oder bestimmte Pfade) den statischen Build erzeugt und auf Pages veröffentlicht.

Für das Monorepo könnte es einen gemeinsamen Workflow geben, aber der Aufwand zwei Seiten in ein Repo zu packen, würde uns evtl. zwingen, mit zwei Branches zu arbeiten. Alternativ nutzen wir **zwei separate Repos** – dann hat jedes Repo seinen eigenen Workflow. Zur Veranschaulichung zeigen wir zwei YAML-Workflows (einer pro Site), falls sie getrennt gebaut werden:

<details>
<summary><strong>.github/workflows/cloudeteer-chat-pages.yml</strong> – Deployment für cloudeteer-chat.org</summary>

```yaml
name: Deploy cloudeteer-chat Site

on:
  push:
    paths:
      - 'apps/cloudeteer-chat-site/**'   # Trigger bei Änderungen an cloudeteer-chat-Seite
      - 'packages/ui/**'           # und Änderungen am gemeinsamen UI
      - 'package.json'             # (Abhängigkeiten)
    branches: [ main ]

permissions:
  contents: read  # zum Checkout
  pages: write    # erlaubt das Veröffentlichen auf Pages
  id-token: write # benötigt für deployment (OIDC Token)

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install deps
        run: npm install

      - name: Build cloudeteer-chat site
        run: npm run build:cloudeteer-chat 
        # In package.json, "build:cloudeteer-chat": "npm run build --workspace apps/cloudeteer-chat-site"
        # Dieser Befehl sollte next build + next export für cloudeteer-chat ausführen.

      - name: Upload Pages artifact
        id: upload
        uses: actions/upload-pages-artifact@v1
        with:
          path: apps/cloudeteer-chat-site/out

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.upload.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v1
```

</details>

<details>
<summary><strong>.github/workflows/astra-pages.yml</strong> – Deployment für astra.cloudeteer-chat.org</summary>

```yaml
name: Deploy ASTRA Site

on:
  push:
    paths:
      - 'apps/astra-site/**'
      - 'packages/ui/**'
      - 'package.json'
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm install
      - run: npm run build:astra 
        # -> next build/next export für ASTRA, Ausgabe in apps/astra-site/out
      - name: Upload Pages artifact
        id: upload
        uses: actions/upload-pages-artifact@v1
        with:
          path: apps/astra-site/out

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.upload.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v1
```

</details>

Erläuterung der Workflows:
- Sie triggern bei jedem Push auf `main`, aber jeweils nur, wenn relevante Dateien verändert wurden (so bauen wir nicht unnötig beide, wenn nur eine Site geändert wurde).
- **Build Job:** Checkt den Code aus, richtet Node 18 ein, installiert Dependencies (Caching aktiviert um schneller zu sein), und führt das Build-Skript aus. Wir haben hier angenommen, dass `npm run build:cloudeteer-chat` intern z.B. `pnpm --filter cloudeteer-chat-site build` macht oder ähnlich – je nach Monorepo-Tool. Wichtig ist, dass am Ende ein `out/` Ordner mit static files entsteht. Danach nutzt es `actions/upload-pages-artifact@v1`, um das Ergebnis für den Deploy-Schritt verfügbar zu machen.
- **Deploy Job:** Nutzt `actions/deploy-pages@v1` um das Artefakt tatsächlich auf den GitHub Pages Branch zu schieben. Dieser Action abstrahiert den Push – wir müssen uns nicht um `gh-pages` Branch manuell kümmern. Er greift auf das zuvor hochgeladene Artifact (`page_url` Output) zurück. Der `environment: github-pages` Teil ist eine spezielle Kennzeichnung, die GitHub nutzt (das reservierte Environment `github-pages` hat besonderen Zweck).

Nach erfolgreichem Lauf wird GitHub Pages die neuen Dateien veröffentlichen. Bei Verwendung dieser Actions wird auch **kein commit im Repo** erzeugt (die Dateien leben im GitHub Pages Deploy außerhalb des Git-Verlaufs).

**Branching-Strategie:** Wir haben oben auf `main` getriggert. Man kann auch einen Workflow so einrichten, dass z.B. Pushes auf `main` = cloudeteer-chat live, und ASTRA auf `astra` Branch = astra.cloudeteer-chat.org. Je nach Orga könnte man getrennte Branches nutzen, aber das verkompliziert Collaboration (man entwickelt dann auf zwei Branches parallel). Daher in unserem Plan: beide auf `main`, aber streng getriggert nach Pfad. So kann man in einem Repo arbeiten.

**Alternative (Multi-Repo):** Wenn wir doch separate Repos nutzen, dann enthält jedes Repo nur seine Site. Dann sind Workflows noch einfacher (kein Path-Filter nötig, einfach bei push to main immer build+deploy). Und Domain Settings pro Repo. Dieser Weg eliminiert alle möglichen Konflikte, dafür muss man UI-Änderungen in zwei Repos pflegen. Wir gehen mit Monorepo + Action oben, aber das kann der Realität angepasst werden.

**Custom Domain via Actions:** Früher musste man die CNAME Datei manuell committen. Mit dem neuen Actions-Flow ist es ausreichend, im Repository einmal die Domain einzutragen (dann erzeugt GH intern eine config). Wir legen dennoch die CNAME-Datei in `public/` ab, damit sie im `out` landet – nur zur Sicherheit und Nachvollziehbarkeit.

**DNS Checks:** Nach dem ersten Deployment wird GitHub ein Zertifikat für die Domains ausstellen (dauert ca. <10min). In der Zwischenzeit sollten die DNS-Einträge schon aktiv sein, sonst kann es Wartezeit geben. Nach Deployment einmal testen:
- http://cloudeteer-chat.org sollte redirect auf https://cloudeteer-chat.org (Enforce HTTPS aktiviert) und die Seite anzeigen.
- http://astra.cloudeteer-chat.org analog.
- Im GitHub Pages Settings wird angezeigt, ob die Domain verbunden und zertifiziert ist.

### Branches vs. Environments

Da wir nur eine Produktionsstufe haben (kein Staging), deployen wir direkt von main. Optional könnte man **Preview-Builds** für Pull Requests einrichten (z.B. mittels Vercel Preview oder Cloudflare Pages Preview), aber bei GH Pages ist das schwierig. Alternativ könnte man PRs auf temporäre URLs packen (z.B. ein PR build als artifact oder auf Surge.sh hochladen). In unserem Kontext ist das Overkill. Für Qualitätssicherung können wir lokal bauen und testen (oder branch auf Fork pushen und dort Pages anschalten, aber egal).

**Zusammenfassung:** Wir nutzen GitHub Actions, um den statischen Build in den GitHub Pages Branch zu publizieren. Die DNS-Einstellungen stellen sicher, dass die Custom Domains auf diese Branches zeigen. Damit erfolgt jedes Deployment automatisiert bei Code-Änderung – Continuous Deployment für unsere statischen Seiten.

## 6. Content-Struktur für DE/EN

Die Inhalte der beiden Landing Pages müssen in zwei Sprachen gepflegt werden. Wir brauchen eine **flexible Content-Struktur**, die das Übersetzen erleichtert und die Trennung zwischen Präsentationskomponenten und Texten wahrt. Zwei Ansätze bieten sich an: **MDX-basierte Seiten** oder **strukturierte JSON/YAML** als Content-Source, die von Komponenten gerendert werden. Wir können sogar beide kombinieren.

### Content-Modell Ansatz

**a) JSON/YAML als Headless Content:** Wir legen für jede Seite und Sprache eine Datenstruktur an, z.B. in `apps/cloudeteer-chat-site/content/`. Etwa `cloudeteer-chat.de.json` und `cloudeteer-chat.en.json`, plus analog für ASTRA. Darin definieren wir Schlüssel für jeden Textbaustein. Zum Beispiel:

```json
// cloudeteer-chat.de.json (Ausschnitt)
{
  "hero": {
    "title": "Europäische KI-Projektgesellschaft",
    "subtitle": "Transparente, erklärbare KI-Lösungen – für EU-Souveränität, KMU und öffentliche Hand.",
    "cta": "Mehr erfahren"
  },
  "features": [
    { "icon": "ShieldCheck", "title": "Erklärbare KI", "description": "Unsere KI-Systeme sind nachvollziehbar und vertrauenswürdig – Blackboxen waren gestern." },
    { "icon": "Globe", "title": "EU-Souverän", "description": "Daten und Hosting innerhalb der EU – garantiert DSGVO-konform und unabhängig." },
    { "icon": "Building", "title": "Für Mittelstand & Verwaltung", "description": "Lösungen maßgeschneidert für kleine und mittlere Unternehmen sowie Behörden." }
  ],
  "ctaSection": {
    "text": "Bereit für transparente KI-Lösungen?",
    "button": "Kontakt aufnehmen"
  }
}
```

Die Komponenten (HeroSection, FeatureGridSection etc.) bekommen dann diese Inhalte als Props. Für die EN-Version `cloudeteer-chat.en.json` stehen die übersetzten Strings:
```json
// cloudeteer-chat.en.json (Ausschnitt)
{
  "hero": {
    "title": "European XAI Project Company",
    "subtitle": "Transparent, explainable AI solutions – for EU sovereignty, SMEs and the public sector.",
    "cta": "Learn more"
  },
  "features": [
    { "icon": "ShieldCheck", "title": "Explainable AI", "description": "Our AI systems are understandable and trustworthy – no black boxes." },
    { "icon": "Globe", "title": "EU-Sovereignty", "description": "Data and hosting within the EU – GDPR-compliant and independent." },
    { "icon": "Building", "title": "For SMEs & Government", "description": "Solutions tailored for small/medium businesses and public administration." }
  ],
  "ctaSection": {
    "text": "Ready for transparent AI solutions?",
    "button": "Get in touch"
  }
}
```

Analog würden wir `astra.de.json` / `astra.en.json` strukturieren, aber mit ASTRA-spezifischen Inhalten (siehe nächster Abschnitt für Beispieltexte).

Vorteile dieser Struktur:
- Übersetzer oder Content-Editoren können JSON (oder YAML) bearbeiten, ohne am JSX-Code rumzufummeln.
- Gleiche Schlüssel erleichtern Konsistenz (z.B. hero.title in beiden Sprachen).
- Die Komponenten bleiben dumb und rendern nur, je nach gewählter `locale`, das jeweilige JSON.

**b) MDX-Dateien:** Alternativ können wir pro Sprache eine MDX-Seite schreiben, wo Texte direkt drinstehen. MDX erlaubt aber auch das Einbinden von React-Komponenten. Ein Hybridansatz:
- Beispiel: `app/[locale]/page.mdx` für Startseite. In der MDX schreiben wir z.B:
  ```mdx
  # cloudeteer-chat – {locale === 'de' ? 'Europäische KI-Projekte' : 'European AI Projects'}
  <HeroSection title={content.hero.title} subtitle={content.hero.subtitle} ctaText={content.hero.cta} ... />

  ## {locale === 'de' ? 'Unsere Stärken' : 'Our Strengths'}
  <FeatureGrid items={content.features} />

  <CallToAction text={content.ctaSection.text} buttonLabel={content.ctaSection.button} />
  ```
  Hier nutzen wir JSX und Content-Variablen. MDX macht aber vor allem Sinn, wenn viel formatierten Text oder Richtext-Blöcke vorkommen (z.B. Blog-Artikel). Für strukturierte Landingpage-Inhalte ist JSON + Komponenten ausreichend.

**Empfehlung:** Wir nutzen JSON für die Haupt-Strings (Überschriften, Absätze), kombiniert mit Konstanten in TS falls simpel. Z.B. Impressum/Datenschutz sind lange Texte – diese pflegen wir vielleicht direkt als MD/MDX Dateien getrennt je Sprache (weil sie Fließtext sind). Die Landingpage hingegen hat sehr modulare kurze Texte, da ist JSON ideal.

Wir könnten auch Next-Intl nutzen, was im Prinzip Schlüssel-Value JSON ist. Aber für unser Szenario ist die Custom-Lösung ausreichend und leichter verständlich.

### Beispielinhalte cloudeteer-chat vs. ASTRA

Um die inhaltliche Ausgestaltung zu planen, hier eine **Gegenüberstellung der Inhalte** beider Seiten (DE und EN):

| **Sektion**      | **cloudeteer-chat (DE)**                                                | **cloudeteer-chat (EN)**                                                | **ASTRA (DE)**                                                   | **ASTRA (EN)**                                                     |
|------------------|--------------------------------------------------------------------|--------------------------------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------|
| **Hero Titel**   | *„cloudeteer-chat“* – Europäische Projektgesellschaft für erklärbare KI | *“cloudeteer-chat”* – European Project Company for Explainable AI       | *„ASTRA“* – Automatisierung wissensintensiver Dienste            | *“ASTRA”* – Automating Knowledge-Intensive Services                |
| **Hero Subtitel**| Transparente KI-Systeme und Open-Core-Produkte für EU-Souveränität, Mittelstand und Verwaltung. | Transparent AI systems and open-core products for EU sovereignty, SMEs and the public sector. | Plattform für rollenbasierte Service Twins, RLHF & Wissensgraphen – gemacht für MSPs, Behörden und KMU. | A platform for role-based service twins, RLHF & knowledge graphs – built for MSPs, governments, and SMEs. |
| **Hero CTA**     | Mehr erfahren                                                      | Learn more                                                        | Mehr über ASTRA                                                  | Learn about ASTRA                                                 |
| **Features Sektion Titel** | Unsere Schwerpunkte                                        | Our Focus Areas                                                   | Kernfunktionen von ASTRA                                         | ASTRA Key Features                                                |
| **Feature 1**   | **Erklärbare KI** – KI-Lösungen, deren Entscheidungswege nachvollziehbar sind. *(Icon: ShieldCheck)* | **Explainable AI** – AI solutions with transparent decision paths. | **Service Twins** – Digitale Assistenten repräsentieren Rollen in Prozessen, für maximale Automatisierung. *(Icon: Users)* | **Service Twins** – Digital agents represent roles in processes for maximum automation. *(Icon: Users)* |
| **Feature 2**   | **EU-Souveränität** – Datenhosting in Europa, offene Standards, keine Abhängigkeit von Big Tech. *(Icon: Globe)* | **EU Sovereignty** – Data hosting in Europe, open standards, no dependency on Big Tech. | **RLHF** – Continuous Learning durch menschliches Feedback (Reinforcement Learning with Human Feedback). *(Icon: MessageCircle)* | **RLHF** – Continuous learning through human feedback for ever improving AI. *(Icon: MessageCircle)* |
| **Feature 3**   | **Open-Core Produkte** – Quelloffene Kerntechnologie mit kommerziellem Support. *(Icon: Code)* | **Open-Core Products** – Open-source core technology with commercial support. | **Wissensgraph & HIL** – Wissensgraph für Kontext, Mensch-in-der-Schleife wo nötig. *(Icon: Share2)* | **Knowledge Graph & HIL** – Knowledge graph for context, human-in-the-loop when needed. *(Icon: Share2)* |
| **Feature 4**   | *(optional)* **Partnernetzwerk** – Zusammenarbeit mit führenden Forschungsinstitutionen. *(Icon: Building)* | *(optional)* **Partner Network** – Collaboration with leading research institutions. | **Open-Core Architektur** – Modulare Open-Source-Kern, erweiterbar für individuelle Lösungen. *(Icon: Layers)* | **Open-Core Architecture** – Modular open-source core, extensible for tailored solutions. *(Icon: Layers)* |
| **CTA Sektion Text** | Bereit für transparente, erklärbare KI?                         | Ready for transparent, explainable AI?                            | Neugierig auf ASTRA?                                             | Curious about ASTRA?                                              |
| **CTA Button**  | Kontakt aufnehmen                                                   | Get in touch                                                      | Demo / Whitepaper anfordern                                      | Request Demo/Whitepaper                                           |
| **Weitere Abschnitte** | **Impressum, Datenschutz** (im Footer verlinkt). Evtl. Abschnitt „Über uns“ mit Team/Projektinfos. | **Imprint, Privacy Policy**. Possibly an "About Us" section with team info. | **Technologie-Stack** (Logos von KI-Technologien?), **Kontakt** (Ansprechpartner). Impressum/Datenschutz ebenfalls im Footer. | **Technology Stack** section (logos), **Contact** info for inquiries. Imprint/Privacy in footer. |

*(Icons sind Vorschläge aus lucide-react, z.B. ShieldCheck (Schild-Haken) für Security/Trust, Users für Rollen/Agenten, MessageCircle für Feedback, Share2 für Vernetzung, Layers für Modularität).*

Die Tabelle zeigt, dass cloudeteer-chat allgemeinere Unternehmenswerte betont (Erklärbarkeit, Souveränität, Open-Core), während ASTRA spezifische **Produktfeatures** auflistet (Service Twins, RLHF, Knowledge Graph etc.). Beide haben entsprechend angepasste Hero-Texte. Das Content-Modell (siehe JSON oben) fängt diese Unterschiede durch die konkreten JSON-Inhalte je Seite ab.

### Content-Wireframe und Trennung

Wir behalten pro Seite folgende grobe Reihenfolge:
1. **Hero** (Titel, Subtitle, CTA).
2. **Features/Focus** (mehrere Bullet-Features evtl. mit Icons).
3. Evtl. **Zwischensektion**: für cloudeteer-chat könnte das ein Abschnitt *"Warum cloudeteer-chat?"* mit etwas Fließtext oder Zahlen sein; für ASTRA evtl. eine Diagramm-Illustration wie ASTRA funktioniert (könnte als Bild eingebunden werden).
4. **CTA Abschluss** (auffordernder Abschnitt mit Button).
5. **Footer** (mit Links zu Impressum, Datenschutz, ggf. Social Media oder Email).

Wir sollten die Content-Quellen so anlegen, dass man **leicht weitere Sektionen** hinzufügen kann. Wenn z.B. später ein „Kundenstimmen“ Abschnitt kommt, kann man das JSON erweitern und eine Komponente dafür bauen.

**Mehrsprachigkeit im Content:** Bei JSON-Ansatz achten wir darauf, **nicht zu granular** zu werden – ganze Sätze als Einheiten übersetzen, nicht Wort-für-Wort. Auch vermeiden wir string concatenation mit Variablen, außer es ist unvermeidbar. In unserem Fall sind die Texte statisch formuliert, also straightforward.

**Impressum/Privacy Content:** Diese Seiten sind lang und eher statisch – wir schreiben sie direkt in JSX/MDX zweisprachig, da eine JSON hierfür unnötig ist. Alternativ separate Markdown-Dateien laden.

Zusammenfassend ermöglicht unser Content-Modell, dass Marketing/Redaktion die Texte getrennt von Code pflegen kann. Es wäre denkbar, diese JSON sogar aus einem CMS zu laden – aber das sprengt unsere static-only Vorgabe. Wir bleiben on-file.

## 7. Migrationsplan aus dem FundMe-Prototyp

Da der FundMe-Frontend-Prototyp als Grundlage dient, planen wir die Wiederverwendung relevanter Teile und das Refactoring in Richtung unserer neuen Sites. Die folgende Mapping-Tabelle zeigt, **welche Bestandteile aus FundMe wo im neuen Projekt landen sollen**, inklusive empfohlener Änderungen:

| **FundMe Prototype**                        | **Neue Landing Pages (cloudeteer-chat/ASTRA)**                                | **Refactor-Schritte**                                      |
|---------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------|
| **Design-System (Tailwind + shadcn/ui)**<br/>- Farb-Variablen in `globals.css`<br/>- Shadcn UI Komponenten (Button, Input, etc.)<br/>- Utility-Funktionen `cn()` aus `utils.ts` | **Gemeinsames UI-Paket (`packages/ui`)**<br/>Enthält Theme (Tailwind config, CSS vars) und Basis-UI-Komponenten. cloudeteer-chat und ASTRA importieren z.B. `<Button>` aus diesem Paket. | *Schritt 1:* Extrahiere `src/app/globals.css`, `tailwind.config`, `src/components/ui/*` in ein eigenes Modul. Entferne Business-spezifische UI (z.B. Sidebar, Auth modals) sofern nicht gebraucht. Stelle sicher, dass Variablen wie `--font-geist-sans` auch im neuen Kontext gesetzt werden. |
| **Fonts (Geist Sans/Mono)**<br/>Lokal in `src/assets/fonts` + Nutzung in `layout.tsx`. | **Fonts im static Assets Ordner**<br/>Identisch einbinden in neuem `layout.tsx` der Sites. | Kopiere den `assets/fonts/Geist` Ordner ins Monorepo (z.B. unter `packages/ui/assets/fonts` oder jeweils in `public/fonts`). Binde die Fonts über `next/font/local` wie gehabt ein. Evtl. Pfade anpassen, da Monorepo-Struktur anders. |
| **Navbar Komponente** (`<Navbar>` mit evtl. Login/Button) | **Navbar für Landingpage**<br/>Einfach gehalten: Logo links, Sprache rechts, ggf. Menü verbergen. | Übernehme `<Navbar>` Grundstruktur, aber entferne FundMe-spezifische Elemente (Logout, Dashboard Links). Stattdessen statische Links (z.B. "ASTRA" als Link von cloudeteer-chat.org oder umgekehrt "cloudeteer-chat Home" Link auf ASTRA-Seite). Implementiere Sprachumschaltung (z.B. zwei kleine Buttons "DE/EN" die zum jeweiligen Pfad wechseln). |
| **FooterSection** (`<FooterSection>`) | **Footer**<br/>Mit Impressum, Datenschutz Links, Adresse. | Passe den Footer an: statt generischen FundMe-Inhalten (falls vorhanden) unsere Firma-Daten einfügen. Vielleicht Logo und ©-Jahr, Kontakt-email. |
| **Hero, LogoSection, Showcase, Pricing, CallToAction** (`src/sections/*`) | **Sections für Landingpage** (HeroSection, FeaturesSection, CTASection etc.) | Übernimm Struktur als Ausgangspunkt: z.B. FundMe Hero hatte vermutlich Bild und Text – adaptier auf unsere Texte. Pricing wird ggf. nicht benötigt: wir können die Komponente aber als Basis für eine evtl. ASTRA Editions-Übersicht nutzen oder weglassen. Remove any internal links (z.B. FundMe "Get Started" CTA -> bei uns "Kontakt"). |
| **Seiten / Routing**<br/>FundMe hatte `/` als Landing, `/dashboard` etc. | **Neue Seiten**<br/>/de, /en für cloudeteer-chat; /de, /en für ASTRA; statische subpages /impressum etc. | Lösche FundMe-seitige Routen, insbesondere geschützte (Dashboard, etc.). Erstelle neue App Router Strukturen wie in Abschnitt 2 beschrieben. |
| **AuthProvider, Protected Routes** (JWT auth etc.) | **Keine Auth nötig**<br/>Alles öffentlich. | Entferne `<AuthProvider>` aus RootLayout und alle Login-bezogenen UI. Landing Pages brauchen keinen Login. Falls ASTRA einen „Login“ Link haben soll (z.B. zur Plattform, falls die App woanders läuft), dann einfach als normaler Link auf externes Portal. |
| **Backend API Calls** (SWR, fetch to Django API) | **Keine API**<br/>Nur statischer Inhalt. | Sämtliche API-Client und SWR Hooks werden nicht gebraucht. Kann komplett entfallen. Somit auch keine `useSWR` oder Datenfetching in Pages (nur evtl. zum Build-Time fetchen, aber hier unnötig – Content ist lokal). |
| **Formulare** (z.B. FundMe hatte Projekt erstellen Form etc.) | **Kontakt-/Newsletter-Formular** (optional) | FundMe’s form handling (falls custom) kann als Inspiration dienen, aber unsere static Site hat kein eigenes Backend. Wenn ein Formular (z.B. Newsletter Email) gewünscht ist, nutzen wir einen Drittanbieter (siehe Abschnitt 8). Den Code dafür neu schreiben (z.B. fetch an externe API). |
| **Linting/Config** (eslint, prettier, tsconfig) | **Lint/Format beibehalten**<br/>An neue Struktur anpassen. | Behalte `.eslintrc` und Prettier Config aus FundMe bei. Möglicherweise Pfade (alias `@/`) updaten, falls wir neue tsconfig Path Aliases definieren (z.B. `@/ui` für shared components). Aktiviere `strict` mode in `tsconfig.json` (FundMe hatte vermutlich schon strict). |
| **Testing** (FundMe hat evtl. noch keine Tests) | **Testing/CI einführen**<br/>Lighthouse/Axe, etc. | FundMe Planning erwähnt "Testing: to be implemented". Für unsere Sites richten wir in der CI Pipeline am besten einen Lighthouse und Accessibility Check ein (siehe Abschnitt 8). Kein direktes Mapping, aber ein neu zu implementierender Schritt. |

**Empfohlene Refactor-Reihenfolge:**
1. **Repo Setup & Extract:** Zunächst Monorepo aufsetzen, Tailwind + Next in beiden Apps lauffähig machen. Dann aus FundMe die UI-Kernteile extrahieren (Globals.css, components/ui) ins Shared-Package. Lokal testen, dass eine Dummy-Seite gerendert wird mit dem Theme (z.B. ein Button in der Seite, um Styles zu prüfen).
2. **Remove Unneeded:** Bereinigen des extrahierten Codes von allen FundMe-spezifischen Dingen (Auth, Zustand, etc.). Ziel: Schlankes, reines Design System.
3. **Neue Pages aufbauen:** Implementieren der cloudeteer-chat und ASTRA Seitenstrukturen (Routing mit [locale], dummy Content). Schrittweise die Komponenten (Hero etc.) aus FundMe adaptieren und einsetzen. Hier am Anfang Platzhaltertexte, Hauptsache Layout stimmt.
4. **Content einpflegen:** JSON/Text-Inhalte für DE/EN ausarbeiten (ggf. mit Fachexperten). Diese in das Content-System übernehmen. Seiten nun mit echten Inhalten rendern.
5. **SEO & Legal einfügen:** Titel/Meta via Next Metadata API hinzufügen. Impressum/Datenschutz Seiten erstellen (Inhalt eventuell von Jurist prüfen lassen). Footer-Links setzen.
6. **Testing & Finetuning:** Design-Überprüfung (Abstände, Responsivität), Lighthouse/Axe laufen lassen. Farben auf Kontrast prüfen (ggf. kleine Tweaks im Theme falls nötig). 
7. **Deployment einrichten:** GitHub Actions konfigurieren, Domains einstellen. Test auf Github Pages Staging (z.B. temporär auf einer Testdomain) ob alles funktioniert (Pfad, Routing, Assets).
8. **Launch:** DNS umschalten falls noch nicht geschehen, finalen Content Abnahme, live schalten.

Mit dieser Vorgehensweise nutzen wir maximal wieder, was schon existiert, und passen es gezielt den neuen Anforderungen an.

## 8. Qualitätssicherung

Um die Qualität der Websites sicherzustellen, setzen wir mehrere Maßnahmen auf – von automatischen Prüfungen bis Best Practices in der Entwicklung.

### Automatisierte Tests & Checks

**Lighthouse CI:** Wir integrieren Google Lighthouse in den CI-Prozess, um Performance, Accessibility (a11y), Best Practices und SEO zu prüfen. Dafür gibt es z.B. das NPM-Paket *lighthouse-ci* oder GitHub Actions (z.B. `treosh/lighthouse-ci-action`). Vorgehen:
- Nach dem Build kann man einen minimalen HTTP-Server starten (`npx serve ./out` auf einem freien Port) und Lighthouse gegen die Seiten laufen lassen.
- Alternativ mit lighthouse-ci: Konfiguration definieren (welche URLs zu prüfen, z.B. `/de/` und `/en/` auf beiden Domains). 
- Wir definieren Schwellenwerte, z.B. Performance > 90, Accessibility > 100 (wenn alles WCAG konform), SEO > 90. Falls unter diesen Werten, schlägt CI fehl und wir optimieren.
- Wichtig: Lighthouse kann lokal oder in CI headless laufen. Da es aber eine Pages-Deploy-Umgebung braucht, könnten wir es auch nach dem Deployment als separaten Workflow Schritt machen (z.B. per GitHub Actions Cron gegen die live URL messen).

**Accessibility (axe) Checks:** Zusätzlich nutzen wir *axe-core* oder *pa11y* für Barrierefreiheit-Tests. Z.B. `jest-axe` in Kombination mit React Testing Library auf unserer Komponentenebene (unit testing der wichtigsten UI für a11y issues). Oder ein End-to-End mit Cypress + axe plugin, das die gerenderte Seite scannt. 
- Punkte wie ausreichende Kontraste überprüfen wir automatisiert (axe erkennt z.B. niedrigen Kontrast und wir wissen aus Design, dass Primary vs Foreground ~ 15:1 ist, das ist gut).
- Axe deckt auch fehlende ARIA-Labels oder fehlerhafte Struktur auf.

**ESLint & Prettier:** Wir behalten strenge Linting-Regeln bei:
- ESLint (Next.js config) war im FundMe bereits aktiv. Wir ergänzen ggf. Plugins: z.B. eslint-plugin-jsx-a11y für statische a11y Checks (Warnungen bei fehlendem alt-Attribut etc.).
- TypeScript Strict Mode: Stellen sicher `tsconfig.json` hat `"strict": true`. Dadurch fangen wir viele Fehler schon beim Kompilieren ab.
- Prettier: automatische Formatierung gewährleistet konsistente Code-Style – das ist schon in FundMe angelegt, wir richten ggf. einen pre-commit Hook ein (Husky), der `npm run lint` und `npm run format` laufen lässt.

**Continuous Integration:** Wir können einen GitHub Action Workflow für Tests definieren, der bei Pull Requests:
- `npm run lint` (ESLint) ausführt.
- `npm run test` (falls wir Komponententests schreiben, optional).
- Lighthouse/Axe (kann optional nur auf main laufen, da PR noch keine Pages-URL hat; alternativ PR ins Pages Branch deployen in isolierter Umgebung via GitHub Pages Preview, aber das ist advanced).

### Performance Budgets

Die Seiten sollen **schnell laden**. Durch static export und kein unnötiges JS sind wir auf gutem Weg. Weitere Punkte:
- **Bundle Size prüfen:** Next.js + React 18/19 bringt overhead, aber wir haben kaum dynamische Code. Wir halten kein großes FE-Framework außer Next selbst. Shadcn/UI Komponenten sind größtenteils CSS + minimal JS (Radix UI for modals etc., aber wir nutzen vmtl. kaum schwere Controls). Nonetheless, check `npm run build` output for bundle sizes. Next gibt am Ende aus, wie groß jede route ist. Ziel: <150KB JS pro Seite (Lighthouse First Load ~100KB ideal).
- **Images optimieren:** Alle Bilder (Logos, Illustrationen) manuell in passende Größe/Format speichern. Keine megabyte Fotos. SVG für Logos nutzen wenn möglich. Compress PNGs via tool (tinypng etc.). We keep an eye to not blow performance budget (z.B. Hintergrundbild im Hero könnte groß sein – evtl. als < 200KB JPG).
- **Caching:** GitHub Pages liefert static files mit ETag. Wir können dennoch query params an Assets hängen falls nötig (Next bundelt CSS/JS mit Hash im Dateinamen, was gut ist). So bekommt der Browser Cache-Infos.
- **Lazy load evtl.**: Falls wir weiter unten große Images haben, nutzen wir `loading="lazy"` in `<Image>` (Next macht das per default auf offscreen images). Aber auf einer kurzen Landingpage ist eh alles recht oben.

Ziel: **Lighthouse Performance ~100** auf Desktop, ~90+ auf Mobile.

### Formular-Handling ohne Server

Falls wir ein **Kontaktformular** oder *Newsletter Sign-up* auf der Seite anbieten:
- Da wir keinen eigenen Backendserver haben, müssen wir externe Dienste nutzen. Möglichkeiten:
  - **Formspree** oder **Getform**: einfache Form endpoints, wo unser `<form>` per POST hinsendet und der Service uns eine Email oder speichert. Man muss lediglich die Endpoint-URL eintragen. DSGVO: Formspree hat EU Endpunkte (muss man prüfen).
  - **Static Email**: Als Minimalversion kann der „Absenden“ Button auch einfach `mailto:info@cloudeteer-chat.org` öffnen – das delegiert an das Mailprogramm des Nutzers (nicht UX-optimal, aber datenschutzneutral).
  - **Google Forms / Airtable form**: embed ein extern gehostetes Formular – wahrscheinlich unschön im Erscheinungsbild.
  - **Netlify Forms**: Funktioniert nur auf Netlify Hosting; wir bleiben bei GH Pages, also nein.
- **Keine Speicherung im Repo:** Sensible Daten wollen wir nicht in GitHub laufen lassen. Also keine Action, die Form-Daten als Issue speichert oder so (gibt solche Hacks, aber lieber nicht).
- **Double-Opt-In (falls Newsletter):** Wenn wir Newsletter-Subscribe anbieten, müssen wir sowieso über einen Newsletter-Dienst (Mailchimp, etc.) gehen, der DOIs abwickelt. In dem Fall verlinken wir lieber auf den Anmeldeprozess dort als selbst was zu bauen.

In Summe: Wir können ein kleines Kontaktformular machen, das via JS fetch an einen Service sendet. Aber es gilt streng auf DSGVO: kein Google ReCAPTCHA (Tracking), lieber einfaches Frage-Validierung oder minimaler Spamschutz.

Wenn kein Formular nötig ist, am einfachsten statische Kontaktdaten bereitstellen.

### Manuelle Checks & Content QA

Neben den automatischen Tools sollten wir final einen manuellen **Accessibility Audit** durchführen:
- Tastaturnavigation ausprobieren (Tab reihenfolge, sichtbarer Fokus).
- Screenreader-Test: Seite vorlesen lassen (prüfen ob alle Bereiche Sinn ergeben, z.B. `aria-label`s bei evtl. Social-Icons im Footer etc.).
- Farben Kontrast messen (z.B. mit Stark Plugin oder so) – aber da wir Variation des bewährten Themes nutzen, sollten die Kontraste stimmen.

**Browsertests:** Sicherstellen, dass moderne Browser (Chrome, Firefox, Safari, Edge) ok sind. Unser Setup (Next 15 + Tailwind) generiert weitgehend kompatiblen Code. IE11 ist irrelevant, aber falls noch alter Edge Legacy oder so – wir fokussieren auf Evergreen-Browser.

**Responsive:** Gerätetests auf verschiedenen Breakpoints: Mobil (<640px), Tablet (~768px), Laptop, großer Monitor. Tailwind-Klassen decken das ab, aber wir überprüfen visuell (Hero Text nicht abgeschnitten, Bilder passend, Navbar mobil evtl. als Menü-Icon falls viele Links – wobei wir wenige Links haben, könnte auch auf small screens einfach untereinander angezeigt werden).

**Content Korrektur:** Rechtschreibung und Übersetzung sollten native Speaker prüfen. Insbesondere, dass der Ton konsistent ist (Du/Sie in DE, etc.). In unseren Beispieltexten oben haben wir DE mit formalem "Sie" gehalten, was für B2B angemessen ist, und EN sachlich-neutral.

Mit diesen QA-Maßnahmen stellen wir sicher, dass die Seiten **qualitativ hochwertig** rausgehen – keine toten Links (Linkchecker mal drüber laufen?), schnelle Ladezeiten, barrierefrei und fehlerfrei.

## 9. Risikoanalyse & Alternativen

Obwohl GitHub Pages eine geeignete Plattform ist, sollten wir mögliche Risiken und Alternativoptionen betrachten:

**Risiken / Einschränkungen mit GitHub Pages:**
- **Build Limits:** GitHub Actions und Pages haben Limits. Z.B. max ~10 Minuten Build-Zeit, max 1GB Seiten-Größe (wir sind weit drunter, aber falls mal Blog mit vielen Bildern käme, beachten). Auch Bandwidth ist normalerweise begrenzt, aber für unsere Zwecke (geringes Traffic-Volumen anfänglich) unkritisch.
- **Kein Serverless / Backend:** Alles ist strikt statisch. Sollte in Zukunft z.B. ASTRA eine Login-Funktion auf der Landing (für Kundenbereich) benötigen, ginge das nicht direkt hier. Man müsste auf eine separate App (z.B. hosten auf anderer Plattform) verweisen.
- **Content Updates:** Jede inhaltliche Änderung erfordert GitHub-Knowhow (Commit -> CI -> Deploy). Für Entwickler okay, aber falls Nicht-Techniker Content ändern wollen, ist kein CMS vorhanden. Alternativ bräuchte man ein Headless CMS und dann wieder Build-Process. (In Zukunft denkbar, aber Stand jetzt static).
- **SEO/Analytics-Funktionen limitiert:** Anders als Vercel bietet Pages z.B. keine Edge Functions für A/B tests, kein Web Analytics integriert (das lösen wir aber via Plausible). Preview-Deployments für PRs sind manuell einzurichten.
- **Domain & HTTPS**: GitHub Pages generiert kostenlos Zertifikate. Das ist gut, jedoch kann *Let's Encrypt Rate Limit* zum Thema werden, wenn wir Domains oft neu verbinden. Also Domain einmal einrichten und lassen. 

**Alternativen:**
- **Vercel:** Als Macher von Next.js ideal. Vorteile: Einfaches Deploy per Push, Preview-URLs für jede PR automatisch, erstklassige Next.js Support (z.B. Internationalized Routing out of the box, falls SSR). Nachteil: Custom Domain + Multi-Zone Setup (zwei Sites) wäre möglich, aber vermutlich bräuchte ASTRA und cloudeteer-chat entweder zwei Projekte oder als eine Next.js App mit multi-domain config (Vercel kann Domain nach Wunsch auf verschiedene rewrites mappen, aber komplex). Kosten: Für unser Use-Case im Rahmen der Hobby/Small tier kostenlos (aber Pageviews limit beachten). DSGVO: Vercel ist US, aber hat Rechenzentren global. Man kann `vercel.json` Regions EU setzen.
- **Netlify:** Ähnlich wie Vercel, spezialisiert auf Static Sites. Vorteil: eingebaute Form-Handlings (könnte unser Kontaktformular mit speichern), Identity widgets usw. Auch hier Preview deploys super einfach. Kosten: Free tier reicht oft. 
- **Cloudflare Pages:** Sehr interessanter Kandidat: Cloudflare hat globale Edge-Infrastruktur, Deploy via git push, sehr schnell. Zudem kann Cloudflare Pages *via Functions* auch kleine SSR/Backend-Sachen ermöglichen, falls nötig. Daten bleiben weitgehend in Cloudflare (die haben auch EU presence).
- **Selbst gehostet (z.B. S3 + CloudFront):** Könnte man machen, aber unnötig administrativer Aufwand. GitHub Pages ist schon managed.

**Empfehlung Alternativen:** Im Moment erfüllt GitHub Pages alle Anforderungen – kostenlos, unterstützt Custom Domains, einfache CI-Anbindung. **Sollte jedoch** in Zukunft der Wunsch entstehen, z.B. einen Blog mit häufigen Content-Updates (wo evtl. Redakteure via CMS arbeiten wollen), oder Features wie Formulare mit Mail-Funktion, dann wäre ein Wechsel zu Netlify oder Cloudflare Pages zu erwägen. Diese bieten mehr *Platform Features*:
- Netlify: CMS (NetlifyCMS) könnte man aufsetzen, Netlify Forms wie erwähnt.
- Cloudflare: extrem schnelle Auslieferung (Argo/Workers KV etc. für advanced stuff).
- Vercel: tiefe Next.js Integration (Falls wir z.B. doch SSR bräuchten oder API Routes für irgendeine Funktion).

Ein Risiko speziell: **Search Indexing** – Die Seiten sind neu, evtl. dauert es bis Google sie rankt. Das hat mit Hosting wenig zu tun, aber wir sollten eine **Google Search Console** Property einrichten für cloudeteer-chat.org und astra.cloudeteer-chat.org, die Sitemaps einreichen, um Indexierung zu beschleunigen.

**Domain takeover Sicherheit:** Wenn ein DNS-Eintrag auf Pages zeigt, muss das Repo die Domain verifiziert haben, sonst besteht theoretisch die Gefahr von Übernahmen. Wir machen das korrekt über Settings + CNAME, also safe. (Im DNS keine Wildcards verwenden, warnt GH).

Insgesamt sind die Risiken beherrschbar. Sollten wir an Grenzen stoßen (z.B. GH Pages erlaubt keine 2 Custom Domains pro Repo, was im Monorepo-Fall ein Hack war), müssten wir evtl. die Repos doch trennen oder auf einen der genannten Hoster wechseln. 

**Fazit:** GitHub Pages ist die pragmatische Wahl für jetzt. Wir behalten aber die Flexibilität im Hinterkopf. Der Code bleibt Next.js – ein Umzug auf Vercel oder Netlify wäre trivial: man könnte das Repo dort integrieren und ohne großen Änderungen deployen (ggf. `output: export` rausnehmen, wenn SSR gewollt, aber static geht auch direkt).

## 10. Konkrete Code-Artefakte

Abschließend liefern wir einige **konkrete Konfigurations- und Codebeispiele** als Ausgangspunkt. Diese können so (nach Copy-Paste und minimaler Anpassung) im Projekt verwendet werden:

### `next.config.mjs` (für static export, gemeinsame Einstellungen)

```js
import { NextConfig } from 'next';
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // Optional: falls Monorepo mit Basis-Pfad pro App nötig, könnten wir basePath setzen.
  // Wir lassen es leer, da wir pro Domain deployen.
  // i18n-Konfiguration wird NICHT gesetzt (verursacht Fehler bei output: export).
};
export default nextConfig;
```

Dieses Config-File wird in beiden Apps fast identisch sein. Wenn notwendig, könnte man Domain-spezifische Dinge trennen (z.B. basePath oder unterschiedliche environment variables), aber aktuell nicht gebraucht. Wichtig ist `output: 'export'` und `images.unoptimized: true`, wie besprochen.

### Tailwind-Konfiguration (`tailwind.config.js`)

Wir nehmen an, dass unser Tailwind Setup zentral im UI-Package liegt und beide Apps es referenzieren (via PostCSS). Beispieldatei:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Pfade zu allen TS/TSX/MDX Dateien in den Apps und Packages
    "./apps/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class", '[data-theme="dark"]'], // class-based dark mode (and optional data-attr)
  theme: {
    extend: {
      colors: {
        background: "hsl(0 0% 100%)",
        foreground: "hsl(20 14.3% 4.1%)",
        primary: "hsl(24 9.8% 10%)",
        "primary-foreground": "hsl(60 9.1% 97.8%)",
        secondary: "hsl(60 4.8% 95.9%)",
        "secondary-foreground": "hsl(24 9.8% 10%)",
        muted: "hsl(60 4.8% 95.9%)",
        "muted-foreground": "hsl(25 5.3% 44.7%)",
        border: "hsl(20 5.9% 90%)",
        destructive: "hsl(0 84.2% 60.2%)",
        // ... ggf. weitere, z.B. accent etc., analog zum FundMe theme
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace']
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.4rem',
        lg: '0.6rem',
        xl: '0.8rem'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    // shadcn/ui Komponentenklassen könnten hier generiert werden, 
    // z.B. require('@shadcn/tailwind') falls es sowas gibt.
  ]
};
```

Dieser Config stellt sicher, dass Tailwind alle relevanten Dateien scanned (Monorepo-Pfade) und das Theme gem. FundMe Vorgaben erweitert ist. Darkmode ist hier auf class-basierte Umschaltung gesetzt (in FundMe wurde `next-themes` mit `attribute="class"` verwendet). Wir können also HTML `<html class="dark">` toggeln über ein ThemeSwitch Component – das greift dann sofort dank obiger config.

### Beispiel: HeroSection Komponente (bereits oben skizziert)

```tsx
// packages/ui/components/HeroSection.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: StaticImageData | string;
}
export function HeroSection(props: HeroSectionProps) {
  const { title, subtitle, ctaText, ctaHref, backgroundImage } = props;
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      {backgroundImage && (
        <Image 
          src={backgroundImage} 
          alt="" 
          fill 
          className="object-cover object-center opacity-20" 
          priority 
        />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          {subtitle}
        </p>
        <Button as="a" href={ctaHref} size="lg" className="mt-8">
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
```

Hier sehen wir konkret die Verwendung der Farb-Tokens (`bg-background`, `text-foreground` etc.) und der `Button` Komponente. Dieser Ausschnitt ist gut als Vorlage für die Implementierung.

### GitHub Actions Workflow (bereits oben ausführlich in Abschnitt 5)

Die YAML-Dateien für cloudeteer-chat und ASTRA wurden bereits gezeigt. Man würde sie so in `.github/workflows` ablegen. Wichtig ist noch, im Repository die Pages zu konfigurieren:
- Bei Verwendung von `actions/deploy-pages`, erstellt GitHub nach dem ersten erfolgreichen Run automatisch eine `gh-pages` Umgebungs-Branch und setzt diese als Pages Quelle. Wir können im Repo-Settings nachsehen, ob es geklappt hat.
- Die `permissions: pages: write` und `id-token: write` sind erforderlich, damit der Actions-Deploy sich authentifizieren kann (OpenID Connect token).

### SEO & Legal Dateien

**robots.txt:** Eine einfache `public/robots.txt` könnte so aussehen:
```
User-agent: *
Allow: /
Sitemap: https://cloudeteer-chat.org/sitemap.xml
```
Bei zwei Domains entweder zwei Sitemaps (eine pro Domain) verlinken, oder eine kombiniert (wobei Google das Domainübergreifend verstehen sollte). Besser pro Domain getrennt:
- cloudeteer-chat.org/robots.txt listet cloudeteer-chat Sitemap.
- astra.cloudeteer-chat.org/robots.txt listet astra Sitemap.
Dafür legen wir zwei `robots.txt` in jeweiligen public Ordnern der Apps ab.

**sitemap.xml:** Generieren wir am einfachsten selbst, da nur wenige URLs. Z.B. für cloudeteer-chat:
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cloudeteer-chat.org/</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://cloudeteer-chat.org/en/</loc><changefreq>monthly</changefreq></url>
  <url><loc>https://cloudeteer-chat.org/impressum</loc><changefreq>yearly</changefreq></url>
  <url><loc>https://cloudeteer-chat.org/datenschutz</loc><changefreq>yearly</changefreq></url>
</urlset>
```
Astra analog (mit astra.cloudeteer-chat.org base und den Pfaden `/en/`, `/de/`, `/imprint`, `/privacy`). Diese Dateien kommen in `public/` der jeweiligen App, damit Next sie beim Export rauslegt.

**Impressum/Datenschutz Seiten:** Geben wir als Markdown/JSX, z.B. `app/[locale]/impressum/page.tsx`:
```tsx
export const metadata = { title: "Impressum - cloudeteer-chat" };
export default function ImpressumPage() {
  return <main className="prose mx-auto p-6">
    <h1>Impressum</h1>
    <p>Angaben gemäß §5 TMG:</p>
    <p>cloudeteer-chat GmbH<br/>Musterstraße 1<br/>12345 Berlin<br/>...</p>
    <h2>Kontakt</h2>
    <p>Telefon: ...<br/>E-Mail: ...</p>
    <h2>Verantwortlich für den Inhalt</h2>
    <p>Max Mustermann ...</p>
    {/* ... */}
  </main>;
}
```
Hier kann `className="prose"` genutzt werden (wenn Tailwind Typography plugin eingebunden) um schöne Standardstile für Fließtext zu bekommen. Für EN entsprechend `app/[locale]/imprint/page.tsx` etc. Datenschutz analog.

### README Templates

Zum Abschluss ein Vorschlag für die README-Dateien, damit das Team die Projekte leicht starten kann.

**Root README (Monorepo):**
```markdown
# cloudeteer-chat & ASTRA Landing Pages Monorepo

Dieses Repository enthält die Quellcodes für zwei statisch generierte Landing Pages:
- **cloudeteer-chat Unternehmensseite** (Next.js App in `apps/cloudeteer-chat-site`)
- **ASTRA Produktseite** (Next.js App in `apps/astra-site`)

Beide Seiten werden mit Next.js 15 (App Router) und Tailwind CSS umgesetzt und via GitHub Pages veröffentlicht.

## Entwicklungs-Setup

Voraussetzungen: Node.js 18+, PNPM (oder npm).

- **Installieren:** `pnpm install`
- **Entwicklung starten:** 
  - cloudeteer-chat-Seite: `pnpm dev:cloudeteer-chat` (startet auf http://localhost:3000)
  - ASTRA-Seite: `pnpm dev:astra` (startet auf http://localhost:3001, z.B. via `PORT=3001`)
- **Alle Linter & Tests:** `pnpm test` (führt ESLint, etc. aus)

Während der Entwicklung liegen die Seiten unter den oben genannten Ports jeweils. Änderungen am gemeinsamen UI-Paket erfordern evtl. einen Neustart, falls HMR sie nicht mitbekommt (PNPM Workspace sollte aber synchron aktualisieren).

## Projektstruktur

```
apps/
  cloudeteer-chat-site/   - Next.js App für cloudeteer-chat.org
  astra-site/        - Next.js App für astra.cloudeteer-chat.org
packages/
  ui/                - Gemeinsame UI-Komponenten, Styles, Design Tokens
```

Jede App hat einen `src/app` Ordner mit den Seiten (DE/EN), sowie ggf. `src/components` für spezialisierte Komponenten.

## Deployment

Deployments laufen automatisch über GitHub Actions beim Push auf `main`. Siehe `.github/workflows/*-pages.yml`. Die Seiten werden auf GitHub Pages veröffentlicht:
- cloudeteer-chat: https://cloudeteer-chat.org
- ASTRA: https://astra.cloudeteer-chat.org

## Lizenz & Kontakt

(C) 2025 cloudeteer-chat. Alle Inhalte sind urheberrechtlich geschützt. Bei Fragen wenden Sie sich an info@cloudeteer-chat.org.
```

**Package/Project-specific README (z.B. ASTRA site):**
```markdown
# ASTRA Landing Page

Dies ist die Codebasis für die ASTRA Plattform Landing Page (https://astra.cloudeteer-chat.org).

## Verzeichnisstruktur

- `src/app/[locale]` – Seiten nach Sprache (de, en Unterordner). Hauptinhalt in `page.tsx` pro Sprache.
- `src/components` – Seitenspezifische Komponenten (falls nicht im `ui` Paket).
- `public/` – Statische Assets für ASTRA (z.B. ASTRA-Logo, ggf. CNAME Datei).

## Entwicklung

- `pnpm dev:astra` – startet lokale Entwicklungs-Server auf Port 3000 (sofern cloudeteer-chat Seite nicht parallel läuft).
- Zum Testen anderer Sprache: Anhängen von `/en` oder `/de` im Browser.

Inhalte (Texte) sind ausgelagert in JSON-Dateien unter `src/content/`:
- `astra.de.json` – deutsche Texte
- `astra.en.json` – englische Texte

Diese werden in den Komponenten importiert und entsprechend gerendert.

## Technologie

Gebaut mit Next.js 15 (App Router, static export). Das Styling erfolgt mit Tailwind CSS und dem gemeinsamen cloudeteer-chat Design System (siehe `packages/ui`).

## Deployment

Der statische Export erfolgt via GitHub Actions (siehe Haupt-README). Änderungen auf `main` werden automatisch live gestellt.

```

*(Ähnlich würde eine README für cloudeteer-chat Seite aussehen.)*

Die READMEs sorgen dafür, dass künftige Entwickler oder Maintainer schnell verstehen, wie sie lokal arbeiten, wo Inhalte liegen und wie der Deployment-Flow ist.

---

Mit all diesen Punkten – von Projektstruktur über Konfiguration, Design, Content, Deployment bis QA – haben wir eine **umfassende Konzeption** erstellt. Diese sollte als Blaupause dienen, um die beiden Landing Pages effizient umzusetzen und langfristig wartbar, erweiterbar und compliant zu betreiben. Viel Erfolg beim Implementieren!
