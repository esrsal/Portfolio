import "/src/css/drinks.css";

function SearchResultView(props) {
    return (<div className="drinks-container">
        <div>
            <section>
                <div className="drinks-intro">
                    <h1>Cocktails</h1>
                    <p>Based on the ingredients you provided these cocktails are the best match for you.<br></br></p>
                </div>
            </section>
            <div className="image-placement">
                {
                    props.getDrink.drinks.map(drinksRenderingCB)
                }
            </div>
        </div>
    </div>
    );

    function drinksRenderingCB(drink) { // CB chosen due to always displaying drink types

        // Handles the click event for a drink, updating state and navigating to details
        function onDrinkClickACB() {
            props.handleDrinkClick(drink)
            window.location.hash = "#/details"
        }

        return (
            <div>
                <span key={drink.idDrink} className="typeOfDrink" onClick={onDrinkClickACB}>
                    <div>
                        <div>
                            <img src={drink.strDrinkThumb} height="300" className="center-border" ></img>
                            <div className="imageText">{drink.strDrink}</div>

                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

export default SearchResultView;