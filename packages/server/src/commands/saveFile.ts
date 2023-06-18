import { buildPath } from "../utils";
import fs from "fs";
import { createDirectory } from "./createDirectory";

export async function saveFile(
  pathToSave: string,
  file: Buffer
): Promise<void> {
  const fullPath = buildPath(pathToSave);
  return new Promise((resolve, reject) => {
    console.log(`-- Saving file ${pathToSave}`);
    fs.writeFile(fullPath, file, async (error) => {
      if (error) {
        if (error.code === "ENOENT") {
          await createDirectory(pathToSave);
          return saveFile(pathToSave, file);
        }
        return reject(error);
      }
      console.log(`-- Saved file ${pathToSave}`);
      return resolve();
    });
  });
}
