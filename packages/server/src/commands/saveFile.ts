import { buildPath } from "../utils";
import fs from 'fs';
import { createDirectory } from "./createDirectory";

export async function saveFile(pathToSave: string, fileName: string, file: Buffer): Promise<void> {
    const fullPath = buildPath(pathToSave);
    try {
        console.log(`Saving file ${fileName} in ${fullPath}`);
        fs.writeFile(`${fullPath}/${fileName}`, file, async (err) => {
            if (err) {
                    if (err.code === 'ENOENT'){
                        await createDirectory(pathToSave);
                        return saveFile(pathToSave, fileName, file);
                    }
                 console.error(err);
                 throw Error(err.message);
            }
            console.log(`Saved ${fileName}.`);
        });
    } catch (error) {
        throw Error(`Failed to save file: ${error}`);
    }
}
