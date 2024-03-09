import { Client } from "discord.js";

export default function(client: Client) {
    console.log(client.user?.tag + " is ready!")
}