import { Client, CommandInteraction } from "discord.js";

export default {
	name: 'ping',
	description: 'Shows your ping',
	// devOnly: boolean,
	// testOnly: boolean,
	// options: Object[],
	callback: (client: Client, interaction: CommandInteraction) => {
		interaction.reply('Pong!')
	},
}



// import { APIEmbedField, CommandInteraction, EmbedBuilder } from "discord.js";

// export default async function (interaction: CommandInteraction) {
// 	const city = interaction.options.get("city")!.value?.toString();

// 	const cords = await getCords(city!);

// 	const currentWeather = await weather(cords.lat, cords.lon);

// 	// Convert kelvin to farhenheit

// 	const tempK = currentWeather.main.temp;
// 	const tempC = Math.round(currentWeather.main.temp - 273.15);
// 	const tempF = Math.round((tempK - 273.15) * 1.8 + 32);

// 	const weatherStatement = `${tempC}°C, ${tempF}°F, ${tempK}K`;

// 	console.log(weatherStatement);

// 	const fields: APIEmbedField[] = [
// 		{
// 			name: "Temprature",
// 			value: weatherStatement,
// 		},
// 		{
// 			name: "Humidity",
// 			value: `${currentWeather.main.humidity}%`,
// 		},
// 		{
// 			name: "Wind Speed",
// 			value: `${currentWeather.wind.speed}m/s`,
// 		},
// 		{
// 			name: "Weather",
// 			value: `${currentWeather.weather[0].description}`,
// 		},
// 	];

// 	const embed = new EmbedBuilder()
// 		.setAuthor({
// 			name: interaction.client.user.username,
// 		})
// 		.setDescription("Current weather for " + city)
// 		.addFields(fields)
// 		.setColor(0xfff)
// 		.setFooter({
// 			text: "Powered by OpenWeatherMap",
// 		})
// 		.setTitle("Weather");
// 	// .setThumbnail(
// 	// 	"https://openweathermap.org/img/wn/" +
// 	// 		currentWeather.weather[0].icon +
// 	// 		".png"
// 	// );

// 	interaction.reply({ embeds: [embed] });
// 	// https://youtu.be/u5_a-lQlv6A?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&t=160
// }
// /**
//  *
//  * @param {number} lat - Latitude
//  * @param {number} lon - Longitude
//  *
//  * @example
//  * ```ts
//  * await weather(1, 2)
//  * ```
//  */
// async function weather(lat: number, lon: number) {
// 	const res = await fetch(
// 		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
// 	);

// 	const weather = await res.json();
// 	return weather;
// }

// /**
//  * This function is used to get the coordinates.
//  *
//  * @param {string} city - City for which cords have to be recieved
//  * @returns {object} - `{lat: number, lon: number}`
//  * @example
//  * ```ts
//  * await getCords('Srinagar')
//  * ```
//  */
// export async function getCords(city: string) {
// 	const resp = await fetch(
// 		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
// 	);
// 	const res = await resp.json();

// 	return {
// 		lat: res[0].lat as number,
// 		lon: res[0].lon as number,
// 	};
// }
