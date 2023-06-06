import { mkdir } from "node:fs/promises";
import { buildPath } from "../utils";

/**
 * Given the directory name or path, creates the directory recursivelly.
 * @param path the directory name or path.
 */
export async function createDirectory(path: string): Promise<void> {
  const fullPath = buildPath(path);
  try {
    console.log(`Creating directory ${path}`);
    await mkdir(fullPath, { recursive: true });
    console.log(`Directory ${path} created`);
  } catch (error) {
    throw Error(`Failed to create directory: ${fullPath}`);
  }
}
