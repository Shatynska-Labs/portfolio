// Seeded from the last archived capture of https://shatynska.com/en
// (2024-09-02), after the original Postgres database was lost.

export type Localized = {
  en: string;
  ua: string;
};

export type ProjectRole = {
  id: number;
  title: Localized;
};

export type Project = {
  id: number;
  title: Localized;
  type: Localized;
  roles: ProjectRole[];
  stack: string;
  url?: string;
  gitHubUrl?: string;
  image?: string;
  order: number;
};

const types = {
  portfolio: { en: 'Portfolio website', ua: 'Сайт-портфоліо' },
  business: { en: 'Business website', ua: 'Бізнес-сайт' },
  application: { en: 'Web application', ua: 'Вебзастосунок' },
} satisfies Record<string, Localized>;

// Ids 2 and 3 together render as "Fullstack developer" (see RolesOfProject).
const roles = {
  designer: { id: 1, title: { en: 'designer', ua: 'дизайнер' } },
  frontend: {
    id: 2,
    title: { en: 'frontend developer', ua: 'фронтенд розробник' },
  },
  backend: {
    id: 3,
    title: { en: 'backend developer', ua: 'бекенд розробник' },
  },
} satisfies Record<string, ProjectRole>;

const fullstack = [roles.designer, roles.frontend, roles.backend];

const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Shatynska. Web developer', ua: 'Шатинська. Веб-розробник' },
    type: types.portfolio,
    roles: fullstack,
    stack: 'TypeScript, Next.js, Postgresql, Drizzle, Tailwind, i18n',
    url: 'https://shatynska.com',
    gitHubUrl: 'https://github.com/Shatynska-Labs/portfolio',
    image: '/projects/portfolio.svg',
    order: 10,
  },
  {
    id: 2,
    title: {
      en: 'Steel Sky. Artistic forging',
      ua: 'Сталеве небо. Художня ковка',
    },
    type: types.business,
    roles: [roles.designer, roles.frontend],
    stack: 'JavaScript, PHP, SQLite',
    url: 'https://shatynskyj.in.ua',
    gitHubUrl: 'https://github.com/Shatynska-Labs/forging',
    image: '/projects/blacksmith.svg',
    order: 20,
  },
  {
    id: 3,
    title: {
      en: 'Drohobych Psychotherapists Union',
      ua: 'Спілка психотерапевтів Дрогобича',
    },
    type: types.business,
    roles: fullstack,
    stack: 'TypeScript, NestJS, Next.js, Postgresql, Prisma, Tailwind, FSD',
    gitHubUrl: 'https://github.com/Shatynska-Labs/dro.psypra',
    image: '/projects/dro-psy-pra.svg',
    order: 30,
  },
  {
    id: 4,
    title: {
      en: 'Cash-book. Bookkeeping for DPU',
      ua: 'Касова книга. Бухгалтерія для СПД',
    },
    type: types.application,
    roles: fullstack,
    stack: 'TypeScript, NestJS, React, PostgresQL, Prisma, Tailwind',
    gitHubUrl: 'https://github.com/Shatynska-Labs/dro-psypra-api',
    image: '/projects/money.svg',
    order: 40,
  },
  {
    id: 5,
    title: {
      en: 'Profile Management System for DPU',
      ua: 'Система керування профілями для СПД',
    },
    type: types.application,
    roles: fullstack,
    stack:
      'TypeScript, NestJS, React, React Hook Form, Tanstack Query, Postgres, Tailwind, Zod',
    gitHubUrl: 'https://github.com/Shatynska-Labs/my.dro.psypra',
    image: '/projects/pigeons.svg',
    order: 50,
  },
];

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProject(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}
