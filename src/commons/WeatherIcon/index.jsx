import React from "react";
import { PropTypes } from "prop-types";
import ClearDay from "./assets/clear-day.svg";
import ClearNight from "./assets/clear-night.svg";
import CloudyDay from "./assets/cloudy-day.svg";
import CloudyNight from "./assets/cloudy-night.svg";
import Overcast from "./assets/overcast.svg";
import Drizzle from "./assets/drizzle.svg";
import Rain from "./assets/rain.svg";
import Hailstorm from "./assets/hailstorm.svg";
import Thunderstorm from "./assets/thunderstorm.svg";
import Snow from "./assets/snow.svg";
import Wind from "./assets/wind.svg";
import "./index.css";

const WeatherIcon = ({ condition, isDay, ...props }) => {
	let iconSVG;

	if (condition === "clear") iconSVG = isDay ? ClearDay : ClearNight;
	else if (condition === "cloudy") iconSVG = isDay ? CloudyDay : CloudyNight;
	else if (condition === "overcast") iconSVG = Overcast;
	else if (condition === "wind") iconSVG = Wind;
	else if (condition === "drizzle") iconSVG = Drizzle;
	else if (condition === "rain") iconSVG = Rain;
	else if (condition === "snow") iconSVG = Snow;
	else if (condition === "thunderstorm") iconSVG = Thunderstorm;
	else if (condition === "hailstorm") iconSVG = Hailstorm;

	return (
		<img className="weather-icon" src={iconSVG} alt="weather-icon" {...props} />
	);
};

export default WeatherIcon;

WeatherIcon.propTypes = {
	condition: PropTypes.oneOf([
		"clear",
		"cloudy",
		"overcast",
		"wind",
		"drizzle",
		"rain",
		"snow",
		"thunderstorm",
		"hailstorm",
	]).isRequired,
	isDay: PropTypes.bool,
};

WeatherIcon.defaultProps = {
	isDay: true,
};
