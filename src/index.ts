import "dotenv/config";

import { Client } from "discord.js";
import eventHandlers from "./handlers/eventHandlers";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const client = new Client({
	intents: [
		"GuildBans",
		"GuildMembers",
		"Guilds",
		"MessageContent",
		"DirectMessages",
	],
});

eventHandlers(client);


// Will stop bot on SIGINT or SIGTERM
process.once("SIGINT", async () => {
	console.log("Shutting down bot");
	await prisma.$disconnect()
	await client.destroy();
	process.exit(0);
});
process.once("SIGTERM", async () => {
	console.log("Shutting down bot");
	try {
		console.log("Disconnecting from Discord API");
		await client.destroy();
		console.log("Disconnecting from DB");
		await prisma.$disconnect()
		process.exit(0);
	}
	catch (e) {
		console.error(e);
		process.exit(1);
	}
});

process.on('exit', () => {
	console.log('Bot has closed all connections to DB and Discord API. Exiting...');
	console.log("Goodbye!")
})

client.login(process.env.BOT_TOKEN);
