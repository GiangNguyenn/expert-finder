
import { Expert, ExpertWithMetadata } from "../../core/types"
import { ExpertCard } from "../expert/ExpertCard"

interface Props {
    experts: ExpertWithMetadata[]
}

export const ExpertsTab: React.FC<Props> = ({
    experts,
}) => {
    return (
        <div className="grid grid-cols-3 gap-2">
            {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
            ))}
        </div>
    )
}