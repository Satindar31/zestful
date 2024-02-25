import { Client, CommandInteraction } from "discord.js";

export default {
	name: 'ping',
	description: 'Shows your ping',
	// devOnly: boolean,
	// testOnly: boolean,
	// options: Object[],
	callback: (client: Client, interaction: CommandInteraction) => {
		interaction.reply('Pong!')
	},
}