/* DEPENDENCIES */
import React, { Component } from "react";

/* SERVICES */
import { searchLocation } from "../services/location";
import { mapToLocation } from "../utils/index";

/* CUSTOM COMPONENTS */
import SearchBox from "../commons/SearchBox";
import Result from "./Result";

/* CSS */
import "./index.css";

class Search extends Component {
	state = { query: "", results: [], loading: false };

	handleSearch = async (query) => {
		this.setState({ query });
		if (Boolean(query)) {
			const { data } = await searchLocation(query);

			const results = data.map((locationData) => {
				let location = mapToLocation(locationData);
				const elements = location.city.split(", ");

				return {
					...location,
					city: elements[0] + ", " + elements[1],
				};
			});

			this.setState({ results });
		} else this.setState({ results: [] });
	};

	render() {
		const { query, results } = this.state;
		const resultsComponent = results.map((location) => (
			<Result
				key={location.city}
				location={location}
				onClick={(location) => {
					this.props.onChangeLocation(location);
					this.props.onDisableSearch();
				}}
			/>
		));

		return (
			<div className="overlay-container" onClick={this.props.onDisableSearch}>
				<div className="search" onClick={(event) => event.stopPropagation()}>
					<SearchBox value={query} onChange={this.handleSearch} autoFocus />
					{Boolean(results.length) && (
						<div className="search-results">{resultsComponent}</div>
					)}
				</div>
			</div>
		);
	}
}

export default Search;
