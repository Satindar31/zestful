import Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import { Client, CommandInteraction } from "discord.js";

export default function (client: Client, interaction: CommandInteraction) {

	if(!Sentry) {
		console.error("Sentry was not initializsed. Please check your environment variables.");
		return;
	}
	Sentry.init({
		dsn: process.env.SENTRY_DSN!,
		tracesSampleRate: 1.0,
		integrations: [
			nodeProfilingIntegration()
		]
	});
}
