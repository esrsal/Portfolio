/*  This file contains DinnerModel Lab code written by Linnea and Jennifer */
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "/src/teacherFirebase.js";
import {
    getAuth, signInWithPopup, GoogleAuthProvider,
    onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
const PATH = "shermix";
const db = getDatabase(app);
const auth = getAuth(app);

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Signing in succeeded");
            window.location.hash = "#/";
            window.location.reload();
        })
        .catch((error) => {
            console.log("Unable to sign in", error.message);
        })
}

export async function register(credentials) {
    await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(() => {
            console.log("Registration succeeded");
            window.location.hash = "#/signin";
        })
        .catch((error) => {
            console.log(error);
            alert("Registration failed", error.message);
        })
}

export async function signOutUser() {
    await signOut(auth)
        .then(() => {
            window.location.hash = "/"
            window.location.reload();
        })
        .catch((error) => {
            alert("Sign out failed", error.message);
        })
}

export async function signInUser(credentials) {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then(() => {
            window.location.hash = "#/";
            window.location.reload();
        })
        .catch((error) => {
            alert("Sign in failed", error.message);
        });
};


function modelToPersistence(model) {
    function getStringIDACB(drink) {
        return drink;
    }
    const searchArr = model.currentSearchParamArray.map(getStringIDACB);
    let searchResult = {};
    let randomDrinkResult = {};
    let mocktailResult = {};

    if (model.randomDrinkPromiseState) {
        randomDrinkResult = model.randomDrinkPromiseState.data;
    }

    if (model.mocktailDrinkPromiseState) {
        mocktailResult = model.mocktailDrinkPromiseState.data;
    }

    if (model.searchResultsPromiseState) {
        searchResult = model.searchResultsPromiseState.data;
    }
    return {
        thisDrink: model.currentDrink, searchParams: searchArr, searchResultData: (searchResult || ''),
        mocktailsData: (mocktailResult || ''), randomDrinksData: (randomDrinkResult || ''), favorites: model.favorites
    };
}

function persistenceToModel(data, model) {
    if (data) {
        if (data.thisDrink) {
            model.setCurrentDrink(data.thisDrink);
        }
        if (data.searchParams) {
            model.currentSearchParamArray = data.searchParams;
        }
        if (data.searchResultData) {
            model.searchResultsPromiseState.data = data.searchResultData;
        }
        if (data.mocktailsData) {
            model.mocktailDrinkPromiseState.data = data.mocktailsData;
        }
        if (data.randomDrinksData) {
            model.randomDrinkPromiseState.data = data.randomDrinksData;
        }
        if (data.favorites) {
            model.favorites = data.favorites;
        }
    }
}

function saveToFirebase(model) {
    if (model.ready) {
        if (model.authenticated) {
            set(ref(db, `${PATH}/users/${model.users.userID}`), modelToPersistence(model));
        }
        else {
            set(ref(db, `${PATH}/user1/`), modelToPersistence(model));
        }
    }
}

function readFromFirebase(model) {
    model.ready = false;
    if (model.authenticated) {
        return get(ref(db, `${PATH}/users/${model.users.userID}`))

            .then(function convertDrinkACB(snapshot) {
                return persistenceToModel(snapshot.val(), model);

            }).then(function makeModelReadyACB() {
                model.ready = true;
            });
    }
    else {
        return get(ref(db, `${PATH}/user1/`))

            .then(function convertDrinkACB(snapshot) {
                return persistenceToModel(snapshot.val(), model);

            }).then(function makeModelReadyACB() {
                model.ready = true;
            });
    }
}

function connectToFirebase(model, watchFunction) {
    onAuthStateChanged(auth, (user) => {
        if (model.authenticated) {
            model.setUser({ userID: user.uid, userEmail: user.email })
        }
        if (user) {
            // User signed in, read data from Firebase
            model.setAuthState(true);
            readFromFirebase(model);
        } else {
            // User signed out, clear the data
            model.setAuthState(false);
            model.currentDrink = [];
            model.currentSearchParamArray = [];
            model.searchParams = {};
            model.searchResultsPromiseState = {};
        }
    })

    readFromFirebase(model);
    watchFunction(checkModelAuthenticationACB, doACB);
    watchFunction(checkIfChangedACB, triggerSideEffectACB);

    function checkModelAuthenticationACB() {
        [model.authenticated];
    }

    function doACB() {
        window.location.reload();
    }

    function checkIfChangedACB() {
        return modelToPersistence(model);
    }

    function triggerSideEffectACB() {
        saveToFirebase(model);
    }
}

export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
export default connectToFirebase;