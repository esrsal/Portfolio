import React, {useRef, useEffect, useState} from 'react';
import '/src/Css/karta.css';
import KartaView from '../View/kartaView';
import {getNodesForFloor, setFastestPath} from '/src/Model/pathFinderAlgV2.js'
import {extractBuilding, outsideStartNode, outsideTargetNode} from '../Model/roomQueries';
import {Modal} from '../Presenter/modal.jsx';


const Karta = (props) => {
    const svgObject = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    function shortestPath(startNode, targetNode) {
        setFastestPath(startNode, targetNode)
        return getNodesForFloor(1)
    }

    function outsideSearchStartNode() {
        return outsideStartNode(props.startInput)
    }

    function outsideSearchTargetNode() {
        return outsideTargetNode(props.searchInput)
    }

    function getHouse(node) {
        return extractBuilding(node)
    }

    useEffect(() => {
        const object = svgObject.current;


        const handleLoad = () => {
            const svgDocument = object.contentDocument;
            const svgRoot = svgDocument.querySelector('svg');

            const paths = svgRoot.querySelectorAll('path[id^="path"]'); // Select all path elements with IDs starting with "path"
            paths.forEach(path => {
                path.addEventListener('click', (event) => {
                    const clickedId = event.currentTarget.id;
                    switch (clickedId) {
                        case 'path866':
                            props.changeHouse('Q');
                            window.location.hash = "#/q-huset";
                            return null;
                        case 'path818':
                            props.changeHouse('U');
                            window.location.hash = "#/u-huset";
                            return null;
                        case 'path150':
                            props.changeHouse('W');
                            window.location.hash = "#/w-huset";
                            return null;
                        case 'path882':
                            props.changeHouse('D');
                            window.location.hash = "#/ed-huset";
                            return null;
                        case 'path834':
                            props.changeHouse('F');
                            window.location.hash = "#/f-huset";
                            return null;
                        case 'path830':
                            props.changeHouse('K_2');
                            window.location.hash = "#/k2-huset";
                            return null;
                        case 'path814':
                            window.location.hash = "#/v-huset";
                            props.changeHouse('V');
                            return null;
                        case 'path802':
                            window.location.hash = "#/b-huset";
                            props.changeHouse('B');
                            return null;
                        case 'path831':
                            props.changeHouse('K_1');
                            window.location.hash = "#/k1-huset";
                            return null;
                        case 'path902':
                            props.changeHouse('M');
                            window.location.hash = "#/m-huset";
                            return null;
                        case 'path862':
                            props.changeHouse('R');
                            window.location.hash = "#/r-huset";
                            return null;
                        case 'path826':
                            props.changeHouse('H');
                            window.location.hash = "#/h-huset";
                            return null;
                        default:
                            return null;
                    }
                });
            });

        };

        if (object) {
            object.addEventListener('load', handleLoad);
        }

        return () => {
            if (object) {
                object.removeEventListener('load', handleLoad);
            }
        };
    }, []);

    return <KartaView
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        svgObject={svgObject}
        shortestPath={shortestPath}
        searchInput={props.searchInput}
        getHouse={getHouse}
        startInput={props.startInput}
        outsideSearchStartNode={outsideSearchStartNode}
        outsideSearchTargetNode={outsideSearchTargetNode}
    />
};

export default Karta;