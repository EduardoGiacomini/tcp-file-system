import { resolve } from "node:path";
import { BASE_PATH } from "./env";
import { Command, Request, ResponseStatus } from "./types";

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
export function parseRequest(data: Buffer): Request | undefined {
try {
  const stringData = data.toString();
  // ignored due to the case of processing the file in chunks
  if (!stringData.toString().includes('command')) {
    return;
  }
  const { command, argument } = JSON.parse(stringData);
  return { command: command as Command, argument };
} catch (error) {
  throw Error(`Error in request parsing ${error}`)
}
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
