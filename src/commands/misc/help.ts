import {
	ApplicationCommandOptionType,
	CommandInteraction,
	EmbedBuilder,
} from "discord.js";
import type { TBaseCommand } from "../../types/command";

export default {
	name: "help",
	description: "Sends a message containing all the commands",
	options: [
		{
			name: "inform-user",
			description:
				"Determines if to send the message in your DMs or in the server.",
			required: false,
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	callback(client, interaction) {
		help(interaction);
	},
} as TBaseCommand;

function help(interaction: CommandInteraction) {
	const toDMs = interaction.options.get("DMs");

	const helpEmbed = new EmbedBuilder({
		title: "Help command",
		author: {
			name: interaction.user.username,
			icon_url: interaction.user.displayAvatarURL(),
		},
		color: 0x00ff00,
		description: "Different commands supported by the bot",
		footer: {
			text: interaction.client.user.username,
			icon_url: interaction.client.user.displayAvatarURL(),
		},
		timestamp: new Date(),
		fields: [
			{
				name: "Fun",
				value: "Koi nehi hai 😭😭",
			},
			{
				name: "Moderation",
				value: "/ban, /kick, /unban",
			},
			{
				name: "Misc",
				value: "/help, /ping",
			},
		],
	});

	if (toDMs) {
		interaction.user.dmChannel?.send({ embeds: [helpEmbed] });

		return;
	} else {
		interaction.reply({
			embeds: [helpEmbed],
		});
		return;
	}

}
