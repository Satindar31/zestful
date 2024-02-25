import {
	ApplicationCommand,
	ApplicationCommandOptionBase,
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
    PermissionFlagsBits
} from "discord.js";

export default {
	name: "ban",
	description: "Bans a member from the server",
	// devOnly: boolean,
	// testOnly: boolean,
	options: [
		{
			name: "Target user",
			description: "User to ban",
			required: true,
			type: ApplicationCommandOptionType.Mentionable,
		},
		{
			name: "Reason",
			description: "Reason for ban",
			required: false,
			type: ApplicationCommandOptionType.String,
		},
	],
    permissions: [PermissionFlagsBits.BanMembers],
	callback: (client: Client, interaction: CommandInteraction) => {
		interaction.reply("Ban...?");
	},
};
