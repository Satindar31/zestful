import { GuildMember } from "discord.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Sentry from "@sentry/node";

export default async function (member: GuildMember) {
    try {
        const _member = await prisma.user.create({
            data: {
                id: member.id,
            }
        })

        return
    }
    catch(err) {
        console.error(err);
        Sentry.captureException(err);
        return
    }
}
