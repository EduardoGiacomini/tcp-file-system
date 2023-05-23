import net from "node:net";
import { rm } from 'fs/promises';
import { resolve } from 'path';

const port = 3000;
const FILE_SYSTEM_PATH = './file-system'

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
   try {
    const strData = data.toString();
    console.log(`Received: ${strData}`);

    const command = strData.split(",");
    const operator = command[0];
    const args1 = command[1];
    const args2 = command[2];
    let result;

    switch (operator) {
      case "ls":
        break;
      case "up":
        break;
      case "rm":
        removePath(args1);
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

server.listen(port, () => {
  console.log(`TCP socket server is running on port: ${port}`);
});

async function removePath(pathToRemove: string): Promise<void> {
  const fullPath = resolve(`${FILE_SYSTEM_PATH}${pathToRemove}`);
  try {
    await rm(fullPath, { recursive: true });
  } catch (error) {
    throw Error(`Failed to delete directory: ${fullPath}`);
  }
}