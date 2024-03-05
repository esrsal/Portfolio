import "/src/css/searchBar.css";

function SearchBarView(props) {
    function onInputChangeACB(text) {
        props.setSearchQuery(text.target.value);
    }

    function onKeyPressACB(evt) {
        const key = evt.keyCode;
        if (key === 13) {
            props.searchButtonClicked();
            window.location.hash = "#/search"
        }
    }

    function buttonOnClickACB() {
        props.searchButtonClicked();
        window.location.hash = "#/search"
    }

    function getSuggestions(ingredient) {
        function ingredientOnClickACB() {
            props.addToSearch(ingredient);
        }

        return (
            <div onClick={ingredientOnClickACB}><li>{ingredient.strIngredient1}</li></div>
        );
    }

    function getSuggestionList() {
        if (props.searchSuggestions.length > 0) {
            return props.searchSuggestions.map(getSuggestions);
        }
    }

    function getIngredient(ingredient) {
        function ingredientOnClickACB() {
            props.removeFromSearch(ingredient);
        }

        return (
            <div onClick={ingredientOnClickACB}><li>x {ingredient.strIngredient1}</li></div>
        );
    }

    function getIngredientsList() {
        if (props.currentSearchIngredients.length > 0) {
            return props.currentSearchIngredients.map(getIngredient);
        }
    }

    return (
        <div class="searchContainer">
            <div class="searchBar">
                <input value={props.text || ""} placeholder="Search ingredients..." onInput={onInputChangeACB} onkeyup={onKeyPressACB}></input>
                <button onClick={buttonOnClickACB}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256" style="fill:#EBEBEB;">
                        <g fill-opacity="0.14118" fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                            <g transform="scale(5.12,5.12)">
                                <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="suggestions">
                {getSuggestionList()}
            </div>

            <div >
                <ul class="ingredientsList">
                    {getIngredientsList()}
                </ul>
            </div>
        </div>
    );
}

export default SearchBarView;