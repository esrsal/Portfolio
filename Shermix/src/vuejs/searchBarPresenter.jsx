import SearchBarView from "../views/searchBarView.jsx";
import "/src/css/searchBar.css";

export default function SearchBar(props) {

  function searchButtonACB() {
    props.model.doSearch();
  }

  function searchQueryACB(query) {
    props.model.setSearchQuery(query);
  }

  function addIngredientToSearchACB(ingr) {
    props.model.addIngredientToSearch(ingr);
  }

  function removeIngredientFromSearchACB(ingr) {
    props.model.removeIngredientFromSearch(ingr);
  }

  return (
    <div> <SearchBarView text={props.model.searchParams.query} searchButtonClicked={searchButtonACB}
      setSearchQuery={searchQueryACB} searchSuggestions={props.model.currentSearchSuggestions} addToSearch={addIngredientToSearchACB}
      removeFromSearch={removeIngredientFromSearchACB} currentSearchIngredients={props.model.currentSearchParamArray} />
    </div>
  );
}