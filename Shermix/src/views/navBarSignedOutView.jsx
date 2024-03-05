import "/src/css/searchBar.css";
import "/src/css/navBar.css";
import "/src/css/header.css";

function NavBarSignedOutView(props) {
  return (
    <div className="navigation">
      <ul>
        <li onClick={signInACB}>Sign In</li>
        <li onClick={signUpACB}>Sign Up</li>
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

  function signInACB() {
    window.location.hash = "#/signin"
  }

  function signUpACB() {
    window.location.hash = "#/register"
  }
}

export default NavBarSignedOutView;