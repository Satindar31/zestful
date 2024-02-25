import { Client, CommandInteraction, Interaction, PermissionsBitField } from "discord.js";


type TCommand = {
    default: {
        name: string;
        description: string;
        testOnly: Boolean;
        options: any[];
        deleted: Boolean;
        devOnly: Boolean;
        permissionsRequired: PermissionsBitField[];
        botPermissionsRequired: PermissionsBitField[];
        callback: (client: Client, interaction: CommandInteraction) => void;
    };
};

export {
    TCommand
}