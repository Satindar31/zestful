import {
	APIEmbedField,
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
	EmbedBuilder,
} from "discord.js";
import { TBaseCommand } from "../../types/command";

export default {
	name: "weather",
	description: "Shows the weather of a city",
	devOnly: false,
	testOnly: false,
	botPermissionsRequired: [],
	deleted: false,
	permissionsRequired: [],
	options: [
		{
			name: "city",
			description: "City for which weather has to be shown",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "unit",
			description: "Celsius or Fahrenheit.",
			choices: [
				{
					name: "Celsius",
					value: "C",
				},
				{
					name: "Fahrenheit",
					value: "F",
				},
			],
			required: false,
			type: ApplicationCommandOptionType.String,
		},
	],
	callback: async (client: Client, interaction: CommandInteraction) => {
		await interaction.deferReply({
			ephemeral: false,
		});
		weather(interaction);
	},
} as TBaseCommand;

export async function weather(interaction: CommandInteraction) {
	const unit = interaction.options.get("unit");

	const city = interaction.options.get("city")!.value?.toString();

	const cords: { lat: number; lon: number } = await getCords(city!);

	const currentWeather: any = await getWeather(cords.lat, cords.lon);

	// Convert kelvin to farhenheit

	const tempK = currentWeather.main.temp;
	const tempC = Math.round(currentWeather.main.temp - 273.15);
	const tempF = Math.round((tempK - 273.15) * 1.8 + 32);

	const fields: APIEmbedField[] = [
		{
			name: "Temprature",
			value:
				(unit?.value == "F"
					? tempF.toString() + "ºF"
					: tempC.toString() + "ºC") ?? tempC.toString() + "ºC",
		},
		{
			name: "Humidity",
			value: `${currentWeather.main.humidity}%`,
		},
		{
			name: "Wind Speed",
			value: `${currentWeather.wind.speed}m/s`,
		},
		{
			name: "Weather",
			value: `${currentWeather.weather[0].description}`,
		},
	];

	const embed = new EmbedBuilder()
		.setAuthor({
			name: interaction.client.user.username,
		})
		.setDescription("Current weather for " + city)
		.addFields(fields)
		.setColor(0xfff)
		.setFooter({
			text: "Powered by OpenWeatherMap",
			iconURL:
				"https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png",
		})
		.setTitle("Weather")
		.setThumbnail(
			"https://openweathermap.org/img/wn/" +
				currentWeather.weather[0].icon +
				".png"
		);

	interaction.editReply({ embeds: [embed] });
	return;
}
/**
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 *
 * @example
 * ```ts
 * await weather(1, 2)
 * ```
 */
async function getWeather(lat: number, lon: number) {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
	);

	const weather = await res.json();
	return weather;
}

/**
 * This function is used to get the coordinates.
 *
 * @param {string} city - City for which cords have to be recieved
 * @returns {object} - `{lat: number, lon: number}`
 * @example
 * ```ts
 * await getCords('Srinagar')
 * ```
 */
export async function getCords(city: string) {
	const resp = await fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
	);
	const res = await resp.json();

	return {
		lat: res[0].lat as number,
		lon: res[0].lon as number,
	};
}
