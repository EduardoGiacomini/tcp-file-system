import net from "node:net";
import fs from "node:fs";
import { HOST, PORT } from "../constants";
import { Command, Request, ResponseStatus } from "../types";
import { parseRequest, parseResponse, wait } from "../utils";

/**
 * Given the file to upload and destination path, uploads the file to remote server.
 * @param fileToUpload the upload file path.
 * @param destinationPath the destination directory path.
 */
export async function save(
  fileToUpload: string,
  destinationPath: string
): Promise<void> {
  let file: Buffer;

  try {
    file = await readFile(fileToUpload);
  } catch (error) {
    console.log(`-- Error: ${error}`);
    return;
  }

  const client = net.createConnection(PORT, HOST, async () => {
    const request: Request = {
      command: Command.SAVE,
      argument: { size: file.length, destination: destinationPath },
    };
    const buffer: Buffer = parseRequest(request);
    client.write(buffer);
    await wait(500);
    client.write(file);
  });

  client.setTimeout(3000);

  client.on("connect", () => {
    console.log("-- Connection created");
  });

  client.on("timeout", () => {
    console.log("-- Connection timeout");
    client.destroy();
  });

  client.on("error", (error: Error) => {
    console.log(`-- Error: ${error.message}`);
    client.destroy();
  });

  client.on("data", (data: Buffer) => {
    const response = parseResponse(data);

    console.log(`-- Response: ${response.status}`);

    if (response.status === ResponseStatus.ERROR) {
      console.log(`-- Error: ${JSON.stringify(response.data)}`);
    }

    client.destroy();
  });

  client.on("close", () => {
    console.log("-- Connection closed");
  });
}

async function readFile(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async (error, data) => {
      if (error) {
        if (error.code == "ENOENT") {
          return reject(`File not exist: ${path}`);
        } else {
          return reject(`Error while reading file ${path}: ${error}`);
        }
      }
      return resolve(data);
    });
  });
}
