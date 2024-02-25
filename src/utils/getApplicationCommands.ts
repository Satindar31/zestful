import { Client, FetchGuildOptions } from "discord.js";

export default async function(client: Client, guildID: number | FetchGuildOptions) {
    let applicationCommands;

    if(guildID) {
        const guild = await client.guilds.fetch(guildID as unknown as string)

        applicationCommands = guild.commands
    } else {
        applicationCommands = await client.application?.commands
    }

    await applicationCommands?.fetch({ guildId: guildID as unknown as string })
    return applicationCommands
}