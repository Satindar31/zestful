import path from "path";
import getAllFiles from "./getAllfiles";
import { PermissionFlags, PermissionsBitField } from "discord.js";
import { TCommand } from "../types/command";

export default function (exceptions = []) {
    let localCommands = [];

    const commandCategories = getAllFiles(
      path.join(__dirname, '..', 'commands'),
      true
    );
  
    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            const commandObject: TCommand = require(commandFile);

            if (exceptions.includes(commandObject.default.name as never)) {
                continue;
            }

            localCommands.push(commandObject.default);
        }
    }
    return localCommands;
}
