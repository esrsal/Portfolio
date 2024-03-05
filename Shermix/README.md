# Shermix

## Overview
### Welcome to Shermix - Your Personal Cocktail Discovery Platform!

Shermix is a website that displays cocktail recipes according to the specified ingredients. The user is able to search for drink recipes and generate random drink and mocktail recipes. The user is also able to log in using their e-mail or Google account and save their preferred cocktails as favorites. 

## Course
Interaction Programming and the Dynamic Web, DH2642 at KTH.

## Project
"Shermix" is an interactive application developed for the DH2642 HT23 (iprogdh) course using Vue.js, JavaScript, CSS, and HTML. The project focuses on applying the Model-View-Presenter paradigm in GUI programming, emphasizing real data and persistence. Designed for cocktail and mocktail enthusiasts, Shermix allows users to search and combine ingredients to discover new drink recipes. The development process involved collaborative group work and integration of an existing API, adhering to a structured timeline that included project proposal, submission, and a demo presentation. The project not only honed technical and collaborative skills but also provided valuable insights into user experience design. 

## Installation & Setup
- Make sure to provide a ```firebaseConfig.js``` and ```apiConfig.js``` file located in the ```/src``` directory, and a ```vite.config.js``` file in the root directory. 
- Install packages in the project root directory using ```npm install```.
- Run the project using ```npm run dev``` in the root directory.


## Project Files
### The names and roles of the components, methods or layout code I have written:
**Views:** FavoritesView, headerView, mocktailView, navBarSignedIn∑View (integrated in the header, later separated by other group members), navBarSignedOutView (integrated in the header, later separated by other group members), registerView, signInView.

**Presenters:** favoritesPresenter, headerPresenter, mocktailPresenter, registerPresenter, signInPresenter.

**Methods:**

- drinkDetailsView: getAddButton
- drinkDetailsPresenter: addToFavoritesACB, isDrinkInFavoritesCB
- favoritesView: FavoriteView, drinkTableRowCB,
- favoritesPresenter: Favorite, deleteDrinkACB, setCurrentACB, getFavoritesResult
- frontPageView: enterMocktailACB,
- frontPagePresenter: showMocktails
- headerView: HeaderView
- headerPresenter: Header (parts of it), showMocktails, signedOutUser

- mocktailView: MocktailView, mostly reused from RandomCocktailView
- mocktailPresenter: showMocktailDrinks, getMocktail
- navBarSignedInView: NavBarSignedInView, newMocktailsACB, signedOutACB, favoritesACB
- navBarSignedInPresenter: NavBarSignedIn
- navBarSignedOutView: navBarSignedOutView, signInACB, signUpACB,
- navBarSignedOutPresenter: navBarSignedOut
- registerView: RegisterPage

- registerPresenter: Register, registerUserACB, renderACB, setEmailACB, setPasswordACB, watch, checkACB, effectACB
- signInView: SignInView, signInGoogleACB
- signInPresenter: SignIn, getSignInUserACB,getSignInGoogleACB, renderACB, setEmailACB, setPasswordACB, checkACB, effectACB
- CocktailModel: favorites, mocktailDrinkPromiseState , users, authenticated, setAuthState(state), setUser(userData), getUserID(), addToFavorites(drinkToAdd), removeFromFavorites(drinkToRemove), getMocktail(), signOutNow()
- drinkSource: fetchMocktailDrinks()
- firebaseModel: signInWithGoogle(), register(credentials), signOutUser(), signInUser(credentials), parts of  connectToFirebase(model, watchFunction), parts of readFromFirebase(model), parts of saveToFirebase(model)

**Text:** everything provided in the application.

**CSS:**
font, images, colors. header: .logo, .header-container, .header-motto. logIn, parts of navBar and searchBar.

## Collaboration 
This project was written by Esra Salman, Linnea Rydberg, Jennifer Hasselström and Sophie Malmberg.


