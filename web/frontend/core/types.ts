export interface Test {
  field_1: string;
}

export enum ServiceName {
  AUTH = "auth",
  PROJECT = "project",
  EXPERT = "expert",
}

export interface ServiceResponse<T> {
  data?: T;
  error?: string;
}

export interface Project {
  id: string;
  title: string;
  purpose: string;
  user_id: string;
}

export interface Workspace {
  id: string;
  title: string;
  project_id: string;
}

export interface Expert {
  id: string;
  name: string;
  industry: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}
export interface ExpertWithMetadata extends Expert {
  metadata: [
    {
      [key: string]: string;
    }
  ];
}
