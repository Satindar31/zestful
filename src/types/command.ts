import {
	Client,
	CommandInteraction,
	Interaction,
	PermissionFlags,
	PermissionsBitField,
} from "discord.js";

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

type TBaseCommand = {
	name: string;
	description: string;
	testOnly: boolean;
	options: any[];
	deleted: boolean;
	devOnly: boolean;
	permissionsRequired: PermissionFlags[];
	botPermissionsRequired: PermissionFlags[]
	callback: (client: Client, interaction: CommandInteraction) => void;
};

export { TCommand, TBaseCommand };
