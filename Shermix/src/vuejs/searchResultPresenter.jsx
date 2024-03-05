import SearchResultView from "../views/searchResultView.jsx";
import "/src/css/loading.css";

export default function SearchResult(props) {

	// Update current drink in model, using the provided drink id
	function setDrinkACB(drink) {
		props.model.setCurrentDrink(drink.idDrink);
	}

	return (
		<div class="searchResult">
			{
				getSearchResult()
			}
		</div>
	);

	function getSearchResult() {

		if (props.model.currentSearchParamArray.length < 1) {
			return <div className="combination-error">Oops! It looks like the search bar is empty. Please enter your ingredients! 🍹✨</div>;
		}

		if (props.model.searchResultsPromiseState.data && Array.isArray(props.model.searchResultsPromiseState.data.drinks)) {
			return <div><SearchResultView getDrink={props.model.searchResultsPromiseState.data} handleDrinkClick={setDrinkACB} /></div>;
		}

		else if (!(props.model.searchResultsPromiseState.promise)) {
			return <div>no data</div>;
		}

		else if (props.model.searchResultsPromiseState.promise && (!props.model.searchResultsPromiseState.error) && (!props.model.searchResultsPromiseState.data)) {
			return <div className="loading-image"><img src="https://i.gifer.com/JVX7.gif"></img> </div>;
		}

		else if ((props.model.searchResultsPromiseState.error) && (!props.model.searchResultsPromiseState.data)) {
			return <div>{props.model.searchResultsPromiseState.error}</div>;
		}

		return <div className="combination-error">Oops! It looks like our mixologists are on a break. Please try a different combination! 🍹✨</div>;
	}
}