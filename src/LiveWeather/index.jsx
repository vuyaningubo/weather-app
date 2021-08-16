/* DEPENDECIES */
import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { isEqual } from "lodash";

/* CUSTOM SERVICES & UTILITIES */
import weatherService from "../services/weather";
import { mapToLocation, mapToCurrent, mapToCondition } from "../utils/";

/* CUSTOM COMPONENTS */
import WeatherIcon from "../commons/WeatherIcon/index";
import Condition from "./Condition";
import Time from "./Time";

/* CSS */
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

class LiveWeather extends Component {
	state = {
		location: {},
		weather: {},
		loading: true,
	};

	updateInterval = 600000;

	updateWeather = async () => {
		const {
			location: { lat, lon },
		} = this.state;
		const { data } = await weatherService.getCurrent(`${lat},${lon}`);
		const { location: locationData, current: currentData } = data;

		const weather = mapToCurrent(currentData);
		const location = mapToLocation(locationData);

		this.setState({ location, weather });
	};

	compareLocation = (nextLocation) => {
		return isEqual(this.state.location, nextLocation);
	};

	compareWeather = (nextWeather) => {
		return isEqual(this.state.weather, nextWeather);
	};

	componentDidMount() {
		const { location, weather } = this.props;
		this.setState({ location, weather, loading: false });
		this.intervalID = setInterval(this.updateWeather, this.updateInterval);
	}

	shouldComponentUpdate(nextProps, nextState) {
		/* Compare State */
		if (!isEqual(this.state, nextState)) return true;
		else if (nextProps.weather && nextProps.location) {
			const { weather: nextWeather, location: nextLocation } = nextProps;
			/* Compare Incoming Props */
			if (
				!this.compareWeather(nextWeather) &&
				!this.compareLocation(nextLocation)
			) {
				this.setState({
					location: nextLocation,
					weather: nextWeather,
					loading: false,
				});
				return true;
			} else return false;
		}
		return false;
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	render() {
		const { loading } = this.state;

		if (loading) {
			return <div className="live-weather-loader"></div>;
		} else {
			const {
				location: { city, country, localtime },
			} = this.state;
			const {
				weather: {
					isDay,
					code,
					temperature,
					cloudCover,
					precipitation,
					feelsLike,
				},
			} = this.state;

			const background = {
				backgroundColor: `${isDay ? "#448ee4" : "#0a0b3a"}`,
			};

			const cloudIcon = (props) => (
				<i className={`bi-cloud ${props.className}`}></i>
			);
			const precipitationIcon = (props) => (
				<i className={`bi-droplet ${props.className}`}></i>
			);
			const temperatureIcon = (props) => (
				<i className={`bi-thermometer ${props.className}`}></i>
			);

			return (
				<div className="live-weather" style={background}>
					<div className="live-icon-container">
						<WeatherIcon
							className="live-weather-icon"
							condition={mapToCondition(code)}
							isDay={isDay}
						/>
					</div>
					<div>
						<h1 className="live-temperature">{`${temperature}°`}</h1>
						<h2 className="live-location">
							{city}, {country}
						</h2>
						<Time localtime={localtime} />
					</div>
					<div className="live-highlights">
						<Condition
							title={"Cloud Cover"}
							icon={cloudIcon}
							value={cloudCover}
							unit={"%"}
						/>
						<Condition
							title={"Precipitation"}
							icon={precipitationIcon}
							value={precipitation}
							unit={"mm"}
						/>
						<Condition
							title={"Feel Like"}
							icon={temperatureIcon}
							value={feelsLike}
							unit={"°"}
						/>
					</div>
				</div>
			);
		}
	}
}

LiveWeather.propTypes = {
	location: PropTypes.shape({
		city: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		lat: PropTypes.number.isRequired,
		lon: PropTypes.number.isRequired,
	}),
	weather: PropTypes.shape({
		isDay: PropTypes.bool,
		code: PropTypes.number.isRequired,
		temperature: PropTypes.number.isRequired,
		cloudCover: PropTypes.number.isRequired,
		precipitation: PropTypes.number.isRequired,
		feelsLike: PropTypes.number.isRequired,
	}),
};

export default LiveWeather;
