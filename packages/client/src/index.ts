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
  .action((argument) => {
    ls(argument);
  });

cli
  .command("mkdir")
  .description("Creates a directory")
  .argument("<directory or path>", "directory name")
  .action((argument) => {
    mkdir(argument);
  });

cli
  .command("rm")
  .description("Removes a directory recursively or file")
  .argument("<path>", "directory or file name")
  .action((argument) => {
    rm(argument);
  });

cli
  .command("save")
  .description("Upload file")
  .argument("<string>", "directory or file name")
  .action((argument) => {
    save(argument);
  });

cli.parse(process.argv);
