import houseGraphs from './graphs.js';
import { extractBuilding } from "./roomQueries";

let calculatedFastestPath = [];
let allLevelNodes = [];

/**
 * Combines the outside graph with the graph of the house containing the given room.
 *
 * May return an empty map.
 *
 * @param room the room whose building to combine with the outside map
 * @returns {Map<unknown, unknown>} the outside graph combined with the inside map containing the given room
 */
function combineInsideAndOutsideGraphs(room) {
    let map1 = new Map([]);
    if (room === undefined) {
        return map1;
    }
    if (room.includes(undefined)) {
        return map1;
    }
    if (room.includes('P1')) {
        map1 = houseGraphs['Karta'].graph;
    } else {
        try {
            const house1 = extractBuilding(room.split('_')[0]);
            map1 = combineInsideFloors(houseGraphs[house1].graph);
        } catch (e) {
            return map1;
        }
    }
    return map1;
}

/**
 * Combines all floor graphs of the given building map into a single graph
 * @param map the map of graphs for all the floors in a building
 * @returns {Map<any, any>} the combined graph of all floors in the given building
 */
function combineInsideFloors(map) {
    const combinedMap = new Map();

    function addToCombinedMap(inputMap) {
        inputMap.forEach((value, key) => {
            if (value instanceof Map) {
                addToCombinedMap(value);
            } else {
                combinedMap.set(key, value);
            }
        });
    }

    addToCombinedMap(map);
    return combinedMap;
}

/**
 * Returns the path from the given start node to the given
 * target node within the given graph as a list of Node IDs.
 *
 * Uses a breadth-first search algorithm to find the path.
 *
 * @param graph the graph to search in
 * @param startNode the start node of the search
 * @param targetNode the target node of the search
 * @returns {*[]} the path to a room as a list of Node IDs
 */
function bfsShortestPath(graph, startNode, targetNode) {
    if (startNode === targetNode) {
        return [startNode];
    }
    let queue = [startNode];
    let visited = new Set();
    let path = new Map();

    if (graph.get(targetNode) == null) {
        return [];
    }
    visited.add(startNode);
    path.set(startNode, [startNode]);
    while (queue.length > 0) {
        let current = queue.shift();
        graph.get(current).forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                const currentPath = path.get(current).slice();
                currentPath.push(neighbor);
                path.set(neighbor, currentPath);

                if (neighbor === targetNode) {
                    queue = [];
                }
            }
        });
    }

    return [...path.get(targetNode)];
}

/**
 * Splits the given list of nodes, representing the path between two nodes,
 * based on which floor they are on, and save them in a local variable.
 *
 * For example, ['Q3_E01', 'Q3_02', 'Q3_T01', 'Q2_T02', 'Q2_01', 'Q2_Q33'] will become:
 * [[3, ['Q3_E01', 'Q3_02', 'Q3_T01']], [2, ['Q2_T02','Q2_01', 'Q2_Q33']]]
 *
 * @param nodeList the path to split
 */
export function splitPathToFloors(nodeList) {
    allLevelNodes = [];
    let currLevelData = [];
    let lastNodeLevel = null;

    while (nodeList.length > 0) {

        let currentNode = nodeList.shift();

        if (isStaircase(currentNode)) {
            if ((levelOfNode(currentNode) === lastNodeLevel) || (lastNodeLevel == null)) {
                currLevelData.push(currentNode);
            } else {
                allLevelNodes.push([lastNodeLevel, currLevelData]);
                currLevelData = [];
                currLevelData.push(currentNode);
            }
            lastNodeLevel = levelOfNode(currentNode);
        } else {
            currLevelData.push(currentNode);
        }

    }
    if (lastNodeLevel != null) {
        allLevelNodes.push([lastNodeLevel, currLevelData]);
    } else {
        lastNodeLevel = levelOfNode(currLevelData[0])
        allLevelNodes.push([lastNodeLevel, currLevelData]);
    }
}

function isStaircase(node) {
    if (node.indexOf("_T") !== -1) {
        return true
    }
    return false
}

/**
 * Returns the level of the given node.
 * @param node the node for which to get the floor
 * @returns {number} the level of the given node
 */
function levelOfNode(node) {
    let stringNumberOfLevel = node.substring(1, node.indexOf("_")); // Extracts the number from the ID
    return parseInt(stringNumberOfLevel); // This can't be parsed because it can be an entrance
}

/**
 * Searches for and saves the fastest path between the given start node and end node.
 * @param startNode the start node of the path
 * @param targetNode the target node of the path
 */
export function setFastestPath(startNode, targetNode) {
    const map = combineInsideAndOutsideGraphs(targetNode);
    if (!map.get(targetNode) || !map.get(startNode)) {
        return;
    }
    if (map.get(targetNode)) {
        calculatedFastestPath = bfsShortestPath(map, startNode, targetNode);
    }
}

/**
 * Returns the nodes in the fastest path on the given floor.
 *
 * The fastest path is decided by setFastestPath.
 *
 * @param floor the floor to get the nodes for
 * @returns {*|null} the nodes in the fastest path on the given floor
 */
export function getNodesForFloor(floor) {
    if (calculatedFastestPath === null || calculatedFastestPath.length === 0) {
        return null;
    }
    splitPathToFloors(calculatedFastestPath)
    for (let i = 0; i < allLevelNodes.length; i++) {
        const innerArray = allLevelNodes[i];
        const number = innerArray[0];
        if (number === floor) {
            return innerArray[1];
        }
    }

    return null;
}