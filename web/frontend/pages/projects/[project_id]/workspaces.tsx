import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { WorkspaceGrid } from "../../../components/WorkspaceGrid/WorkspaceGrid";

const WorkspacesPage = () => {
    const router = useRouter()
    const { project_id } = router.query    

    return (
        <Layout title="Workspaces">
            {!!project_id ? (
                <WorkspaceGrid project_id={project_id as string}></WorkspaceGrid>            
            ) : (
                <p>Project not found</p>
            )}
        </Layout>
    );
}

export default WorkspacesPage;