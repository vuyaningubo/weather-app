export const mapToLocation = (data) => {
	const { name: city, country, lat, lon, localtime } = data;
	return { city, country, lat, lon, localtime };
};

export const mapToCurrent = (data) => {
	const {
		is_day: isDay,
		condition: { code },
		temp_c,
		cloud: cloudCover,
		precip_mm: precipitation,
		feelslike_c,
	} = data;
	return {
		isDay: Boolean(isDay),
		code,
		temperature: Math.round(temp_c),
		cloudCover,
		precipitation,
		feelsLike: Math.round(feelslike_c),
	};
};

export const mapToForecast = (data) => {
	const { forecastday: days } = data;
	const forecast = days.map((day) => mapToDay(day));
	return forecast;
};

const mapToDay = (data) => {
	const { date: dateString, hour: hours } = data;
	const date = new Date(dateString);
	const hourly = hours.map((hour) => mapToHour(hour));
	return { date, hourly };
};

const mapToHour = (data) => {
	const {
		time: dateString,
		is_day,
		chance_of_rain: chanceOfRain,
		condition: { code, text: description },
		temp_c,
	} = data;
	const time = new Date(dateString);
	const condition = { code, description };

	return {
		time,
		isDay: Boolean(is_day),
		temperature: Math.round(temp_c),
		chanceOfRain,
		condition,
	};
};

export const mapToCondition = (code) => {
	const conditions = [
		{
			description: "clear",
			codes: [1000],
		},
		{
			description: "cloudy",
			codes: [1003, 1006],
		},
		{
			description: "overcast",
			codes: [1009],
		},
		{
			description: "wind",
			codes: [1030, 1135, 1147],
		},
		{
			description: "thunderstorm",
			codes: [1087, 1273, 1276, 1279, 1282],
		},
		{
			description: "hailstorm",
			codes: [1264, 1261, 1252, 1249, 1237, 1207, 1204, 1069],
		},
		{
			description: "snow",
			codes: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258],
		},
		{
			description: "drizzle",
			codes: [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1198],
		},
		{
			description: "rain",
			codes: [1186, 1189, 1192, 1195, 1201, 1240, 1243, 1246],
		},
	];

	const matchedCondition = conditions.find(({ description, codes }) =>
		codes.find((c) => c === code)
	);

	return matchedCondition ? matchedCondition.description : null;
};

export const DAYS_LIBRARY = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

// eslint-disable-next-line import/no-anonymous-default-export
export default { mapToCurrent, mapToLocation, mapToCondition };
