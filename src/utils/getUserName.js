import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const { argv } = yargs(hideBin(process.argv))
  .command(
    "track-instagram",
    "track in real time post, followers and following of a given instagram user",
    (builder) => {
      return builder.option("username", {
        alias: "usr",
        demandOption: true,
        describe: "Instagram user name",
        type: "string",
      });
    }
  )
  .epilog("Copyright 2023 - Gabriel Moretti");


export const username = argv.username;
