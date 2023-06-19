/**
 * Available file system commands.
 *
 * ls: list all directories and files recursivelly.
 * rm: remove a file or a directory.
 * mkdir: create a new directory.
 * save: save a new file in an existing directory
 */
export enum Command {
  LS = "ls",
  RM = "rm",
  MKDIR = "mkdir",
  SAVE = "save",
}

export type Request = {
  command: Command;
  argument: string | Buffer | object;
};

export type Response = {
  status: ResponseStatus;
  data?: any;
};

/**
 * Defines the response type for a TCP request send by
 * client.
 */
export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}
