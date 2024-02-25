import {
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
	EmbedBuilder,
	PermissionFlagsBits,
} from "discord.js";

export default {
	name: "kick",
	description: "Will ban a member from the server",
	// devOnly: boolean,
	// testOnly: boolean,
	options: [
		{
			name: "target-user",
			description: "User to kick",
			required: true,
			type: ApplicationCommandOptionType.Mentionable,
		},
		{
			name: "reason",
			description: "Reason for kicking member",
			required: false,
			type: ApplicationCommandOptionType.String,
		},
	],
	permissions: [PermissionFlagsBits.BanMembers],
	botPermissionsRequired: [PermissionFlagsBits.BanMembers],
	callback: (client: Client, interaction: CommandInteraction) => {
		kick(client, interaction);
	},
};

function kick(client: Client, interaction: CommandInteraction) {
	const targetUser = interaction.options.get("target-user")!;
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

	if (!member.kickable) {
		interaction.reply({
			content: "I cannot kick this user!",
			ephemeral: true,
		});
		return;
	}

	member.kick(reason.value?.toString()).then(() => {
		const kickEmbed = new EmbedBuilder({
			title: "Member Kicked",
			description: `**${member.user.tag}** was kicked from the server.`,
			color: 0xff0000,
			timestamp: Date.now(),
			fields: [
				{
					name: "Moderator",
					value: `@${interaction.user.username})`,
				},
				{
					name: "Reason",
					value: reason.value?.toString() || "No reason provided",
				},
			],
		});
		interaction.channel?.send({ embeds: [kickEmbed] });

		interaction.reply({
			content: `Successfully kicked ${member.user.tag}!`,
			ephemeral: true,
		});
	});
}
