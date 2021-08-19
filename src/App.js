/* DEPENDECIES */
import React, { Component } from "react";

/* SERVICES */
import { getForecast } from "./services/weather";

/* UTILITIES */
import { mapToLocation, mapToCurrent, mapToForecast } from "./utils/index";

/* CUSTOM COMPONENTS */
import LiveWeather from "./LiveWeather/index";
import Loader from "./commons/Loader/index";
import Location from "./Location/index";
import Forecast from "./Forecast";

/* CSS */
import "./App.css";

class App extends Component {
	state = { loading: true };
	gps = navigator.geolocation;

	async componentDidMount() {
		this.enableGPS();
	}

	updateGPS = (position) => {
		const {
			coords: { latitude: lat, longitude: lon },
		} = position;
		this.handleLocationChange({ lat, lon }, true);
	};

	enableGPS = () => {
		if (this.gps) {
			this.gpsID = this.gps.watchPosition(this.updateGPS);
		}
	};

	disableGPS = () => {
		this.gps.clearWatch(this.gpsID);
	};

	handleLocationChange = ({ lat, lon }, gpsEnabled) => {
		if (!gpsEnabled) this.disableGPS();
		this.setState({ loading: true });
		this.updateWeather({ lat, lon });
	};

	updateWeather = async (coords) => {
		const { lat, lon } = coords;
		const { data } = await getForecast(`${lat},${lon}`);
		const {
			current: currentData,
			forecast: forecastData,
			location: locationData,
		} = data;

		const location = mapToLocation(locationData);
		const forecast = mapToForecast(forecastData);
		const current = mapToCurrent(currentData);

		this.setState({
			location,
			current,
			forecast,
			loading: false,
		});
	};

	componentWillUnmount() {
		this.disableGPS();
	}

	render() {
		const { loading, location, current, forecast } = this.state;

		const content = loading ? (
			<div className="app-loader">
				<Loader />
			</div>
		) : (
			<div className="App">
				<LiveWeather location={location} weather={current} />
				<div className="details-panel">
					<Location
						location={location}
						onChangeLocation={this.handleLocationChange}
					/>
					<Forecast forecast={forecast} />
				</div>
			</div>
		);

		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default App;
