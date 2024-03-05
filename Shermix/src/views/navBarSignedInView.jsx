import "/src/css/searchBar.css";
import "/src/css/navBar.css";
import "/src/css/header.css";

function NavBarSignedInView(props) {
  return (
    <div className="navigation">
      <ul>
        <li onClick={signedOutACB}>Sign out</li>
        <li onClick={favoritesACB}><img className="heart" src="https://img.icons8.com/ios-filled/50/FFFFFF/like--v1.png" alt="like--v1" /></li>
        <li><a onClick={newRandomCocktailsACB}>Cocktails</a></li>
        <li><a onClick={newMocktailsACB}>Mocktails</a></li>
      </ul>
    </div>
  )

  function newRandomCocktailsACB() {
    window.location.hash = "#/random"
    props.onClickChangeRandom();
  }

  function newMocktailsACB() {
    window.location.hash = "#/mocktail"
    props.onClickChangeMocktail();
  }

  function signedOutACB() {
    props.onClickSignedOut();
  }

  function favoritesACB() {
    window.location.hash = "#/favorites"
  }
}

export default NavBarSignedInView;