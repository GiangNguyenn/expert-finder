import axios, { AxiosError } from "axios";

import { NextApiRequest, NextApiResponse } from "next";
import { ServiceName } from "../../../core/types";
import { getSession, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;

  if (!path || !Array.isArray(path) || path.length === 0) {
    return res.status(400).json({ error: "Invalid path" });
  }

  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const url = parseServiceUrl(path) + parseRequestParams(req.query);

    const response = await axios.request({
      method: req.method,
      url: url,
      headers: req.headers,
      data: req.body,
    });

    return res.status(response.status).json({ data: response.data });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status ?? 400).json({
        error: error.response?.statusText,
      });
    }

    return res.status(400).json({ error: error.message });
  }
}

const parseRequestParams = (query: NextApiRequest["query"]) => {
  const params = Object.keys(query).reduce((acc: any, key) => {
    if (key === "path") return acc;

    return acc + `&${key}=${query[key]}`;
  });

  return params ? `?${params}` : "";
};

const parseServiceUrl = (path: string[]) => {
  const service = path[0] as ServiceName;
  const host = getHost(service);

  if (!host) {
    throw new Error(`Unknown service: ${service}`);
  }

  return host + "/" + path.slice(1).join("/");
};

export const getHost = (service: ServiceName) => {
  switch (service) {
    case ServiceName.AUTH:
      return process.env.AUTH_API_HOST || "http://localhost:4001";
    case ServiceName.PROJECT:
      return process.env.PROJECT_API_HOST || "http://localhost:4002";
    case ServiceName.EXPERT:
      return process.env.EXPERT_API_HOST || "http://localhost:4003";
    default:
      return null;
  }
};
