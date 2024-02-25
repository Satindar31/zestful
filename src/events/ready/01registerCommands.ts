import { Client } from "discord.js";

import { testServerID } from "../../../config.json";
import areCommandsDifferent from "../../utils/areCommandsDifferent";
import getApplicationCommands from "../../utils/getApplicationCommands";
import getLocalCommands from "../../utils/getLocalCommands";

export default async function (client: Client) {
	console.log("🔁 Registering commands...");
	try {
		const localCommands = getLocalCommands();
		const applicationCommands = await getApplicationCommands(
			client,
			testServerID
		);

		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand;

			const existingCommand = applicationCommands?.cache.find(
				(cmd: { name: any }) => cmd.name === name
			);

			if (existingCommand) {
				if (localCommand.deleted) {
					console.log("Deleting " + name + " command.");
					await applicationCommands?.delete(existingCommand.id);
					console.log(`🗑 Deleted command "${name}".`);
					continue;
				}

				if (areCommandsDifferent(existingCommand, localCommand)) {
					try {
						console.log("Editing" + name + " command.");

						await applicationCommands?.edit(existingCommand.id, {
							description,
							options,
						});

						console.log(`🔁 Edited command "${name}".`);
					} catch (error) {
						console.log(`There was an error: ${error}`);
					}
				}
			} else {
				if (localCommand.deleted) {
					console.log(
						`⏩ Skipping registering command "${name}" as it's set to delete.`
					);
					continue;
				}

				try {
					console.log("Registering " + localCommand.name + " command.");

					const command = await applicationCommands?.create({
						name,
						description,
						options,
					});

					if (command == null || undefined) {
						throw new Error("Command is null");
					}

					console.log(`👍 Registered command "${name}."`);
				} catch (error) {
					console.log(`There was an error: ${error}`);
				}
			}
		}
	} catch (error) {
		console.log(`There was an error: ${error}`);
	}
}
