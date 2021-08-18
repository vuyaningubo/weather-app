/* DEPENDECIES */
import { React, Component } from "react";
import { PropTypes } from "prop-types";
import { toast, ToastContainer } from "react-toastify";

/* SERVICES */
import { getCurrent } from "../services/weather";
import { getSavedLocations, saveLocation } from "../services/location";

/* CUSTOM COMPONENTS */
import SearchBox from "../commons/SearchBox/index";
import NewCity from "./NewCity";
import Search from "../Search";
import City from "./City";

/* CSS */
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

class Location extends Component {
	state = { cities: [], isSearchActive: false };

	toggleSearch = () => {
		this.setState((prevState) => ({
			isSearchActive: !prevState.isSearchActive,
		}));
	};

	saveCity = (location) => {
		if (saveLocation(location)) this.updateWeather();
		else toast.error("Oops! It seems you've reached capacity.");
	};

	updateWeather = async () => {
		const savedLocations = getSavedLocations();
		const cities = await Promise.all(
			savedLocations.map(async (location) => {
				const { lat, lon } = location;
				const { data } = await getCurrent(`${lat},${lon}`);
				const {
					temp_c,
					condition: { text: description, code },
				} = data.current;
				return {
					location,
					temperature: Math.round(temp_c),
					condition: { code, description },
				};
			})
		);
		this.setState({ cities });
	};

	componentDidMount() {
		this.updateWeather();
	}

	render() {
		const { cities, isSearchActive } = this.state;
		const cityComponents = cities.map(
			({ location, temperature, condition }) => (
				<City
					key={location.city}
					location={location}
					temperature={temperature}
					condition={condition}
					onClick={this.props.onChangeLocation}
				/>
			)
		);

		return (
			<div className="location">
				<ToastContainer />
				<SearchBox onClick={this.toggleSearch} readOnly={true} />
				<div className="cities">
					{cityComponents}
					<NewCity onClick={() => this.saveCity(this.props.location)} />
				</div>
				{isSearchActive && (
					<Search
						onChangeLocation={this.props.onChangeLocation}
						onDisableSearch={this.toggleSearch}
					/>
				)}
			</div>
		);
	}
}

Location.propTypes = {
	location: PropTypes.shape({
		city: PropTypes.string,
		country: PropTypes.string,
		localtime: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number,
	}),
	onChangeLocation: PropTypes.func,
};

export default Location;
