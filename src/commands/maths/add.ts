import { Client, CommandInteraction } from "discord.js";

export default {
	name: 'add',
	description: 'Shows your ping',
	// devOnly: boolean,
	// testOnly: boolean,
	// options: Object[],
	callback: (client: Client, interaction: CommandInteraction) => {
		interaction.reply('Pong!')
	},
}


// import { CommandInteraction } from "discord.js";

// /**
//  * # Add command
//  * ## Will reply with 'The sum is `sum`'
//  * 
//  * @param interaction The interaction object
//  * 
//  * @example
//  * ```ts
//  * client.on('interactionCreate', (interaction) => {
//  *     const i = interaction as CommandInteraction;
//  *      if (!i.isCommand() || i.user.bot) return;
//  *      if(i.commandName === 'add') {
//  *         add(i)
//  *     };
//  * });
//  * ```
//  */
// export default function (interaction: CommandInteraction) {
// 	const num1 = interaction.options.get("num1")!.value as number;
// 	const num2 = interaction.options.get("num2")!.value as number;
// 	interaction.reply({ content: `The sum is ${num1 + num2}`, ephemeral: true });
// }
