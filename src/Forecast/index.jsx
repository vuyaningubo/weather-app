import React, { Component } from "react";
import { DAYS_LIBRARY } from "../utils/index";
import Hour from "./Hour";
import "./index.css";

class Forecast extends Component {
	state = {
		selected: 0,
	};

	handleSelect = (selected) => this.setState({ selected });

	renderSelector = () => {
		const { selected } = this.state;
		const { forecast } = this.props;
		const thirdDay = DAYS_LIBRARY[forecast[2].date.getDay()];

		return (
			<div className="forecast-selector">
				<h3
					className={`selector-period ${
						selected === 0 ? "selected-period" : ""
					}`}
					onClick={() => this.handleSelect(0)}>
					Today
				</h3>
				<h3
					className={`selector-period ${
						selected === 1 ? "selected-period" : ""
					}`}
					onClick={() => this.handleSelect(1)}>
					Tomorrow
				</h3>
				<h3
					className={`selector-period ${
						selected === 2 ? "selected-period" : ""
					}`}
					onClick={() => this.handleSelect(2)}>
					{thirdDay}
				</h3>
			</div>
		);
	};

	renderContent = () => {
		const { selected } = this.state;
		const { forecast } = this.props;
		const hourlyComponents = forecast[selected].hourly.map((hour) => (
			<Hour key={hour.time.getHours()} {...hour} />
		));
		return hourlyComponents;
	};

	render() {
		return (
			<div className="forecast">
				<h1 className="weather-forecast-title">Hourly Forecast</h1>
				{this.renderSelector()}
				<div className="weather-forecast-conatiner">{this.renderContent()}</div>
			</div>
		);
	}
}

export default Forecast;
