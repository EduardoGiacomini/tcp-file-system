const net = require("node:net");

const host = "127.0.0.1";
const port = 3000;

const client = net.createConnection(port, host, async () => {
  console.log("Connected");
  client.write("mkdir,example/1/2/3");
  await setTimeout(() => {
    client.write("rm,example");
  }, 5000);
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