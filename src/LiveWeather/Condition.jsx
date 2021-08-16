import React from "react";
import { PropTypes } from "prop-types";
import "./Condition.css";

const Condition = ({ title, icon, value, unit }) => {
	const Icon = icon;
	return (
		<div className="live-condition">
			<Icon className="live-condition-icon" />
			<span className="live-condition-title">{title}</span>
			<span className="live-condition-value">{`${value}${unit}`}</span>
		</div>
	);
};

Condition.propTypes = {
	icon: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.number,
	unit: PropTypes.string.isRequired,
};

Condition.defaultProps = {};

export default Condition;
