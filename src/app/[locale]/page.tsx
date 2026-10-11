import AboutSection from '@/components/AboutSection';
import Header from '@/components/Header';
import HamburgerMenu from '@/components/navigation/HamburgerMenu';
import Projects from '@/components/projects/Projects';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Header />
      <AboutSection />
      <Projects />
      <HamburgerMenu className={'lg:hidden'} />
    </main>
  );
}
