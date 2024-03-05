export function getIngredientSuggestions(query, ingredients) {
	function filterByIngredientList(ingr) {
		if (ingr.strIngredient1.toLowerCase().startsWith(query.toLowerCase())) {
			return ingr;
		}
	}
	const suggestions = ingredients.filter(filterByIngredientList);
	return suggestions;
};

export function getSearchQuery(ingredientList) {
	function getStrProperty(ingredient) {
		return ingredient.strIngredient1;
	}
	const list = ingredientList.map(getStrProperty);
	return list.join(',');
};