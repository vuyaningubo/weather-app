import http from "axios";

const httpInstance = http.create();
httpInstance.defaults.baseURL = process.env.REACT_APP_API_URL;
httpInstance.defaults.params = {
	key: process.env.REACT_APP_API_KEY,
};

export const getSavedLocations = () => {
	const citiesJSON = localStorage.getItem("savedCities");
	return citiesJSON ? JSON.parse(citiesJSON) : [];
};

export const saveLocation = (city) => {
	const cities = getSavedLocations();
	cities.push(city);
	const citiesJSON = JSON.stringify(cities);
	localStorage.setItem("savedCities", citiesJSON);
	return true;
};

export const searchLocation = (query) => {
	return httpInstance.get(`/search.json?q=${query}`);
};
