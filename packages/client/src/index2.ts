// import net from "node:net";
// import { resolve } from "node:path";

// import fs from "fs";
// import { HOST, PORT } from "./constants";

// const client = net.createConnection(PORT, HOST, async () => {
//   console.log("Connected");
//   const fileName = "description.pdf";
//   const value = resolve(`./files/${fileName}`);
//   const saveArgument = {
//     fileSize: 0,
//     pathToSave: "",
//     fileName,
//   };

//   fs.readFile(value, async (err, contents) => {
//     if (err) {
//       if (err.code == "ENOENT") {
//         client.write(`File not exist: ${value}`);
//       } else {
//         client.error(err);
//       }
//     } else {
//       saveArgument.fileSize = contents.length;
//       saveArgument.pathToSave = "./novo";
//       client.write(
//         `{"command":"save","argument": ${JSON.stringify(saveArgument)}}`
//       ); // Send file to client
//       await wait(300);
//       client.write(contents);
//     }
//   });
// });

// client.on("data", (data: string) => {
//   console.log(`Received: ${data}`);
// });

// client.on("error", (error: Error) => {
//   console.log(`Error: ${error.message}`);
// });

// client.on("close", () => {
//   console.log("Connection closed");
// });

// function wait(milliseconds: number) {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }
