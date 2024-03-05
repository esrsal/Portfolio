import RandomDrinksView from "../views/randomDrinksView";
import "/src/css/loading.css";

export default function RandomPresenter(props) {
    return (
        <div>
            {
                getRandom()
            }
        </div>
    );

    function showRandomDrinks() {
        props.model.getRandomDrink();
    }

    function showSearchResultACB() {
        props.model.doSearch();
    }

    // Update current drink in model, using the provided drink id
    function setDrinkACB(drink) {
        props.model.setCurrentDrink(drink.idDrink);
    }

    function getRandom() {
        if (props.model.randomDrinkPromiseState.data) {
            return <RandomDrinksView getDrink={props.model.randomDrinkPromiseState.data} onClickChangeRandom={showRandomDrinks} onClickChangeSearch={showSearchResultACB} handleDrinkClick={setDrinkACB} />;
        }
        if (!props.model.randomDrinkPromiseState.promise) {
            return <div>no data</div>;
        }
        if (!props.model.randomDrinkPromiseState.data && !props.model.randomDrinkPromiseState.error) {
            return <div className="loading-image"><img src="https://brfenergi.se/iprog/loading.gif" /></div>
        }
        if (props.model.randomDrinkPromiseState.error) {
            return <div>{props.model.randomDrinkPromiseState.error}</div>;
        }
    }
}