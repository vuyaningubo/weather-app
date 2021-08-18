import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./NewCity.css";

const NewCity = (props) => {
	return (
		<div className="location-new-city" {...props}>
			<div className="location-new-city-square">
				<i className="bi-plus-lg"></i>
			</div>
			<span>Save City</span>
		</div>
	);
};

export default NewCity;
