import {
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
} from "discord.js";
import { TBaseCommand } from "../../types/command";

export default {
	name: "unban",
	description: "Will unban a member from the server",
	testOnly: false,
	options: [
		{
			name: "user",
			description: "User to unban",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "reason",
			description: "Reason for unban",
			required: false,
			type: ApplicationCommandOptionType.String,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissionsRequired: [PermissionFlagsBits.BanMembers],
	devOnly: false,
	deleted: false,
	callback: (client: Client, interaction: CommandInteraction) => {
		unban(client, interaction);
	},
} as unknown as TBaseCommand;

function unban(client: Client, interaction: CommandInteraction) {
	const targetUser = interaction.options.get("user")!;
	const reason = interaction.options.get("reason")!;

	interaction.guild?.bans.fetch().then((bans) => {
		const user = bans.find((ban) => ban.user.username === targetUser.value);
		if (!user) {
			interaction.reply({
				content: "User not found!",
				ephemeral: true,
			});
			return;
		}

		const unbanEmbed = new EmbedBuilder({
			title: "User Unbanned",
			author: {
				name: interaction.user.username,
				iconURL: interaction.user.displayAvatarURL(),
			},
			color: 0x00ff00,
			timestamp: new Date(),
			description: `**${user.user.tag}** was unbanned from the server.`,
			fields: [
				{
					name: "Modereator",
					value: interaction.user.tag,
					inline: true,
				},
				{
					name: "Reason",
					value: reason?.value?.toString() || "No reason provided",
					inline: true,
				},
			],
		});

		interaction.guild?.bans
			.remove(user.user, reason?.value?.toString())
			.then(() => {
				interaction.channel?.send({ embeds: [unbanEmbed] });

				interaction.reply({
					content: "User has been unbanned!",
					ephemeral: true,
				});

				return;
			});
	});
}
