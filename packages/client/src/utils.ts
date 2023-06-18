import { Request, Response } from "./types";

export function parseRequest(request: Request): Buffer {
  return Buffer.from(JSON.stringify(request), "utf-8");
}

export function parseResponse(response: Buffer): Response {
  const { status, data } = JSON.parse(response.toString());
  return { status, data };
}
