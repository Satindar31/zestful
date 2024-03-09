import { Client } from "discord.js";
import getAllFIles from "../utils/getAllfiles";
import path from "path";

export default function (client: Client) {

	const eventFolders = getAllFIles(path.join(__dirname, "..", "events"), true);
	console.log(path.join(__dirname, "..", "events"));

	for (const eventFolder of eventFolders) {
		const eventFiles = getAllFIles(eventFolder);

		eventFiles.sort((a, b) => {
			if (a > b) {
				return 1;
			} else if (a < b) {
				return -1;
			} else {
				return 0;
			}
		});

		const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

		if (eventName) {
			client.on(eventName, async (arg) => {
				for (const eventFile of eventFiles) {
					const eventFunction = require(eventFile).default;
					await eventFunction(client, arg);
				}
			});
		}
	}
}
