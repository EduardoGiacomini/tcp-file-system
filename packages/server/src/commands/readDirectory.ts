import { readdir } from "node:fs/promises";
import { buildPath } from "../utils";
import { File } from "../types";

interface Output {
  name: string;
  type: File;
}

export async function readDirectory(path: string): Promise<Array<Output>> {
  const fullPath = buildPath(path);
  try {
    console.log(`Reading directory ${path}`);
    const filesAndDirectories = await readdir(fullPath, {
      withFileTypes: true,
      encoding: "utf-8",
    });
    console.log(`Directory ${path} read`);
    const response = filesAndDirectories.map((fileOrDirectory) => ({
      name: fileOrDirectory.name,
      type: fileOrDirectory.isDirectory() ? File.DIRECTORY : File.FILE,
    }));
    return response;
  } catch (error) {
    throw Error(`Failed to read directory: ${fullPath}`);
  }
}
