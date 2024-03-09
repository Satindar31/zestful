import {
	Client,
	CommandInteraction,
	PermissionFlagsBits,
	PermissionsBitField,
} from "discord.js";
import { TBaseCommand } from "../../types/command";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Sentry from "@sentry/node";

export default {
	name: "reload-guild-members",
	description: "Reloads all guild members",
	permissionsRequired: [PermissionFlagsBits.Administrator],
	deleted: false,
	devOnly: false,
	testOnly: false,
	options: [],
	callback: (client: Client, interaction: CommandInteraction) => {
		reloadMembers(interaction);
	},
	botPermissionsRequired: [],
} as unknown as TBaseCommand;

async function reloadMembers(interaction: CommandInteraction) {
	await interaction.deferReply({ ephemeral: true });

	interaction.editReply("Reloading guild members...");

	const members = await interaction.guild?.members.fetch();

	if (!members) return interaction.editReply("Failed to fetch members.");


	try {
		members.map(async (member) => {
			await prisma.user.upsert({
				create: {
					id: member.id
				},
				update: {
					id: member.id
				},
				where: {
					id: member.id
				}
			})
		})

		return interaction.editReply(
			`Reloaded ${
				members.size
			} members.`
		);
	} catch (e) {
		console.error(e);
		Sentry.captureException(e);
		return interaction.editReply("Failed to reload members.");
	}
}
