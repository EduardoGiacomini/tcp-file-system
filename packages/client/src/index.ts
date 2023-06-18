import { Command } from "commander";
import { ls, mkdir, rm, save } from "./commands";

const cli = new Command();

cli
  .name("TCP File System")
  .description("CLI to use remote File System")
  .version("1.0.0");

cli
  .command("ls")
  .description("Lists all files and directories")
  .argument("[path]", "directory name", "")
  .action((path) => {
    ls(path);
  });

cli
  .command("mkdir")
  .description("Creates a directory")
  .argument("<path>", "directory name")
  .action((path) => {
    mkdir(path);
  });

cli
  .command("rm")
  .description("Removes a directory recursively or file")
  .argument("<path>", "directory or file name")
  .action((path) => {
    rm(path);
  });

cli
  .command("save")
  .description("Upload file")
  .argument("<path to upload>", "file path to upload")
  .argument("<path to save>", "path to save")
  .action((pathToUpload, pathToSave) => {
    save(pathToUpload, pathToSave);
  });

cli.parse(process.argv);
