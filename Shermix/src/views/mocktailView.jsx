import "/src/css/drinks.css";

function MocktailView(props) {
    return (<div className="drinks-container">
        <div>
            <section>
                <div className="drinks-intro">
                    <h1>Mocktails</h1>
                    <p><h3>Discover Your Next Favorite Mocktail! </h3>
                        Welcome to the thrill of the unexpected at Shermix. Here you can find a surprise mix from our extensive collection, both alcoholic and non-alcoholic. It's a simple way to explore new flavors and find your next favorite mocktail with just a click!
                    </p>
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

export default MocktailView;