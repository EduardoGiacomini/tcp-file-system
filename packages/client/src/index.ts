const net = require("node:net");
import { resolve } from "node:path";

import fs from 'fs';

const host = "127.0.0.1";
const port = 3000;

const client = net.createConnection(port, host, async () => {
  console.log("Connected");
  const fileName = 'description.pdf';
  const value = resolve(`./files/${fileName}`);
  const saveArgument = {
    fileSize: 0,
    pathToSave: '',
    fileName
  }

  fs.readFile(value, async (err, contents) => {
    if (err) {
      if (err.code == 'ENOENT') {
        client.write(`File not exist: ${value}`); 
      } else {
        client.error(err);
      }
    } else {
      saveArgument.fileSize = contents.length;
      saveArgument.pathToSave = './novo';
      client.write(`{"command":"save","argument": ${JSON.stringify(saveArgument)}}`); // Send file to client
      await wait(300);
      client.write(contents);
    }
 });
  
  // client.write('{"command":"save","argument":""}');
});

client.on("data", (data: string) => {
  console.log(`Received: ${data}`);
});

client.on("error", (error: Error) => {
  console.log(`Error: ${error.message}`);
});

client.on("close", () => {
  console.log("Connection closed");
});

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}