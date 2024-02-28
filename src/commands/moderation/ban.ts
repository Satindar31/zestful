import {
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
} from "discord.js";

export default {
	name: "ban",
	description: "Will ban a member from the server",
	// devOnly: boolean,
	// testOnly: boolean,
	options: [
		{
			name: "target",
			description: "User to ban",
			required: true,
			type: ApplicationCommandOptionType.User,
		},
		{
			name: "reason",
			description: "Reason for ban",
			required: false,
			type: ApplicationCommandOptionType.String,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissionsRequired: [PermissionFlagsBits.BanMembers],
	callback: (client: Client, interaction: CommandInteraction) => {
		ban(client, interaction);
	},
};

function ban(client: Client, interaction: CommandInteraction) {
	const targetUser = interaction.options.get("target")!;
	const reason = interaction.options.get("reason")!;

	const member = interaction.guild?.members.cache.get(
		targetUser.value?.toString()!
	);

	if (!member) {
		interaction.reply({
			content: "User not found!",
			ephemeral: true,
		});
		return;
	}

	if (!member.bannable) {
		interaction.reply({
			content: "I cannot ban this user!",
			ephemeral: true,
		});
		return;
	}

	const bannedUserEmbed = new EmbedBuilder({
		title: "Banned from " + interaction.guild?.name,
		description:
			"You were banned for: " + (reason.value || "No reason provided"),
		author: {
			name: interaction.guild?.name!,
			icon_url:
				interaction.guild?.iconURL() ??
				interaction.client.user.displayAvatarURL(),
		},
		color: 0xff0000,
		footer: {
			text: interaction.client.user.username,
			icon_url: interaction.client.user.displayAvatarURL(),
		},
		fields: [
			{
				name: "banned by",
				value: interaction.user.username,
			},
			{
				name: "Reason",
				value: reason.value?.toString() ?? "No reason provided.",
			},
		],
	});

	member.dmChannel?.send({
		embeds: [bannedUserEmbed],
	});

	member.ban({ reason: reason?.value?.toString() }).then(() => {
		interaction.reply({
			content: `Successfully banned ${member.user.tag}`,
			ephemeral: true,
		});

		const banEmbed = new EmbedBuilder({
			title: "Member Banned",
			description: `**${member.user.tag}** has been banned from the server.`,
			color: 0xff0000,
			fields: [
				{
					name: "Moderator",
					value: `@${interaction.user.username}`,
					inline: true,
				},
				{
					name: "Reason",
					value: reason?.value?.toString() || "No reason provided",
					inline: true,
				},
			],
		});

		interaction.channel?.send({
			embeds: [banEmbed],
		});
		return;
	});
}
