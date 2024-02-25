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
	description: "Will ban a member from the server",
	// devOnly: boolean,
	// testOnly: boolean,
	options: [
		{
			name: "target-user",
			description: "User to ban",
			required: true,
			type: ApplicationCommandOptionType.Mentionable,
		},
		{
			name: "reason",
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
