import "/src/Css/inomhus.css";

export default function SearchView(props) {
    function onInputChangeACB(event) {

        const value = event.target.value;
        props.setInput(value);
    }

    function clickedSearchResult(input){
        if(props.checkIfInputIsValid(input)){
            props.setInput(input)
            props.handleSearch(input)
        }else{
            alert("This is not a valid room")
        }
    }

    function onInputChangeAC(event) {
        const value = event.target.value;
        props.setStartInput(value);
    }

    return (
        <div className="search-container">
            <div className="around-search" >
                <input
                    className="search-bar"
                    value={props.startInput}
                    placeholder="Start position"
                    type="search"
                    onChange={onInputChangeAC}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            props.handleSearch(props.input)
                            props.handleSearchStart(props.startInput)
                            props.clearFilteredStart(); // Clear the dropdown
                        }
                    }}
                    onBlur={() => {
                        // Use a timeout to delay the execution of props.clearFilteredRooms()
                        setTimeout(() => {
                            props.clearFilteredStart(); // Clear the dropdown when the input loses focus
                        }, 200); // Adjust the delay as needed
                    }}
                ></input>
                <div className="dropdown">
                    {props.filteredStart.map((name) => (
                        <div
                            className="dropdown-row"
                            key={name}
                            onClick={() => {
                                props.setStartInput(name);
                                props.clearFilteredStart();
                            }}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    props.setStartInput(name);
                                    props.clearFilteredStart();
                                }
                            }}
                        >
                            {name}

                        </div>
                    ))}
                </div>
                <input
                    className="search-bar"
                    value={props.input}
                    placeholder="Target room"
                    type="search"
                    onChange={onInputChangeACB}
                    onKeyUp={event => {
                        if (event.key === 'Enter') {
                            props.handleSearch(props.input)
                            props.handleSearchStart(props.startInput)
                            props.clearFilteredRooms(); // Clear the dropdown
                        }
                    }}
                    onBlur={() => {
                        // Use a timeout to delay the execution of props.clearFilteredRooms()
                        setTimeout(() => {
                            props.clearFilteredRooms(); // Clear the dropdown when the input loses focus
                        }, 200); // Adjust the delay as needed
                    }}
                ></input>
                <div className="dropdown dropdown-right">
                    {props.filteredRooms.map((name) => (
                        <div
                            className="dropdown-row"
                            key={name}
                            onClick={() => {
                                clickedSearchResult(name)
                                props.clearFilteredRooms();
                            }}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    props.setInput(name);
                                    props.clearFilteredRooms();
                                }
                            }}
                        >
                            {name}

                        </div>
                    ))}
                </div>
                <div>
                    <button className="search-button"
                        onClick={(e) => {
                            props.handleSearchStart(props.startInput);
                            props.handleSearch(props.input);
                            props.clearFilteredRooms();
                            props.handleClearStart();
                            props.handleClear();
                        }}></button>
                </div>

            </div>
        </div>

    )
};

