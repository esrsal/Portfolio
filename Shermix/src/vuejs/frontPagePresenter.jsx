import FrontPageView from "../views/frontPageView.jsx";

export default function FrontPage(props) {
	return (
		<div>
			<FrontPageView onClickChange={showRandomDrinks} onClickChangeTo={showMocktails} onClickCocktailACB={showCocktails} />
		</div>
	);

	function showRandomDrinks() {
		props.model.getRandomDrink();
	}

	function showMocktails() {
		props.model.getMocktail();
	}

	function showCocktails() {
		props.model.getGlass();
	}
};