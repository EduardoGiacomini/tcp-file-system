import { resolve } from "node:path";
import { BASE_PATH } from "./env";

/**
 * Build the correct path using the base directory set by env var.
 * @param path initial path to file or directory
 * @returns complete path with the base directory
 */
export function buildPath(path: string): string {
  return resolve(BASE_PATH, path);
}
