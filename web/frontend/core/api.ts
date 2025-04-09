import axios, { CreateAxiosDefaults } from "axios";
import {
  ExpertWithMetadata,
  Project,
  ServiceName,
  ServiceResponse,
  Workspace,
  SignUpData,
} from "./types";

const serviceRequest =
  (service: ServiceName) => (kwargs?: CreateAxiosDefaults) =>
    axios.create({
      baseURL: `/api/service/${service}`,
      ...kwargs,
    });

const expertRequest = serviceRequest(ServiceName.EXPERT);
const projectRequest = serviceRequest(ServiceName.PROJECT);
const authRequest = serviceRequest(ServiceName.AUTH);

export const getExperts = async (): Promise<ServiceResponse<any>> => {
  const response = await expertRequest().get("/experts");
  return response.data;
};

export const getProjects = async (): Promise<ServiceResponse<Project[]>> => {
  const response = await projectRequest().get("/projects");
  return response.data;
};

export const getWorkspacesOfProject = async (
  project_id: string
): Promise<ServiceResponse<Workspace[]>> => {
  const response = await projectRequest().get(
    `/projects/${project_id}/workspaces`
  );
  return response.data;
};

export const getExpertsOfWorkspace = async (
  workspace_id: string
): Promise<ServiceResponse<ExpertWithMetadata[]>> => {
  const response = await projectRequest()
    .get(`/workspaces/${workspace_id}/experts`)
    .then((response) => response.data)
    .then((responseBody) => responseBody.data)
    .then((expertIds) => expertRequest().post("/experts/search", expertIds));

  return response.data;
};

export const signUp = async ({
  email,
  name,
  password,
}: SignUpData): Promise<ServiceResponse<any>> => {
  const response = await authRequest().post("/auth/signup", {
    email,
    name,
    password,
  });
  return response.data;
};

export const expertSearch = async (
  query: string
): Promise<ServiceResponse<ExpertWithMetadata[]>> => {
  const response = await expertRequest().post("/search", { content: query });
  return response.data;
};
