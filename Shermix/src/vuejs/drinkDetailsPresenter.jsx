import DetailsView from "../views/drinkDetailsView";
import "/src/css/loading.css";

export default function Details(props) {

    // Determines what to render based on the state
    // Based on DinnerModel Lab code written by Linnea and Jennifer
    if (!props.model.currentDrinkPromiseState.promise) {
        return <div>no data</div>;
    }
    if (!props.model.currentDrinkPromiseState.data && !props.model.currentDrinkPromiseState.error) {
        return <div className="loading-image"><img src="https://brfenergi.se/iprog/loading.gif" /></div>
    }
    if (props.model.currentDrinkPromiseState.error) {
        return <div>{props.model.currentDrinkPromiseState.error}</div>;
    }

    // Get drink object from props (first element in array)
    const drink = props.model.currentDrinkPromiseState.data.drinks[0];

    // Create an empty array and add ingredients (max 15)
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = drink['strIngredient' + i];
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }

    function addToFavoritesACB() {
        props.model.addToFavorites(drink);
    }

    function isDrinkInFavoritesCB(drink) {
        if (drink.idDrink === props.model.currentDrink) {
            return true;
        }
        return false;
    }

    return (
        <DetailsView isDrinkInFavorites={props.model.favorites.find(isDrinkInFavoritesCB)}
            drinkData={props.model.currentDrinkPromiseState.data}
            addToFavoritesList={addToFavoritesACB} isUserLoggedIn={props.model.authenticated}
            drinkDetails={props.model.currentDrinkPromiseState.data}
            ingredients={ingredients} drink={drink}
            model={props.model} />
    );
}