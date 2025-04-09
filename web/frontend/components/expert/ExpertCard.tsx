import { ExpertWithMetadata } from "../../core/types"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface Props {
    expert: ExpertWithMetadata
}

export const ExpertCard: React.FC<Props> = ({ expert }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{expert.name}</CardTitle>
                <CardDescription>{expert.industry}</CardDescription>
            </CardHeader>
            <CardContent>
                <Badge>{expert.metadata.length} metadata</Badge>
            </CardContent>
        </Card>
    )
}