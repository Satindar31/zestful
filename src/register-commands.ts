import "dotenv/config";
import {
	ApplicationCommandOptionType,
	REST,
	Routes,
} from "discord.js";

const commands = [
	{
		name: "ping",
		description: "Replies with Pong!",
	},
	{
		name: "add",
		description: "Adds two numbers together",
		options: [
			{
				name: "num1",
				description: "The first number",
				required: true,
				type: ApplicationCommandOptionType.Number,
			},
			{
				name: "num2",
				description: "The second number",
				required: true,
				type: ApplicationCommandOptionType.Number,
			},
		],
	},
	{
		name: "weather",
		description: "Get the weather of a city",
		options: [
			{
				name: "city",
				description: "The city you want to get the weather of",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
		],
	},
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);
(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID!,
				process.env.GUILD_ID!
			),
			{
				body: commands,
			}
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();
