import HeaderView from "../views/headerView.jsx";
import NavBarSignedInView from "../views/navBarSignedInView.jsx";
import NavBarSignedOutView from "../views/navBarSignedOutView.jsx";

export default function Header(props) {
     return (
          <div><HeaderView />
               <div>{getNavBar()}
               </div>
          </div>
     )

     function getNavBar() {
          if (props.model.authenticated) {
               return (
                    <NavBarSignedInView onClickChangeRandom={showRandomDrinks} onClickChangeMocktail={showMocktails}
                         onClickSignedOut={signedOutUser} model={props.model} />
               )
          }
          else {
               return (
                    <NavBarSignedOutView onClickChangeRandom={showRandomDrinks} onClickChangeMocktail={showMocktails}
                         model={props.model} />
               )
          }
     }

     function showRandomDrinks() {
          props.model.getRandomDrink();
     }

     function showMocktails() {
          props.model.getMocktail();
     }

     function signedOutUser() {
          props.model.signOutNow();
     }
};