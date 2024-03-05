// Some of the code in this file is based on the dishSource file written in a previous DH2642 lab by Sophie and Esra
import { BASE_URL, API_KEY, headers } from "../src/apiConfig.js";

function getJSONFromFetchACB(result) {
	if (!result.ok) {
		throw new Error("Error: Unable to fetch JSON");
	}
	return result.json();
}

function getResultACB(result) {
	return result;
}

// Test function, returns 20 of the most popular drinks.
export function testAPIFetch() {
	const url = BASE_URL + API_KEY + '/popular.php';
	return fetch(url, headers).then(getJSONFromFetchACB);
}

// Searches for drinks according to the search parameters
export function searchDrinks(searchParams) {
	const url = BASE_URL + API_KEY + '/filter.php?i=' + searchParams;
	return fetch(url, headers).then(getJSONFromFetchACB).then(getResultACB);
}

export function fetchGlassDrinks(glassParam) {
	const url = BASE_URL + API_KEY + '/filter.php?g=' + glassParam;
	return fetch(url, headers).then(getJSONFromFetchACB);
}

// Get drink details of a specific drink, returns array with one object
export function fetchDrinkDetails(drinkId) {
	const url = BASE_URL + API_KEY + '/lookup.php?i=' + drinkId;
	return fetch(url, headers).then(getJSONFromFetchACB);
}

export function fetchRandomDrinks() {
	const url = BASE_URL + API_KEY + '/randomselection.php';
	return fetch(url, headers).then(getJSONFromFetchACB);
}

export function fetchMocktailDrinks() {
	const url = BASE_URL + API_KEY + '/filter.php?a=Non_Alcoholic';
	return fetch(url, headers).then(getJSONFromFetchACB);
}

// Returns all the available ingredients from the API
export function getAllIngredientsList() {
	const ingr = BASE_URL + API_KEY + '/list.php?i=list';
	return fetch(ingr).then(getJSONFromFetchACB).then(getResultACB);
};