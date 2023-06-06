import { resolve } from "node:path";
import { BASE_PATH } from "./env";
import { Command, ResponseStatus } from "./types";

/**
 * Build the correct path using the base directory set by env var.
 * @param path initial path to file or directory.
 * @returns complete path with the base directory.
 */
export function buildPath(path: string): string {
  return resolve(BASE_PATH, path);
}

/**
 * Given an input buffer, it splits the command and argument.
 * @param data buffer send from TCP client.
 * @returns the requested command and important arguments.
 */
export function parseRequest(data: Buffer): {
  command: Command;
  argument: string;
} {
  const [command, argument] = data.toString().split(",");
  return { command: command as Command, argument };
}

/**
 * Given the output data object, it builds the response as JSON string.
 * @param status success or error.
 * @param data data to send to TCP client.
 * @returns output parsed as JSON string with status and data keys.
 */
export function parseResponse(status: ResponseStatus, data?: object): string {
  return JSON.stringify({ status, data });
}
