import React from "react";
import { PropTypes } from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Result.css";

const Result = ({ location, onClick }) => {
	const { city } = location;
	return (
		<div className="result" onClick={() => onClick(location)}>
			<h3 className="search-result-city">{city}</h3>
			<i className="bi-arrow-return-left"></i>
		</div>
	);
};

Result.propTypes = {
	location: PropTypes.shape({
		city: PropTypes.string,
		country: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number,
		localtime: PropTypes.string,
	}),
	onClick: PropTypes.func,
};

export default Result;
