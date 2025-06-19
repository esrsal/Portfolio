// regexes for identifying room names
export const numberedRoomRegex = /^([qhudrfvbemwk])(\d+)$/i;
export const weirdNumberedRoomRegex = /^([a-ö]{2,})(\d+)$/i;
export const namedRoomRegex = /^[a-ö\s]+$/i;

// regex for identifying building name
export const buildingRegex = /^[qhudfvrbemwkl](_[12])?$/i;

/**
 * Mapping all rooms to their floors.
 */
export const roomFloors = new Map([
    // Q-huset
    ['Q1', 3],
    ['Q11', 1],
    ['Q13', 1],
    ['Q15', 1],
    ['Q17', 1],
    ['Q2', 2],
    ['Q21', 2],
    ['Q22', 2],
    ['XQ23', 2],
    ['Q24', 2],
    ['XQ25', 2],
    ['Q26', 2],
    ['Q31', 3],
    ['XQ32', 3],
    ['Q33', 3],
    ['Q34', 3],
    ['Q36', 3],
    // U-huset
    ['U21', 2],
    ['U31', 3],
    ['U41', 4],
    ['U51', 5],
    ['U61', 6],
    ['U1', 6],
    // Ringen
    ['Fylke', 3],
    ['Merry', 3],
    ['Pippin', 3],
    ['Frodo', 3],
    ['Bilbo', 3],
    ['Sam', 3],
    // D/E-huset
    ['D2', 3],
    ['D3', 3],
    ['D31', 3],
    ['D32', 3],
    ['D33', 3],
    ['D34', 3],
    ['D35', 3],
    ['E1', 3],
    ['E2', 3],
    ['E31', 3],
    ['E32', 3],
    ['E33', 3],
    ['E34', 3],
    ['E35', 3],
    ['E36', 3],
    ['D41', 4],
    ['D42', 4],
    ['Röd', 4],
    ['Orange', 4],
    ['Gul', 4],
    ['Grön', 4],
    ['Brun', 4],
    ['D1', 5],
    ['Vit', 5],
    ['Grå', 5],
    ['Magenta', 5],
    ['Turkos', 5],
    ['Violett', 5],
    ['Karmosin', 5],
    ['Spelhallen', 5],
    ['Sporthallen', 5],
    ['Musiksalen', 5],
    ['Konsthallen', 5],
    ['Matsalen', 5],
    ['E3', 5],
    ['E51', 5],
    ['E52', 5],
    ['E53', 5],
    // F-huset
    ['F1', 2],
    ['F2', 2],
    // V-huset
    ['V01', 2],
    ['V11', 3],
    ['V12', 3],
    ['LWR77', 3],
    ['V1', 4],
    ['V21', 4],
    ['V22', 4],
    ['V23', 4],
    ['Baltzar', 4],
    ['Christopher', 4],
    ['Nils', 4],
    ['V2', 5],
    ['V3', 5],
    ['V32', 5],
    ['V33', 5],
    ['V34', 5],
    ['V35', 5],
    ['Aristoteles', 3],
    // B-huset
    ['Studentlab', 1],
    ['Betonglabb', 1],
    ['Projekthallen', 2],
    ['Blå', 2],
    ['B1', 2],
    ['B2', 2],
    ['B3', 2],
    ['B21', 3],
    ['B22', 3],
    ['B23', 3],
    ['B24', 3],
    ['B25', 3],
    ['B26', 3],
    // M huset
    ['M2', 2],
    ['M1', 2],
    ['M3', 2],
    ['M23', 2],
    ['M24', 2],
    ['M31', 3],
    ['M32', 3],
    ['M33', 3],
    ['M34', 3],
    ['M35', 3],
    ['Butter', 4],
    ['Trötter', 4],
    ['Kloker', 4],
    ['Toker', 4],
    ['Glader', 4],
    ['Prosit', 4],
    // H huset
    ['Svetsverkstad', 1],
    ['Franceshugle', 3],
    ['Ivarherlitz', 3],
    ['Stenvelander', 4],
    ['H1', 5],
    // W huset
    ['W25', 2],
    ['XW343', 3],
    ['XW344', 3],
    ['XW345', 3],
    ['W37', 3],
    ['W38', 3],
    ['XW41', 4],
    ['W42', 4],
    ['W43', 4],
    ['XW50', 5],
    // K huset
    ['K1', 3],
    ['K53', 5],
    ['K51', 5],
    ['K2', 5],
]);

/**
 * Mapping all rooms to their respective buildings.
 */
export const namedRoomBuildings = new Map([
    ['XQ23', 'Q'],
    ['XQ25', 'Q'],
    ['XQ32', 'Q'],
    ['Fylke', 'R'],
    ['Merry', 'R'],
    ['Pippin', 'R'],
    ['Frodo', 'R'],
    ['Bilbo', 'R'],
    ['Sam', 'R'],
    ['Vit', 'D'],
    ['Grå', 'D'],
    ['Magenta', 'D'],
    ['Turkos', 'D'],
    ['Violett', 'D'],
    ['Karmosin', 'D'],
    ['Spelhallen', 'D'],
    ['Sporthallen', 'D'],
    ['Musiksalen', 'D'],
    ['Konsthallen', 'D'],
    ['Matsalen', 'D'],
    ['Röd', 'D'],
    ['Orange', 'D'],
    ['Gul', 'D'],
    ['Grön', 'D'],
    ['Brun', 'D'],
    ['LWR77', 'V'],
    ['Aristoteles', 'V'],
    ['Baltzar', 'V'],
    ['Christopher', 'V'],
    ['Nils', 'V'],
    ['Studentlab', 'B'],
    ['Betonglabb', 'B'],
    ['Projekthallen', 'B'],
    ['Blå', 'B'],
    ['Butter', 'M'],
    ['Trötter', 'M'],
    ['Kloker', 'M'],
    ['Toker', 'M'],
    ['Glader', 'M'],
    ['Prosit', 'M'],
    ['Svetsverkstad', 'H'],
    ['Franceshugle', 'H'],
    ['Ivarherlitz', 'H'],
    ['Stenvelander', 'H'],
    ['XW343', 'W'],
    ['XW344', 'W'],
    ['XW345', 'W'],
    ['XW41', 'W'],
    ['XW50', 'W'],
]);

/**
 * Mapping buildings to their entrance floors and total amount of floors.
 * The first number in the array is the entrance floor,
 * the second is the top floor, and the third is the bottom floor.
 */
// the keys in this map are also used for search suggestions
export const buildingEntranceFloors = new Map([
    ['Q', [3, 6, 1]],
    ['U', [3, 6, 2]],
    ['D', [3, 6, 3]],
    ['F', [2, 6, 1]],
    ['R', [2, 3, 2]],
    ['V', [3, 5, 1]],
    ['B', [2, 3, 1]],
    ['M', [2, 4, 2]],
    ['H', [3, 5, 1]],
    ['W', [2, 5, 2]],
    ['K_1', [3, 4, 2]],
    ['K_2', [5, 6, 5]],
    ['L', [0, 0, 0]],
    ['Alba Nova', [0, 0, 0]],
    ['Nymble', [0, 0, 0]],
    ['Biblioteket', [0, 0, 0]],
    ['Sing-Sing', [0, 0, 0]],
]);

/**
 * Returns the entrance floor of the given building.
 *
 * Returns null if the building is not found.
 *
 * @param building the building
 * @returns {number|null} the entrance floor of the given building
 */
export function getEntranceFloor(building) {
    if (buildingRegex.test(building)) {
        const entranceAndFloors = buildingEntranceFloors.get(building.toUpperCase());
        return entranceAndFloors[0];
    } else {
        return null;
    }
}

/**
 * Returns the max floor number of the given building.
 *
 * Returns null if the building is not found.
 *
 * @param building the building
 * @returns {number|null} the max floor number of the given building
 */
export function getMaxFloor(building) {
    if (buildingRegex.test(building)) {
        const entranceAndFloors = buildingEntranceFloors.get(building.toUpperCase());
        return entranceAndFloors[1];
    } else {
        return null;
    }
}

/**
 * Returns the minimum floor number of the given building.
 *
 * Returns null if the building is not found.
 *
 * @param building the building
 * @returns {number|null} the minimum floor number of the given building
 */
export function getMinFloor(building) {
    if (buildingRegex.test(building)) {
        const entranceAndFloors = buildingEntranceFloors.get(building.toUpperCase());
        return entranceAndFloors[2];
    } else {
        return null;
    }
}

/**
 * Returns the floor of the given room.
 *
 * Returns null if the room is not found.
 *
 * @param room the room
 * @returns {number|null} the floor of the given room
 */
export function getFloorOfRoom(room) {
    if (room) {
        if (numberedRoomRegex.test(room)) {
            room = room.toUpperCase();

            return roomFloors.get(room);
        } else {
            if (weirdNumberedRoomRegex.test(room)) {
                room = room.toUpperCase();
            } else if (namedRoomRegex.test(room)) {
                room = room.substring(0, 1).toUpperCase() + room.substring(1).toLowerCase();
            } else {
                return null;
            }

            return roomFloors.get(room);
        }

    } else {
        return null;
    }

}

/**
 * Returns the building in which the given room is located.
 *
 * Returns null if the given room is not found.
 *
 * @param room the room
 * @returns {string|null} the building in which the given room is located
 */
export function extractBuilding(room) {
    if (typeof room !== 'string') {
        return null;
    } else if (numberedRoomRegex.test(room)) {
        return room.charAt(0);
    } else {
        if (weirdNumberedRoomRegex.test(room)) {
            room = room.toUpperCase();
        } else if (namedRoomRegex.test(room)) {
            room = room.substring(0, 1).toUpperCase() + room.substring(1).toLowerCase();
        } else {
            return null;
        }
        return namedRoomBuildings.get(room);
    }
}

/**
 * Returns the node in the outside map for the given building.
 *
 * If no building of the given name is found, the default target node 'P1_01' is returned.
 *
 * @param building the building
 * @returns {string} the outside map node for the given building
 */
export function outsideStartNode(building){
    let startNode = 'P1_01';

    if (/^[qudfrvbmhwkl]$/i.test(building)) {
        startNode = 'P1_' + building.toUpperCase() + '01';
    } else if (/^e$/i.test(building)) {
        startNode = 'P1_D01'
    } else if (/^ringen$/i.test(building)) {
        startNode = 'P1_R01';
    } else if (/^nymble$/i.test(building)) {
        startNode = 'P1_Nymble';
    } else if (/^alba\s?nova$/i.test(building)) {
        startNode = 'P1_Albanova';
    } else if (/^biblioteket$/i.test(building)) {
        startNode = 'P1_Biblioteket';
    } else if (/^sing[\s-]?sing$/i.test(building)) {
        startNode = 'P1_F02';
    }

    return startNode;
}

/**
 * Returns the outside target node for the given target node.
 * If the target node is outside, it will simply return this node,
 * and if it is an inside node, the return will be the outside node
 * for the correct building.
 *
 * Returns an empty string if the given node is incorrect.
 *
 * @param targetNode the target node
 * @returns {string} the outside target node for the given target node
 */
export function outsideTargetNode(targetNode){
    if (/^P1_/.test(targetNode)) {
        return targetNode;
    }

    const parts = targetNode.split('_');
    const building = extractBuilding(parts[1]);

    if (targetNode.includes('E')) {
        targetNode = 'P1_D01';
    } else if (targetNode.includes('F1')) {
        targetNode = 'P1_F01';
    } else if (targetNode.includes('F2')) {
        targetNode = 'P1_F02';
    } else if (targetNode.includes('K1')) {
        targetNode = 'P1_K01';
    } else if ((/k(5(1|3)|2)/i).test(targetNode)) {
        targetNode = 'P1_K02';
    } else if(/^[qudfrvbmhwk]$/i.test(parts[1])){  
        targetNode = 'P1_' + parts[1].toUpperCase() + '01';
    } else if (targetNode.includes(building)) {
        targetNode = 'P1_' + building + '01';
    } else {
        targetNode = "";
    }

    return targetNode;
}

export function insideStartNode(searchInput, building){
    let startNode = null;
    if (searchInput.includes('F2_F2')) {
        startNode = 'F2_E02';
    } else if (searchInput.includes('K5')) {
        startNode = 'K5_E01';
    } else if (searchInput.includes('K3_K1')) {
        startNode = 'K3_E02';
    } else {
        startNode = building + getEntranceFloor(building) + '_E01';
    }
    return startNode;
}

export function insideTargetNode(searchInput, building){
    let targetNode = null;
    if (searchInput.includes(building)) {
        targetNode = searchInput;

    } else if (searchInput.includes(building) || (searchInput.includes('E') && building.includes('D'))) {
        targetNode = dToE(searchInput);

    } else if(searchInput.includes(building.split('_')[0])){
        targetNode = searchInput;
    } else {
        targetNode = "";
    }

    return targetNode;
}

export function dToE(input){
    return 'D' + input.substring(1);
}

export function getRoomFromSearch(searchInput){
    const parts = searchInput.split("_");
    return parts[1];
}

/**
 * Returns the room name corresponding to the given node,
 * or 'HOINKALOINK' if the given node does not exist.
 *
 * Returns null if the node is undefined or null
 *
 * @param node the node
 * @returns {null|string}
 */
export function getRoomNameFromNode(node) {
    const parts = node.split("_");
    if (node) {
        if (numberedRoomRegex.test(parts[1])) {
            return parts[0] + "_R" + parts[1].substring(1);
        } else if (namedRoomRegex.test(parts[1])) {
            return parts[0] + "_R" + parts[1];
        } else if (/^lwr77$/i.test(parts[1])) {
            return "V3_RLWR77";
        } else if (weirdNumberedRoomRegex.test(parts[1])) {
            return parts[0] + "_R" + parts[1].substring(2);
        } else {
            // This string has no meaning
            return "HOINKALOINK";
        }
    } else {
        console.error('nodeName is undefined.');
        return null;
    }
}