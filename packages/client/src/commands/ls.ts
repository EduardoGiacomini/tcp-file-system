import net from "node:net";
import { join } from "node:path";
import { HOST, PORT } from "../constants";
import { Command, Request, ResponseStatus } from "../types";
import { parseRequest, parseResponse } from "../utils";

/**
 * Given the directory path, lists all files and directories.
 * @param path the directory path.
 */
export async function ls(path: string): Promise<void> {
  const client = net.createConnection(PORT, HOST, async () => {
    const request: Request = { command: Command.LS, argument: path };
    const buffer: Buffer = parseRequest(request);
    client.write(buffer);
  });

  client.setTimeout(3000);

  client.on("connect", () => {
    console.log("-- Connection created");
  });

  client.on("timeout", () => {
    console.log("-- Connection timeout");
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

    if (response.status === ResponseStatus.SUCCESS) {
      console.log(`-- Data:`);
      response?.data?.forEach((item: any) => {
        if (item.type === "directory") {
          console.log(`\t${join(path, item.name + "/")}`);
        } else {
          console.log(`\t${join(path, item.name)}`);
        }
      });
    }

    client.destroy();
  });

  client.on("close", () => {
    console.log("-- Connection closed");
  });
}
