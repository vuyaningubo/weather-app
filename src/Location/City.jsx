import React from "react";
import WeatherIcon from "../commons/WeatherIcon/index";
import { mapToCondition } from "../utils/index";
import { PropTypes } from "prop-types";
import "./City.css";

const City = ({ location, temperature, condition, onClick }) => {
	const { city } = location;
	const { code, description } = condition;
	return (
		<div className="location-city" onClick={() => onClick(location)}>
			<div>
				<h3 className="location-city-name">{city}</h3>
				<div className="location-city-condition">
					<WeatherIcon
						className="location-city-icon"
						condition={mapToCondition(code)}
					/>
					<p className="location-city-condition-description">{description}</p>
				</div>
			</div>
			<div>
				<h1>{temperature}°</h1>
			</div>
		</div>
	);
};

City.propsTypes = {
	location: PropTypes.shape({
		city: PropTypes.string,
		country: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number,
	}),
	temperature: PropTypes.number,
	condition: PropTypes.shape({
		code: PropTypes.number,
		description: PropTypes.string,
	}),
	onClick: PropTypes.func,
};

export default City;
