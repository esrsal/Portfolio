import FavoriteView from "../views/favoritesView.jsx";
import "/src/css/loading.css";

export default function Favorite(props) {
    function deleteDrinkACB(drink) {
        props.model.removeFromFavorites(drink);
    }

    function setCurrentACB(drink) {
        props.model.setCurrentDrink(drink.idDrink);
    }

    return getFavoritesResult();

    function getFavoritesResult() {
        if (props.model.favorites.length < 1) {
            return <div className="combination-error">Your favorites collection appears to be empty. Why not explore and add some delightful drinks? 🍸💫</div>;
        } else {
            return (
                <FavoriteView drinks={props.model.favorites} deleteDrink={deleteDrinkACB} setCurrent={setCurrentACB}
                />
            );
        }
    }
}