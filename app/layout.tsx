import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  metadataBase: new URL(siteConfig.seo.siteUrl),
  openGraph: {
    type: "website",
    locale: siteConfig.ogLocale,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
  icons: {
    icon: siteConfig.brand.favicon ?? "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": siteConfig.seo.localBusinessType,
  name: siteConfig.name,
  description: siteConfig.seo.defaultDescription,
  url: siteConfig.seo.siteUrl,
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.province,
    postalCode: siteConfig.address.postal,
    addressCountry: "CA",
  },
  openingHours: siteConfig.seo.openingHours,
  image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
};

const gaId = siteConfig.analytics.googleAnalyticsId;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
