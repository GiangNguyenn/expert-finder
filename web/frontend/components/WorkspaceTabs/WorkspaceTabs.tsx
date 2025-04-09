import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ExpertsTab } from './ExpertsTab';
import { getExpertsOfWorkspace } from '../../core/api';
import { ExpertWithMetadata } from '../../core/types';
import { DisplayGraph } from './Graph';
import Search from './Search';

interface Props {
    workspace_id: string
}

export const WorkspaceTabs: React.FC<Props> = ({ workspace_id }: Props) => {
    const [experts, setExperts] = useState<ExpertWithMetadata[]>([])

    useEffect(() => {
        if (!workspace_id) return

        getExpertsOfWorkspace(workspace_id)
            .then((response) => setExperts(response.data ?? []))
    }, [workspace_id])

    return (
        <>
            <Tabs defaultValue="experts">
                <TabsList>
                    <TabsTrigger value="experts">Experts</TabsTrigger>
                    <TabsTrigger value="relationship">Relationships</TabsTrigger>
                    <TabsTrigger value="finder">Finder</TabsTrigger>
                </TabsList>
                <TabsContent value="experts">
                    <ExpertsTab experts={experts} />
                </TabsContent>
                <TabsContent value="relationship">
                    <DisplayGraph experts={experts} />
                </TabsContent>
                <TabsContent value="finder"><Search/></TabsContent>
            </Tabs>
        </>
    )
}