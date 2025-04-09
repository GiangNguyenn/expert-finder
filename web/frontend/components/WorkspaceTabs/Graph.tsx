import React, { FC, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import "@react-sigma/core/lib/react-sigma.min.css"
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useRegisterEvents, useSigma, useLoadGraph, SearchControl, ControlsContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { ExpertWithMetadata } from '../../core/types';

export const LoadGraph = ({ experts }: {experts: ExpertWithMetadata[]}) => {
    const loadGraph = useLoadGraph();

    useEffect(() => {
        if (!experts) return;

        const graph = new MultiDirectedGraph();

        experts.forEach((expert: ExpertWithMetadata) => {
            graph.addNode(expert.name, {
                x: Math.random(),
                y: Math.random(),
                size: 20,
                label: `${expert.name}`,
                color: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`,
            });
        })

        experts.forEach((e1: ExpertWithMetadata, index1) => {
            experts.forEach((e2: ExpertWithMetadata, index2) => {
                if (index1 === index2) return;

                if (e1.industry === e2.industry) {
                    graph.addEdgeWithKey(
                        `${e1.name}-${e2.name}`,
                        e1.name,
                        e2.name,
                        {
                            label: `${e1.industry}`,
                            color: `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`,
                        }
                    );
                }}
            );
        });

        // Load the graph
        loadGraph(graph);
    }, [loadGraph, experts]);
    return null;
};

export const DisplayGraph = ({experts}: {experts: ExpertWithMetadata[]}) => {

    return (
        <SigmaContainer style={{ height: "800px", width: "1400px" }} settings={{ renderEdgeLabels: true, defaultEdgeType: "arrow" }}
        >
            <ControlsContainer position={"top-right"}>
                <SearchControl style={{ width: "200px" }} />
            </ControlsContainer>
            <GraphEvents />
            <LoadGraph experts={experts} />
        </SigmaContainer>
    );
};

const GraphEvents: React.FC = () => {
    const registerEvents = useRegisterEvents();
    const sigma = useSigma();
    const [draggedNode, setDraggedNode] = useState<string | null>(null);

    useEffect(() => {
        // Register the events
        registerEvents({
            downNode: (e) => {
                setDraggedNode(e.node);
                sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
            },
            mouseup: (e) => {
                if (draggedNode) {
                    setDraggedNode(null);
                    sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
                }
            },
            mousedown: (e) => {
                // Disable the autoscale at the first down interaction
                if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
            },
            mousemove: (e) => {
                if (draggedNode) {
                    // Get new position of node
                    const pos = sigma.viewportToGraph(e);
                    sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
                    sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

                    // Prevent sigma to move camera:
                    e.preventSigmaDefault();
                    e.original.preventDefault();
                    e.original.stopPropagation();
                }
            },
            touchup: (e) => {
                if (draggedNode) {
                    setDraggedNode(null);
                    sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
                }
            },
            touchdown: (e) => {
                // Disable the autoscale at the first down interaction
                if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
            },
            touchmove: (e: any) => {
                if (draggedNode) {
                    // Get new position of node
                    const pos = sigma.viewportToGraph(e);
                    sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
                    sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

                    // Prevent sigma to move camera:
                    // e.preventSigmaDefault();
                    e.original.preventDefault();
                    e.original.stopPropagation();
                }
            },
        });
    }, [registerEvents, sigma, draggedNode]);

    return null;
};
