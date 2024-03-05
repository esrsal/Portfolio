import "/src/css/drinks.css";

function FavoriteView(props) {
  return (<div className="drinks-container">
    <div>
      <section>
        <div className="drinks-intro">
          <h1>Your Favorites</h1>
          <p>Here are the cocktails you love, crafted just for you based on your ingredients. Enjoy!<br></br></p>
        </div>
      </section>
      <div className="image-placement">
        {
          props.drinks.map(drinkTableRowCB)
        }
      </div>
    </div>
  </div>
  );

  function drinkTableRowCB(drink) {

    // Handles the click event for a drink, updating state and navigating to details
    function onDrinkClickACB() {
      props.setCurrent(drink)
      window.location.hash = "#/details"
    }

    function xClickedACB() {
      props.deleteDrink(drink);
    }

    return (
      <div>
        <button class="x-button" type="x-button" onClick={xClickedACB}>x</button>
        <span key={drink.idDrink} className="typeOfDrink" onClick={onDrinkClickACB}>
          <div>
            <div>
              <img src={drink.strDrinkThumb} height="300" className="center-border"></img>
              <div className="imageText">{drink.strDrink}</div>
            </div>
          </div>
        </span>
      </div>
    )
  }
}

export default FavoriteView;