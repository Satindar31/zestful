import {
	ApplicationCommandOption,
	Client,
	CommandInteraction,
} from "discord.js";

import type { PermissionFlagsBits } from "discord.js";

/**
 * @deprecated Use TBaseCommand instead
 * @see TBaseCommand for the new type
 */
type TCommand = {
	default: {
		name: string;
		description: string;
		testOnly: boolean;
		options: any[];
		deleted: boolean;
		devOnly: boolean;
		permissionsRequired: typeof PermissionFlagsBits[];
		botPermissionsRequired: typeof PermissionFlagsBits[];
		callback: (client: Client, interaction: CommandInteraction) => void;
	};
};

/**
 * # Type for command object
 * 
 * @param {string} name  The name of the command.
 * @param {string} description Description of the command.
 * @param {boolean} testOnly Controls of only the servers specified in the guild array of the config.json should be able to use this command.
 * @param {ApplicationCommandOption[]} options The options that it requires.
 * @param {boolean} devOnly Controls if only the IDs specified in the developers array of the config.json should be able to use this.
 * @param {boolean} deleted If this has been deleted.
 * @param {PermissionFlags[]} permissionsRequired The permissions that the user executing the command must have.
 * @param {PermissionFlags[]} botPermissionsRequired THe permissions that the bot must have to execute the command.
 * 
 * @example
* ```ts
* export default {
* 	name: "help",
* 	description: "Sends a message containing all the commands",
* 	options: [
* 		{
* 			name: "DMs",
* 			description: "Determines if to send the message in your DMs or in the server.",
* 			required: false,
* 			type: ApplicationCommandOptionType.Boolean,
* 		},
* 	],
* 	callback(client, interaction) {
* 		help(interaction);
* 	},
* } as TBaseCommand;
```
*/
type TBaseCommand = {
	name: string;
	description: string;
	testOnly: boolean | false;
	options: ApplicationCommandOption[];
	deleted: boolean | false;
	devOnly: boolean | false;
	permissionsRequired: typeof PermissionFlagsBits[];
	botPermissionsRequired: typeof PermissionFlagsBits[];

	/**
	 * # Callback for interaction
	 * @name callback
	 *
	 * In simple words: What to do when an interaction is recieved.
	 *
	 * @param client The client object
	 * @param interaction The interaction
	 *
	 * @example
	 * ```ts
	 * callback(client, interaction) {
	 * 	help(interaction)
	 * }
	 *
	 * help(interaction: CommandInteraction) {
	 * 	interaction.reply("Hello World!")
	 * }
	 * ```
	 */
	callback: (client: Client, interaction: CommandInteraction) => void | Promise<void>;
};

export { TCommand, TBaseCommand };
