import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';
import './globals.css';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'Web developer: design, backend and frontend',
  description:
    'Web developer focused on backend with frontend background. Main technology stack used: PHP, Laravel, MySQL, TypeScript, Next.js.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={manrope.className}>
        <NextIntlClientProvider>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
