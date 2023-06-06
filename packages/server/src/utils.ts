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
 * Given an input buffer, it read as JSON and split command and argument.
 * @param data buffer send from TCP client.
 * @returns requested command and arguments.
 */
export function parseRequest(data: Buffer): {
  command: Command;
  argument: string;
} {
  const { command, argument } = JSON.parse(data.toString());
  return { command: command as Command, argument };
}

/**
 * Given output data object, it builds the response as JSON buffer.
 * @param status success or error.
 * @param data data to send to TCP client.
 * @returns output parsed as JSON buffer with status and data keys.
 */
export function parseResponse(status: ResponseStatus, data?: object): Buffer {
  return Buffer.from(JSON.stringify({ status, data }), "utf-8");
}
