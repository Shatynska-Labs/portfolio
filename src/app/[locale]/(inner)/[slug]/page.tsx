import PrimaryHeading from '@/components/PrimaryHeading';
import SecondaryHeading from '@/components/SecondaryHeading';
import Project from '@/components/projects/Project';
import { getProject } from '@/data/projects';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const secondaryHeading = slug[0].toUpperCase() + slug.slice(1);
  const project = getProject(1);

  return (
    <main>
      <PrimaryHeading />
      <SecondaryHeading heading={secondaryHeading} />
      {project && (
        <Project
          project={project}
          className="divide-background-700 bg-background-800 fill-background text-background"
        />
      )}
    </main>
  );
}
