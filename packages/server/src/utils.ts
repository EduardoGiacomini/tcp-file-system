import { resolve } from "node:path";
import { BASE_PATH } from "./env";
import { Command, ResponseStatus } from "./types";

/**
 * Build the correct path using the base directory set by env var.
 * @param path initial path to file or directory
 * @returns complete path with the base directory
 */
export function buildPath(path: string): string {
  return resolve(BASE_PATH, path);
}

export function parseRequest(data: Buffer): {
  command: Command;
  argument: string;
} {
  const [command, argument] = data.toString().split(",");
  return { command: command as Command, argument };
}

export function parseResponse(status: ResponseStatus, data?: object): string {
  return JSON.stringify({ status, data });
}
