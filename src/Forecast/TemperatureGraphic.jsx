import React from "react";
import "./TemperatureGraphic.css";

const TemperatureGraphic = ({ temperature }) => {
	const width = {
		width: `${Math.ceil((temperature / 40) * 100)}%`,
	};

	return (
		<div className="temperature-graphic">
			<div className="temperature-graphic-value" style={width}></div>
		</div>
	);
};

export default TemperatureGraphic;
