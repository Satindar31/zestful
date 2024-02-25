import { Client } from "discord.js";

export default async function (client: Client, guildID: number) {
	let applicationCommands;

	if (guildID) {
		try {
			const guild = await client.guilds.fetch("1129432438364459148");
			applicationCommands = guild.commands;
		} catch (err: any) {
			throw new Error(err.name, {
				cause: err.cause,
			});
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
