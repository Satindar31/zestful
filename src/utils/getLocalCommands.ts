import path from "path";
import getAllFiles from "./getAllfiles";
import add from "../commands/maths/add";

export default function (exceptions = []) {
    let localCommands = [];

    const commandCategories = getAllFiles(
      path.join(__dirname, '..', 'commands'),
      true
    );
  
    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            const commandObject: {default: { name: string, description: string, options: any[], deleted: Boolean }} = require(commandFile);

            if (exceptions.includes(commandObject.default.name as never)) {
                continue;
            }

            localCommands.push(commandObject.default);
        }
    }
    return localCommands;
}
