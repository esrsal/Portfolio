import FrontPage from "./frontPagePresenter.jsx";
import RandomPresenter from "./randomPresenter.jsx";
import Mocktail from "./mocktailPresenter.jsx";
import SearchResult from "./searchResultPresenter.jsx";
import SearchBar from "./searchBarPresenter.jsx"
import Details from "./drinkDetailsPresenter.jsx";
import Header from "./headerPresenter.jsx";
import Footer from "./footerPresenter.jsx";
import SignIn from "./signInPresenter.jsx";
import Register from "./registerPresenter.jsx"
import About from "./aboutUsPresenter.jsx";
import Favorite from "./favoritesPresenter.jsx"

import "/src/css/mainPage.css";
import "/src/css/footer.css";

import { RouterView, createRouter, createWebHashHistory } from "vue-router";

export default function VueRoot(props) {
    return (
        <div className="main-page">
            <Header model={props.model} />
            <SearchBar model={props.model} />
            <RouterView />
            <div className="footer-container">
                <Footer model={props.model} />
            </div>
        </div>
    )
};

export function makeRouter(model) {
    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: "/",
                component: <FrontPage model={model} />,
            },
            {
                path: "/front-page",
                component: <FrontPage model={model} />,
            },
            {
                path: "/random",
                component: <RandomPresenter model={model} />,
            },
            {
                path: "/mocktail",
                component: <Mocktail model={model} />,
            },
            {
                path: "/popular",
                component: <SearchResult model={model} />,
            },
            {
                path: "/search",
                component: <SearchResult model={model} />,
            },
            {
                path: "/details",
                component: <Details model={model} />,
            },
            {
                path: "/signin",
                component: <SignIn model={model} />,
            },
            {
                path: "/register",
                component: <Register model={model} />,
            },
            {
                path: "/aboutus",
                component: <About model={model} />,
            },
            {
                path: "/favorites",
                component: <Favorite model={model} />,
            },
        ]
    });
}