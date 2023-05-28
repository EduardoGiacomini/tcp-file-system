import net from "node:net";
import { PORT } from "./env";
import { Command } from "./types";
import { removePath, createDirectory } from "./commands";

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    try {
      const request = data.toString();
      console.log(`Request received: ${request}`);

      const [command, argument] = request.split(",");

      switch (command) {
        case Command.LS:
          break;
        case Command.RM:
          removePath(argument);
          break;
        case Command.MKDIR:
          createDirectory(argument);
          break;
        default:
          break;
      }

      socket.write("SUCCESS : )");
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
