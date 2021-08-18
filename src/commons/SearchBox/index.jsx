import React from "react";
import { PropTypes } from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

const SearchBox = ({ value, placeholder, onChange, onClick, ...props }) => {
	return (
		<div className="search-box" onClick={onClick}>
			<i className="bi-search search-icon"></i>
			<input
				className="search-input"
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={({ target: { value } }) => onChange(value)}
				{...props}
			/>
		</div>
	);
};

SearchBox.propTypes = {
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
};

SearchBox.defaultProps = {
	placeholder: "Search...",
};

export default SearchBox;
