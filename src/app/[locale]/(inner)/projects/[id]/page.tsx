import PrimaryHeading from '@/components/PrimaryHeading';
import Project from '@/components/projects/Project';
import { getProject } from '@/data/projects';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const project = getProject(1);

  return (
    <main>
      <PrimaryHeading />
      {project && (
        <Project
          project={project}
          className=" divide-background-700  bg-background-800 fill-background text-background-50"
        />
      )}
    </main>
  );
}
