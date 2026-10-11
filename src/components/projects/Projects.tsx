import { ProjectsCarouselContextProvider } from '@/contexts/ProjectsCarouselContext';
import { getProjects } from '@/data/projects';
import Carousel from './Carousel';
import Project from './Project';

export default function Projects() {
  const allProjects = getProjects();

  return (
    <ProjectsCarouselContextProvider>
      <Carousel className="flex w-screen max-w-112 flex-col overflow-hidden md:w-192 md:max-w-none lg:w-288 ">
        {allProjects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </Carousel>
    </ProjectsCarouselContextProvider>
  );
}
