import { Client, CommandInteraction, PermissionsBitField } from "discord.js";
import { devsID, testServerID } from "../../../config.json";
import getLocalCommands from "../../utils/getLocalCommands";

export default async function (client: Client, interaction: CommandInteraction) {
	if (!interaction.isChatInputCommand) return;

	const localCommands = getLocalCommands();


	try {
		const commandObject = localCommands.find(
			(cmd) => cmd.name === interaction.commandName
		);

		if (!commandObject) return;

		if (commandObject.devOnly == true) {
			if (!devsID.includes(Number(interaction.member?.user.id))) {
				interaction.reply({
					content: "You do not have permission to use this command!",
					ephemeral: true,
				});
			}
		}

		if (commandObject.testOnly == true) {
			if (Number(interaction.guild?.id) !== Number(testServerID)) {
				interaction.reply({
					content: "You do not have permission to use this command!",
					ephemeral: true,
				});
			}
		}

        if(!interaction.member) return;

        const memberPermissions = interaction.member.permissions as Readonly<PermissionsBitField>;

        if(commandObject.permissionsRequired?.length) {
            for(const permission of commandObject.permissionsRequired) {
                if(!memberPermissions.has(permission)) {
                    interaction.reply({
                        content: "You do not have permission to use this command!", ephemeral: true
                    });
                    return;
                }
            }
        }

        if(commandObject.botPermissionsRequired?.length) {
            for(const permission of commandObject.botPermissionsRequired) {
                if(!interaction.guild?.members.me?.permissions.has(permission)) {
                    interaction.reply({
                        content: "I do not have permission to execute this command!", ephemeral: true
                    });
                    return;
                }
            }
        }

        await commandObject.callback(client, interaction)
	} catch (error) {
		console.error(error);
		interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
}
