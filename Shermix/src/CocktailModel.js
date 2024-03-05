//Some parameters and methods in this file are based on the code written during the DH2642 labs
import { testAPIFetch, searchDrinks, fetchGlassDrinks, fetchDrinkDetails, fetchRandomDrinks, getAllIngredientsList, fetchMocktailDrinks } from "/src/drinkSource.js";
import { resolvePromise } from "/src/resolvePromise.js";
import { signOutUser } from "/src/firebaseModel.js";
import { getIngredientSuggestions, getSearchQuery } from "/src/utilities.js"

export default {
    favorites: [],
    searchParams: {},
    glassParam: {},
    currentSearchParamArray: [],
    currentSearchSuggestions: {},
    randomParams: {},
    searchResultsPromiseState: {},
    allIngredientsPromiseState: {},
    currentDrink: null,
    currentDrinkPromiseState: {},
    randomDrinkPromiseState: {},
    mocktailDrinkPromiseState: {},
    glassPromiseState: {},
    users: {
        userID: null,
        userEmail: null,
    },
    authenticated: false,

    setAuthState(state) {
        this.authenticated = state;
    },

    setUser(userData) {
        this.users.userID = userData.userID;
        this.users.userEmail = userData.userEmail;
    },

    getUserID() {
        return this.users.userID;
    },

    addToFavorites(drinkToAdd) {
        this.favorites = [...this.favorites, drinkToAdd];
    },

    setSearchQuery(string) {
        this.searchParams.query = string;
        if (string.length === 0) {
            this.currentSearchSuggestions = {};
        }
        if (string && this.allIngredientsPromiseState.data) {
            this.currentSearchSuggestions = getIngredientSuggestions(this.searchParams.query, this.allIngredientsPromiseState.data.drinks);
        }
    },

    addIngredientToSearch(ingr) {
        if (this.currentSearchParamArray.includes(ingr) || this.currentSearchParamArray.length > 7) {
            return;
        }
        this.searchParams.query = "";
        this.currentSearchSuggestions = {};
        this.currentSearchParamArray.push(ingr);
    },

    removeIngredientFromSearch(ingr) {
        function removeIngredient(ingredient) {
            if (ingredient !== ingr) {
                return ingredient;
            }
        }
        this.currentSearchParamArray = this.currentSearchParamArray.filter(removeIngredient);
    },

    removeFromFavorites(drinkToRemove) {
        function shouldWeKeepDrinkCB(drink) {
            if (drink !== drinkToRemove) {
                return drink;
            }
        }
        this.favorites = this.favorites.filter(shouldWeKeepDrinkCB);
    },

    setRandomQuery(string) {
        this.randomParams.query = string;
    },

    doSearch() {
        const searchArrayQuery = getSearchQuery(this.currentSearchParamArray);
        resolvePromise(searchDrinks(searchArrayQuery), this.searchResultsPromiseState);
        this.currentSearchSuggestions = {};
    },

    getTestSearchResult() {
        resolvePromise(testAPIFetch(), this.searchResultsPromiseState);
    },

    // Sets and fetches current drink based on the provided drink id
    setCurrentDrink(drinkId) {
        if (drinkId === this.currentDrink) {
            return null;
        }
        if (!drinkId) {
            return null;
        }
        resolvePromise(fetchDrinkDetails(drinkId), this.currentDrinkPromiseState);
        this.currentDrink = drinkId;
    },

    getRandomDrink() {
        resolvePromise(fetchRandomDrinks(), this.randomDrinkPromiseState);
    },

    getMocktail() {
        resolvePromise(fetchMocktailDrinks(), this.mocktailDrinkPromiseState);
    },

    getGlass() {
        resolvePromise(fetchGlassDrinks(), this.glassPromiseState)
    },

    getAllIngredients() {
        resolvePromise(getAllIngredientsList(), this.allIngredientsPromiseState);
    },

    signOutNow() {
        signOutUser();
    },
}