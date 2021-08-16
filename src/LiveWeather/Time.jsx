import React, { Component } from "react";
import { padStart } from "lodash";
import { PropTypes } from "prop-types";

const DAYS_LIBRARY = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

class Time extends Component {
	state = { date: null, loading: true };
	refreshInterval = 10000;

	tick = () => {
		const { date } = this.state;
		const epochTime = date.getTime();

		const newDate = new Date(epochTime + this.refreshInterval);
		this.setState({ date: newDate });
	};

	format = (date) => {
		const day = DAYS_LIBRARY[date.getDay()];
		const hour = date.getHours();
		const minute = date.getMinutes();

		return `${day}, ${padStart(hour, 2, 0)}:${padStart(minute, 2, 0)}`;
	};

	componentDidMount() {
		const { localtime } = this.props;
		const date = new Date(localtime);
		this.setState({ date, loading: false });
		this.timerID = setInterval(this.tick, this.refreshInterval);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		const { date, loading } = this.state;
		const content = loading ? (
			<span className="live-time-loading"></span>
		) : (
			<span className="live-time-content">{this.format(date)}</span>
		);

		return <div className="live-time">{content}</div>;
	}
	date;
}

Time.propTypes = {
	localtime: PropTypes.string,
};

export default Time;
