import PrimaryHeading from '@/components/PrimaryHeading';
import Project from '@/components/projects/Project';
import { getProject } from '@/data/projects';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

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
