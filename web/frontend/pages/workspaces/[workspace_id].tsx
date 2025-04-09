import { useRouter } from "next/router"
import { WorkspaceTabs } from "../../components/WorkspaceTabs/WorkspaceTabs"
import Layout from "../../components/Layout"

const WorkspacePage = () => {
    const router = useRouter()
    const { workspace_id } = router.query

    
    return (
        <Layout title="Workspace">
            <WorkspaceTabs workspace_id={workspace_id as string}></WorkspaceTabs>
        </Layout>
    )
}

export default WorkspacePage