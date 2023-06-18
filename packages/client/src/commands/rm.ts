import net from "node:net";
import { HOST, PORT } from "../constants";
import { Command, Request, ResponseStatus } from "../types";
import { parseRequest, parseResponse } from "../utils";

/**
 * Given the directory or file, removes the directory (recursively) or file.
 * @param path the directory or file path.
 */
export async function rm(path: string): Promise<void> {
  const client = net.createConnection(PORT, HOST, async () => {
    const request: Request = { command: Command.RM, argument: path };
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

    client.destroy();
  });

  client.on("close", () => {
    console.log("-- Connection closed");
  });
}
