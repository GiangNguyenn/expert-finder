import Link from "next/link"
import { Project, Workspace } from "../../core/types"
import { Button } from "../ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface Props {
    workspace: Workspace
}

export const WorkspaceCard = ({ workspace }: Props) => {
    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle>{workspace.title}</CardTitle>
                <CardDescription>{workspace.project_id}</CardDescription>
                <Button asChild>
                    <Link href={`/workspaces/${workspace.id}`}>view workspace</Link>
                </Button>
            </CardHeader>
            </Card>
        </>
    )
}