import { Client } from "discord.js";

export default async function (client: Client, guildID: string) {
	let applicationCommands;

	if (guildID) {
		try {
			const guild = await client.guilds.fetch(guildID);

			applicationCommands = guild.commands;
		} catch (err: any) {
			throw new Error(err)
		}
	} else {
		applicationCommands = client.application?.commands;
	}

	if (applicationCommands == null) {
		throw new Error("Application commands is null");
	}

	await applicationCommands.fetch({ guildId: guildID as unknown as string });
	return applicationCommands;
}
