import React, { useState, useEffect } from 'react';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { observer } from 'mobx-react-lite';

import Karta from './karta.jsx';
import Search from './search.jsx';
import Header from './header.jsx';
import Inomhus from "./inomhus.jsx";

const HOUSE_STORAGE_KEY = 'house';

export default observer(function ReactRoot(props) {
    const [searchInput, setSearchInput] = useState('');
    const [startInput, setStartInput] = useState('');
    const [house, setHouse] = useState(localStorage.getItem(HOUSE_STORAGE_KEY) || '');

    useEffect(() => {
        localStorage.setItem(HOUSE_STORAGE_KEY, house);
    }, [house]);

    return (
        <div>
            <div>
                <Header model={props.model} />
                <Search model={props.model} onSearchChange={setSearchInput} onStartChange={setStartInput} />
                <RouterProvider router={makeRouter(props, searchInput, startInput, house, setHouse)} />
            </div>
        </div>
    );
});


function makeRouter(model, searchInput, startInput, house, setHouse) {

    //const [house, setHouse] = useState('');
    return createHashRouter([{
        path: "/",
        element: <Karta searchInput={searchInput} startInput={startInput} changeHouse={setHouse} />,
    },
        {
            path: "/q-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/u-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/ed-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/f-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/r-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/v-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/b-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/m-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/h-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/w-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/k1-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
        {
            path: "/k2-huset",
            element: <Inomhus model={model} searchInput={searchInput} house={house} />,
        },
    ]);
}