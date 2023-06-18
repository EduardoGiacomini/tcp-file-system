import net from "node:net";
import { PORT } from "./env";
import { Command, ResponseStatus, Request, SaveArgument } from './types';
import { removePath, createDirectory, readDirectory } from "./commands";
import { parseRequest, parseResponse } from "./utils";
import { saveFile } from "./commands/saveFile";

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", async (data) => {
    try {
      const request = parseRequest(data);
      if (request === undefined) return;
      console.log(`Request received: ${data}`);
      const { command, argument } = request;

      switch (command) {
        case Command.LS:
          const filesAndDirectories = await readDirectory(argument);
          const response = parseResponse(
            ResponseStatus.SUCCESS,
            filesAndDirectories
          );
          socket.write(response);
          break;
        case Command.RM:
          await removePath(argument);
          break;
        case Command.MKDIR:
          await createDirectory(argument);
          break;
        case Command.SAVE:
          const { fileSize, pathToSave, fileName } = argument as unknown as SaveArgument;
          let receivedData = Buffer.alloc(0);
          socket.on('data', async data => {
            receivedData = Buffer.concat([receivedData!, data]);

            if (receivedData.length !== fileSize) {
              return;
            }

            await saveFile(
              pathToSave,
              fileName,
              receivedData
            ).then(() => socket.write(`File ${fileName} saved successfully`));
          });
          break;
        default:
          throw Error(`The given command ${command} is not supported.`);
      }
    } catch (error) {
      socket.write(`Something went wrong : (\n${(error as Error).message}`);
    }
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.log(`Socket Error: ${error.message}`);
  });
});

server.on("error", (error) => {
  console.log(`Server Error: ${error.message}`);
});

server.listen(PORT, () => {
  console.log(`TCP socket server is running on port: ${PORT}`);
});
