import http from "axios";

const instance = http.create();
instance.defaults.baseURL = process.env.REACT_APP_API_URL;
instance.defaults.params = {
	aqi: "no",
	key: process.env.REACT_APP_API_KEY,
};

export function getCurrent(query) {
	return instance.get(`current.json?q=${query}`);
}

export function getForecast(query) {
	return instance.get(`forecast.json?q=${query}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getCurrent,
	getForecast,
};
