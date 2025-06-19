import React, { useEffect, useState } from 'react';
import '/src/Css/karta.css';
import karta from '/src/assets/map_1.svg';
import { Modal } from '../Presenter/modal.jsx';


export default function KartaView(props) {


    useEffect(() => {
        const object = document.getElementById('svgObject');

        const handleLoad = function () {
            const svgDoc = object.contentDocument;
            const svgRoot = svgDoc.documentElement;

            handleScrollLeft();

            const startNode = props.outsideSearchStartNode();
            const targetNode = props.outsideSearchTargetNode();

            if (targetNode === "") {
                return null;
            }

            const path = props.shortestPath(startNode, targetNode);


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
            polyline.setAttribute("stroke-width", "5");
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

    }, [props.searchInput, props.currentFloor, props.house, props.startInput]); //continue loop


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



    function handleScrollLeft() {

        setTimeout(() => {
        const imageObject = document.getElementById('svgObject');
        const focusNode = "P1_01";


        const scrollContainer = document.getElementById('scroll-container1');
        if (!(imageObject && imageObject.contentDocument && imageObject.contentDocument.rootElement)) {
            return;
        }

        //Get cordinate for entrence
        const { x, y } = getEntranceCoordinates(focusNode, imageObject);
        const svgCodeWidth = imageObject.contentDocument.rootElement.getAttribute('width');
        const svgWidthOnScreen = imageObject.getBoundingClientRect().width

        const imageRatio = (x / svgCodeWidth);
        const scrollAmount = (imageRatio * svgWidthOnScreen) - (window.innerWidth / 2) + 50;

        scrollContainer.scrollLeft = scrollAmount;
        scrollContainer.scrollTop = y;
    }, 10);

    }

    return (
        <div className="container">
            <div id="scroll-container1" className="karta-container">
                <object
                    className="utomhus-karta"
                    id='svgObject'
                    ref={props.svgObject}
                    type="image/svg+xml"
                    data={karta}
                    aria-label="Karta"
                >
                    Your browser does not support SVG
                </object>
            </div>

            <div className="around-logo-main">
                <a href="https://entita2024.wixsite.com/kthnavigation" target="_blank" rel="noopener noreferrer">
                    <button className="logo-main"></button>
                </a>
            </div>

            <button className="modal-question" onClick={props.toggleModal}>??</button>
            <Modal
                isOpen={props.isModalOpen}
                close={props.toggleModal}
                message="How to use the navigation app: 

               1. Search for your start position (A building). If left blank it will take the entrace to KTH near the train station. 

               2. Search for your desired room and watch the green navigation line appear.

               3. Click on the building that the line is going into, and navigate to the right floor using the buttons. 

               (Note: You can also just navigate the map without searching by clicking the buildings.)"
            />
        </div>

    );

};



