import net from "node:net";
import { PORT } from "./env";
import { Command, ResponseStatus, Request, SaveArgument } from "./types";
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
          try {
            const filesAndDirectories = await readDirectory(argument);
            const response = parseResponse(
              ResponseStatus.SUCCESS,
              filesAndDirectories
            );
            socket.write(response);
          } catch (error: any) {
            const response = parseResponse(ResponseStatus.ERROR, error.message);
            socket.write(response);
          } finally {
            break;
          }
        case Command.RM:
          try {
            await removePath(argument);
            const response = parseResponse(ResponseStatus.SUCCESS);
            socket.write(response);
          } catch (error: any) {
            const response = parseResponse(ResponseStatus.ERROR, error.message);
            socket.write(response);
          } finally {
            break;
          }
        case Command.MKDIR:
          try {
            await createDirectory(argument);
            const response = parseResponse(ResponseStatus.SUCCESS);
            socket.write(response);
          } catch (error: any) {
            const response = parseResponse(ResponseStatus.ERROR, error.message);
            socket.write(response);
          } finally {
            break;
          }
        case Command.SAVE:
          const { fileSize, pathToSave, fileName } =
            argument as unknown as SaveArgument;
          let receivedData = Buffer.alloc(0);
          socket.on("data", async (data) => {
            receivedData = Buffer.concat([receivedData!, data]);

            if (receivedData.length !== fileSize) {
              return;
            }

            await saveFile(pathToSave, fileName, receivedData).then(() => {
              const response = parseResponse(ResponseStatus.SUCCESS, {
                message: `File ${fileName} saved successfully`,
              });
              socket.write(response);
            });
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
