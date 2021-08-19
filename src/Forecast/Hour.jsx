import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { padStart } from "lodash";
import { mapToCondition } from "../utils/index";
import WeatherIcon from "../commons/WeatherIcon/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Hour.css";
import TemperatureGraphic from "./TemperatureGraphic";

class Hour extends Component {
	renderContent = (
		hour,
		isDay,
		chanceOfRain,
		code,
		description,
		temperature
	) => {
		return (
			<div className="hour-content">
				<h3 className="hour-title">{hour}</h3>
				<div className="hour-chance-of-rain">
					<i className="bi-droplet-fill rain-drop"></i>
					<span>{chanceOfRain}%</span>
				</div>
				<div className="hour-condition">
					<WeatherIcon
						className="hour-condition-icon"
						condition={mapToCondition(code)}
						isDay={isDay}
					/>
					<span className="hour-condition-description">{description}</span>
				</div>
				<div className="hour-temperature">
					<TemperatureGraphic temperature={temperature} />
					<span className="hour-temperature-value">{temperature}°</span>
				</div>
			</div>
		);
	};

	render() {
		const {
			time,
			isDay,
			chanceOfRain,
			condition: { code, description },
			temperature,
		} = this.props;
		const hour = `${padStart(time.getHours(), 2, 0)}h00`;

		return (
			<div className="hourly-weather">
				{this.renderContent(
					hour,
					isDay,
					chanceOfRain,
					code,
					description,
					temperature
				)}
			</div>
		);
	}
}

Hour.propTypes = {
	time: PropTypes.object,
	isDay: PropTypes.bool,
	chanceOfRain: PropTypes.number,
	condition: PropTypes.shape({
		code: PropTypes.number,
		description: PropTypes.string,
	}),
	temperature: PropTypes.number,
};

export default Hour;
