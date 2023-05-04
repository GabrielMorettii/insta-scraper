import chalk from "chalk";

export const tableOptions = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "value", name: chalk.magenta("Value") },
  ],
};