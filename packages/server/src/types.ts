/**
 * Available file system commands.
 *
 * ls: list all directories and files recursivelly.
 * rm: remove a file or a directory.
 * mkdir: create a new directory.
 */
export enum Command {
  LS = "ls",
  RM = "rm",
  MKDIR = "mkdir",
}

/**
 * Defines type for items found in a directory path.
 */
export enum File {
  FILE = "file",
  DIRECTORY = "directory",
}

/**
 * Defines the response type for a TCP request send by
 * client.
 */
export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}
