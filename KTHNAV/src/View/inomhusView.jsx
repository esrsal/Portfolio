import React, { useEffect, useState } from 'react';
import '/src/Css/inomhus.css';
import '/src/Css/buttons.css';
import { observer } from 'mobx-react-lite';
import { getFloorOfRoom, getEntranceFloor } from '/src/Model/roomQueries.js';
import { namedRoomRegex, numberedRoomRegex, weirdNumberedRoomRegex } from '../Model/roomQueries';
import { } from '../Model/changeFloor';

export default function InomhusView(props) {

    const [filledRoomId, setFilledRoomId] = useState(null);
    const [originalColor, setOriginalColor] = useState(null);


    useEffect(() => {
        const object = document.getElementById('svgObject');
        const handleLoad = function () {
            const svgDoc = object.contentDocument;
            const svgRoot = svgDoc.documentElement;

            const startNode = props.insideSearchStartNode();
            const targetNode = props.insideSearchTargetNode();

            const targetRoom = props.getRoomNameFromNodeFromSearch();
            const targetElement = svgDoc.getElementById(targetRoom);

            if (targetNode === "") {
                return null;
            }

            const path = props.shortestPath(startNode, targetNode);

            if (props.searchInput) { // Ensure it runs only if there's a search input
                handleScrollLeft(startNode, targetNode, path);
            }

            if (targetElement) {
                setOriginalColor(targetElement.getAttribute('fill'));
                targetElement.setAttribute('fill', '#21ad57');
                setFilledRoomId(targetRoom);
            }
            const oldRoom = svgDoc.getElementById(filledRoomId);
            if (oldRoom && originalColor) oldRoom.setAttribute('fill', originalColor);


            if (props.getFloorOfRoomFromSearch() !== props.currentFloor) {

                setFilledRoomId(null);
                setOriginalColor(null);
                const oldPolyline = svgDoc.getElementById('pathPolyline');
                const oldCircle = svgDoc.getElementById('pathCircle');
                if (oldPolyline) svgRoot.removeChild(oldPolyline);
                if (oldCircle) svgRoot.removeChild(oldCircle);
            }

            // BULLSHIT IF SATS, FÖRSTÖR ALLT (FAST INTE, VÄDLIGT VIKTIG)
            if (path == null) {
                return null;
            }

            const points = path.map(id => svgDoc.getElementById(id)).filter(Boolean);
            const coordinates = points.map(point => ({
                x: point.getAttribute('x'),
                y: point.getAttribute('y'),
            }));

            //removes old path and room highlight
            const oldPolyline = svgDoc.getElementById('pathPolyline');
            const oldCircle = svgDoc.getElementById('pathCircle');
            if (oldPolyline) svgRoot.removeChild(oldPolyline);
            if (oldCircle) svgRoot.removeChild(oldCircle);


            // Create the polyline element
            const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polyline.setAttribute("points", coordinates.map(coord => `${coord.x},${coord.y}`).join(' '));
            polyline.setAttribute("stroke", "#21ad57");
            polyline.setAttribute("stroke-width", "9");
            polyline.setAttribute("fill", "none");
            polyline.setAttribute("stroke-linecap", "round");
            polyline.setAttribute("stroke-linejoin", "round");
            polyline.setAttribute("id", "pathPolyline"); // Add an ID to the polyline
            svgRoot.appendChild(polyline);

            if (coordinates.length > 0) {
                const lastCoord = coordinates[0];

                // Create a circle at the first coordinate
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", lastCoord.x);
                circle.setAttribute("cy", lastCoord.y);
                circle.setAttribute("r", "9");
                circle.setAttribute("fill", "#21ad57");
                circle.setAttribute("id", "pathCircle"); // Add an ID to the circle
                svgRoot.appendChild(circle);
            }


        };

        object.addEventListener('load', handleLoad);

        if (object.contentDocument) {
            handleLoad();
        }

        return () => {
            object.removeEventListener('load', handleLoad);
        };

    }, [props.searchInput, props.currentFloor, props.house]); //continue loop


    let buttonStyleUp;
    let buttonStyleDown;
    let buttonStyleMiddle;
    if (props.searchInput !== '' && (props.house.includes(props.searchInput.charAt(0)) || (props.searchInput.charAt(0) === 'E' && props.house === 'D'))) {
        buttonStyleUp = {
            backgroundColor: props.currentFloor < props.getFloorOfRoomFromSearch() ? '#21ad57' : 'black',
        };
        buttonStyleDown = {
            backgroundColor: props.currentFloor > props.getFloorOfRoomFromSearch() ? '#21ad57' : 'black',
        };
        buttonStyleMiddle = {
            backgroundColor: props.currentFloor === props.getFloorOfRoomFromSearch() ? '#21ad57' : 'black',
        };
    }


    function handleClickUpACB() {
        props.handleClickUp();
        // Get a reference to the element
        const myObject = document.getElementById('Bild-Container1');

        // Attach the scroll function to the window.onload event
        window.onload = function () {
            scrollHorizontal(myObject);
        };
    }

    function handleClickDownACB() {
        props.handleClickDown();

    }

    function getFloorSVGACB() {
        return props.getFloorSVG(props.building);
    }

    function handleBack() {
        window.location.hash = "#/"
    }


    function getEntranceCoordinates(startNode, imageObject) {
        const entranceNode = imageObject.contentDocument.getElementById(startNode);
        if (entranceNode) {
            const x = parseFloat(entranceNode.getAttribute('x'));
            const y = parseFloat(entranceNode.getAttribute('y'));

            return { x, y };
        } else {
            return { x: null, y: null };
        }
    }

    function handleScrollLeft(startNode, targetNode, path) {
        
        setTimeout(() => {
        const imageObject = document.getElementById('svgObject');
        if (!path) {
            return;
        }
        const focusNode = path[0];
        const scrollContainer = document.getElementById('Bild-Container1');
        if (!(imageObject && imageObject.contentDocument && imageObject.contentDocument.rootElement)) {
            return;
        }
    
        // Get coordinates for the entrance
        const { x, y } = getEntranceCoordinates(focusNode, imageObject);
        const svgCodeWidth = parseFloat(imageObject.contentDocument.rootElement.getAttribute('width'));
        const svgWidthOnScreen = imageObject.getBoundingClientRect().width;
        const imageRatio = x / svgCodeWidth;
        const scrollAmount = (imageRatio * svgWidthOnScreen) - (window.innerWidth / 2) + 50;
    
        // Ensure scrollAmount does not go negative
        const adjustedScrollAmount = Math.max(scrollAmount, 0);

    
        scrollContainer.scrollLeft = adjustedScrollAmount;
        scrollContainer.scrollTop = y;
    }, 10);
    }
    
    

    return (
        <div className="inomhus-body">
            <div id="Bild-Container1" className="inomhus-container">

                <div className="all-buttons">
                    <div className="Button-up around-single-button">
                        <button className="single-button" style={buttonStyleUp} onClick={handleClickUpACB}>↑</button>
                    </div>
                    <div className="Button-middle around-single-button">
                        <button className="single-button" style={buttonStyleMiddle}>{props.currentFloor}</button>
                    </div>
                    <div className="Button-down around-single-button">
                        <button className="single-button" style={buttonStyleDown} onClick={handleClickDownACB}>↓
                        </button>
                    </div>
                </div>

                <div className="around-karta-inomhus">
                    <object id="svgObject" data={getFloorSVGACB()} type="image/svg+xml" className="karta-inomhus">
                        Your browser does not support SVG
                    </object>
                </div>
            </div>
            <div className="around-back-button">
                <button className="back-button" onClick={(e) => handleBack()}></button>
            </div>
        </div>

    );
}


