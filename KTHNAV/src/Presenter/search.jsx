import SearchView from "../View/searchView"
import {observer} from 'mobx-react-lite';
import React, {useState} from "react";
import {buildingEntranceFloors, outsideStartNode} from "/src/Model/roomQueries.js";

export default observer(
    function Search(props) {

        const [input, setInput] = useState(props.text || "");
        const [startInput, setStartInput] = useState(props.text || "");
        const [filteredRooms, setFilteredRooms] = useState([]);
        const [filteredStart, setFilteredStart] = useState([]);

        const allRoomsAndBuildings = [
            // Q-huset
            'Q',
            'Q1',
            'Q11',
            'Q13',
            'Q15',
            'Q17',
            'Q2',
            'Q21',
            'Q22',
            'XQ23',
            'Q24',
            'XQ25',
            'Q26',
            'Q31',
            'XQ32',
            'Q33',
            'Q34',
            'Q36',
            // U-huset
            'U',
            'U21',
            'U31',
            'U41',
            'U51',
            'U61',
            'U1',
            // Ringen
            'Ringen',
            'Fylke',
            'Merry',
            'Pippin',
            'Frodo',
            'Bilbo',
            'Sam',
            // D/E-huset
            'D',
            'D1',
            'D2',
            'D3',
            'D31',
            'D32',
            'D33',
            'D34',
            'D35',
            'D41',
            'D42',
            'E',
            'E1',
            'E2',
            'E3',
            'E31',
            'E32',
            'E33',
            'E34',
            'E35',
            'E36',
            'E51',
            'E52',
            'E53',
            'Röd',
            'Orange',
            'Gul',
            'Grön',
            'Brun',
            'Vit',
            'Grå',
            'Magenta',
            'Turkos',
            'Violett',
            'Karmosin',
            'Spelhallen',
            'Sporthallen',
            'Musiksalen',
            'Konsthallen',
            'Matsalen',
            // F-huset
            'F',
            'F1',
            'F2',
            // V-huset
            'V',
            'V01',
            'V11',
            'V12',
            'LWR77',
            'V1',
            'V21',
            'V22',
            'V23',
            'Baltzar',
            'Christopher',
            'Nils',
            'V2',
            'V3',
            'V32',
            'V33',
            'V34',
            'V35',
            'Aristoteles',
            // B-huset
            'B',
            'Studentlab',
            'Betonglabb',
            'Projekthallen',
            'Blå',
            'B1',
            'B2',
            'B3',
            'B21',
            'B22',
            'B23',
            'B24',
            'B25',
            'B26',
            // M huset
            'M',
            'M1',
            'M2',
            'M3',
            'M23',
            'M24',
            'M31',
            'M32',
            'M33',
            'M34',
            'M35',
            'Butter',
            'Trötter',
            'Kloker',
            'Toker',
            'Glader',
            'Prosit',
            // H huset
            'H',
            'Svetsverkstad',
            'Frances Hugle',
            'Ivar Herlitz',
            'Sten Velander',
            'H1',
            // W huset
            'W',
            'W25',
            'XW343',
            'XW344',
            'XW345',
            'W37',
            'W38',
            'XW41',
            'W42',
            'W43',
            'XW50',
            // K huset
            'K',
            'K1',
            'K53',
            'K51',
            'K2',
            // Non-clickable houses
            'Nymble',
            'Alba Nova',
            'Biblioteket',
            'Sing-Sing',
            'L'
        ];
        allRoomsAndBuildings.sort();

        const clearFilteredRooms = () => {
            setFilteredRooms([]);
        };

        const clearFilteredStart = () => {
            setFilteredStart([]);
        };

        const allBuildingSet = new Set([
            ...buildingEntranceFloors.keys()
        ])
        const allStart = Array.from(allBuildingSet);

        function checkIfInputIsValid(input) {
            return allRoomsAndBuildings.includes(input);
        }

        function handleInputChange(input) {
            setInput(input);
            const filtered = allRoomsAndBuildings.filter(name =>
                name.toLowerCase().startsWith(input.toLowerCase())
            );
            setFilteredRooms(filtered);
        }

        function handleStartChange(input) {
            setStartInput(input);
            const filtered = allStart.filter(name =>
                name.toLowerCase().startsWith(input.toLowerCase())
            );
            setFilteredStart(filtered);
        }

        const handleClear = () => {
            setInput("");
        };

        const handleClearStart = () => {
            setStartInput("");
        };


        function handleSearch(input) {
            if (input !== "") {
                const roomInput = props.model.roomNameToNode(input);
                props.onSearchChange(roomInput);
                if (roomInput === '') {
                    alert("This is not a valid room");
                }
            }
        }

        function handleSearchStart(startInput) {
            props.onStartChange(startInput);
            if (outsideStartNode(startInput) === 'P1_01' && startInput !== '') {
                alert("This is not a valid starting position");
            }
        }

        return <SearchView
            input={input}
            setInput={handleInputChange}
            startInput={startInput}
            setStartInput={handleStartChange}
            handleSearch={handleSearch}
            handleSearchStart={handleSearchStart}
            handleClear={handleClear}
            handleClearStart={handleClearStart}
            filteredRooms={filteredRooms}
            clearFilteredRooms={clearFilteredRooms}
            filteredStart={filteredStart}
            setFilteredStart={setFilteredStart}
            clearFilteredStart={clearFilteredStart}
            handleStartChange={handleStartChange}
            checkIfInputIsValid={checkIfInputIsValid}
        />
    }
)