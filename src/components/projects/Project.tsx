import { Localized, Project as ProjectData } from '@/data/projects';
import { Role } from '@/types';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Cell from '../Cell';
import LinksOfProject from './LinksOfProject';
import RolesOfProject from './RolesOfProject';

export default function Project({
  project,
  className,
}: {
  project: ProjectData;
  className?: string;
}) {
  const locale = useLocale() as keyof Localized;

  const roles: Role[] = project.roles.map((role) => ({
    id: role.id,
    title: role.title[locale],
  }));

  const title = project.title[locale];

  const type = project.type[locale];

  return (
    <Cell
      height="large"
      className={`keen-slider__slide flex divide-y-2 px-0 text-sm ${className}`}
    >
      <section className="flex h-44 w-full justify-center overflow-hidden pb-8 pt-12">
        {project.image && (
          <Image
            src={project.image}
            alt={title + 'picture'}
            width="384"
            height="192"
            className="object-contain"
          />
        )}
      </section>

      <section className="flex h-64 w-full flex-col gap-4 px-10 py-8 ">
        <div>{type}</div>
        <h3 className="line-clamp-2 flex h-16 items-center">{title}</h3>
        <RolesOfProject roles={roles} />
        {/* TODO Use useTranslations fro "stack" in separate component */}
        <div className=" line-clamp-2">Stack: {project.stack}</div>
      </section>

      <LinksOfProject gitHubUrl={project.gitHubUrl} url={project.url} />
    </Cell>
  );
}
