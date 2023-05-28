import { rm } from "node:fs/promises";
import { buildPath } from "../utils";

export async function removePath(pathToRemove: string): Promise<void> {
  const fullPath = buildPath(pathToRemove);
  try {
    console.log(`Removing ${pathToRemove}`);
    await rm(fullPath, { recursive: true });
    console.log(`${pathToRemove} removed`);
  } catch (error) {
    throw Error(`Failed to delete directory: ${fullPath}`);
  }
}
