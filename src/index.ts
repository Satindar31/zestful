import "dotenv/config";

import { Client } from "discord.js";
import eventHandlers from "./handlers/eventHandlers";

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
process.on("SIGINT", async () => {
	await client.destroy();
	process.exit(0);
});
process.on("SIGTERM", async () => {
	await client.destroy();
	process.exit(0);
});

client.login(process.env.BOT_TOKEN);
