import MocktailView from "../views/mocktailView";
import "/src/css/loading.css";

export default function Mocktail(props) {
    return (
        <div>
            {
                getMocktail()
            }
        </div>
    );

    function showMocktailDrinks() {
        props.model.getRandomDrink();
    }

    function showSearchResultACB() {
        props.model.doSearch();
    }

    // Update current drink in model, using the provided drink id
    function setDrinkACB(drink) {
        props.model.setCurrentDrink(drink.idDrink);
    }

    function getMocktail() {
        if (props.model.mocktailDrinkPromiseState.data) {
            return <MocktailView getDrink={props.model.mocktailDrinkPromiseState.data} onClickChangeRandom={showMocktailDrinks} onClickChangeSearch={showSearchResultACB} handleDrinkClick={setDrinkACB} />;
        }
        if (!props.model.mocktailDrinkPromiseState.promise) {
            return <div>no data</div>;
        }
        if (!props.model.mocktailDrinkPromiseState.data && !props.model.mocktailDrinkPromiseState.error) {
            return <div className="loading-image"><img src="https://brfenergi.se/iprog/loading.gif" /></div>
        }
        if (props.model.mocktailDrinkPromiseState.error) {
            return <div>{props.model.mocktailDrinkPromiseState.error}</div>;
        }
    }
}