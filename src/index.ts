import "dotenv/config";

import { Client } from "discord.js";
import eventHandlers from "./handlers/eventHandlers";

const client = new Client({
	intents: ["GuildBans", "GuildMembers", "Guilds", "MessageContent"],
});


eventHandlers(client)

client.login(process.env.BOT_TOKEN);
