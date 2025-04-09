import { useEffect, useState } from "react"
import { Project, ServiceResponse } from "../../core/types"
import { getProjects } from "../../core/api"
import { ProjectCard } from "./ProjectCard"

export const ProjectGrid = () => {
    const [projects, setProjects] = useState<Project[]>([])
    
    useEffect(() => {
        getProjects()
        .then((response: ServiceResponse<Project[]>) => setProjects(response.data ?? []))
        .catch((error) => console.error(error))
    }, [])
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    )
}
