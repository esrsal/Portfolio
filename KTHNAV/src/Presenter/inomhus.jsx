import InomhusView from '/src/View/inomhusView.jsx';
import { observer } from "mobx-react-lite";
import { getEntranceFloor, getMaxFloor, getFloorOfRoom, insideStartNode, insideTargetNode,getRoomFromSearch, getRoomNameFromNode } from '/src/Model/roomQueries.js';
import { getNodesForFloor, setFastestPath } from '/src/Model/pathFinderAlgV2.js'
import React, { useState } from 'react';
import { changeFloorDown, changeFloorUpp, findFloor } from '/src/Model/changeFloor.js';

let maxFloor = 0;
export default observer(
    function Inomhus(props) {

        const building = props.house;
        const [currentFloor, setCurrentFloor] = useState(getEntranceFloor(building));

        maxFloor = getMaxFloor(building);

        function handleClickUp() {
            const newFloor = changeFloorUpp(currentFloor, building);
            setCurrentFloor(newFloor);
        }

        function handleClickDown() {
            const newFloor = changeFloorDown(currentFloor, building);
            setCurrentFloor(newFloor);
        }

        function getFloorSVG() {
            return findFloor(building + currentFloor.toString());
        }

        function getCurrentFloor() {
            return currentFloor;
        }

        function shortestPath(startNode, targetNode) {
            setFastestPath(startNode, targetNode)
            return getNodesForFloor(currentFloor)
        }

        function insideSearchStartNode() {
            return insideStartNode(props.searchInput, building)
        }
        function insideSearchTargetNode() {
            return insideTargetNode(props.searchInput, building)
        }

        function getRoom() {
            return getRoomFromSearch(props.searchInput);
        }

        function getFloorOfRoomFromSearch(){
            return getFloorOfRoom(getRoom());
        }

        function getRoomNameFromNodeFromSearch(){
            return getRoomNameFromNode(props.searchInput)
        }

        return < InomhusView getCurrentFloor={getCurrentFloor}
            handleClickUp={handleClickUp}
            handleClickDown={handleClickDown}
            getFloorSVG={getFloorSVG}
            currentFloor={currentFloor}
            shortestPath={shortestPath}
            searchInput={props.searchInput}
            house={props.house}
            insideSearchStartNode={insideSearchStartNode}
            insideSearchTargetNode={insideSearchTargetNode}
            getRoom={getRoom}
            getFloorOfRoomFromSearch={getFloorOfRoomFromSearch}
            getRoomNameFromNodeFromSearch={getRoomNameFromNodeFromSearch}
        />
    });