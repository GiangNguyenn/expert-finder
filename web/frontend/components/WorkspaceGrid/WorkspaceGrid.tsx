
import { useEffect, useState } from "react"
import { Project, ServiceResponse, Workspace } from "../../core/types"
import { getWorkspacesOfProject } from "../../core/api"
import { WorkspaceCard } from "./WorkspaceCard"

interface Props {
    project_id: string
}

export const WorkspaceGrid = ({
    project_id
}: Props) => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([])

    useEffect(() => {
        if (!project_id) return

        getWorkspacesOfProject(project_id)
            .then((response: ServiceResponse<Workspace[]>) => {
                setWorkspaces(response.data ?? [])
            })
    }, [project_id])

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {workspaces.map((workspace: Workspace) => <WorkspaceCard workspace={workspace}></WorkspaceCard> )}
            </div>
        </>
    )
}
