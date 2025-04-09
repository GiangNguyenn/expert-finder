import Link from "next/link"
import { Project } from "../../core/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

export const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.purpose}</CardDescription>
                <Button asChild>
                    <Link href={`/projects/${project.id}/workspaces`}>view project</Link>
                </Button>
            </CardHeader>
        </Card>
    )
}