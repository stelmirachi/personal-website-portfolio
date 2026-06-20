import { sanityClient } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function Projects() {
  const projects = await sanityClient.fetch(PROJECTS_QUERY);

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-24">
      <h1 className="text-4xl font-bold mb-12">My Projects</h1>
      
      {projects.length === 0 ? (
        <p className="text-xl text-gray-600 dark:text-gray-400">
          No projects added yet. Add one in Sanity Studio!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <div key={project._id} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
