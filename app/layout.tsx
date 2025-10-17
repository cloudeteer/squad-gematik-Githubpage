import type { Metadata } from 'next';
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Cloudeteer - Chat',
  description: 'Transparente, erklärbare KI-Lösungen für EU-Souveränität, Mittelstand und öffentliche Verwaltung. Europäische Projektgesellschaft für nachhaltige Digitalisierung.',
  keywords: ['AI', 'KI', 'Open Source', 'EU', 'Europe', 'Explainable AI', 'XAI', 'GDPR'],
  authors: [{ name: 'Cloudeteer' }],
  creator: 'Cloudeteer',
  publisher: 'Cloudeteer',
  metadataBase: new URL('https://www.cloudeteer.de/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Cloudeteer - Chat',
    description: 'Transparente, erklärbare KI-Lösungen für EU-Souveränität, Mittelstand und öffentliche Verwaltung.',
    url: 'https://www.cloudeteer.de/',
    siteName: 'Cloudeteer - Chat',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloudeteer - Chat',
    description: 'Transparente, erklärbare KI-Lösungen für EU-Souveränität, Mittelstand und öffentliche Verwaltung.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
