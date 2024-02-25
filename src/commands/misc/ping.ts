import { Client, CommandInteraction, Interaction } from "discord.js";

export default {
	name: "ping",
	description: "Shows your ping",
	// devOnly: boolean,
	// testOnly: boolean,
	// options: Object[],
	callback: (client: Client, interaction: CommandInteraction) => {
		ping(client, interaction);
	},
};

function ping(client: Client, interaction: CommandInteraction) {
	interaction.reply(
		`Pong! \n Latency is ${
			Date.now() - interaction.createdTimestamp
		}ms. \n API Latency is ${Math.round(client.ws.ping)}ms.`
	);
}
