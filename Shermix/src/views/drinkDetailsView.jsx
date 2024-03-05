import "/src/css/details.css";

function DetailsView(props) {
    return (
        <div className="details-container">
            <section>
                <div className="details-intro">
                    <h1>Drink Details</h1>
                </div>
            </section>
            <div className="favoritesButton">{getAddButton(props)}</div>
            <div className="detailsContainer">
                <div className="detailsBoxStyle">
                    <div>
                        <div className="detailsTitle">{props.drink.strDrink}</div>
                        <div>
                            <img height="300" className="detailsImageStyle" src={props.drink.strDrinkThumb} />
                        </div>
                    </div>
                </div>
                <div className="detailsBoxStyle">
                    <div>
                        <div className="detailsTitle">Recipe</div>
                        <div className="detailsBoxContent">
                            {props.ingredients.map(ingredientsRenderingCB)}
                        </div>
                    </div>
                </div>
                <div className="detailsBoxStyle">
                    <div>
                        <div className="detailsTitle">Instructions</div>
                        <div className="detailsBoxContent">{props.drink.strInstructions}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    function getAddButton(props) {
        if (typeof (props.drinkData) === 'undefined') {
            return "";
        }
        function favoriteButtonClickedACB() {
            props.addToFavoritesList();
        }
        return <button class="favorite-button" disabled={(!props.isUserLoggedIn || props.isDrinkInFavorites)} onClick={favoriteButtonClickedACB}>Add to Favorites</button>;
    }

    function ingredientsRenderingCB(ingredient, number) {
        return <li key={number}>{ingredient}</li>;
    }
}

export default DetailsView;