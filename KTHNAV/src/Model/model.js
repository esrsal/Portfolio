import {
    numberedRoomRegex,
    weirdNumberedRoomRegex,
    namedRoomBuildings,
    roomFloors,
    namedRoomRegex, buildingRegex
} from "./roomQueries.js";

function buildRoomNodeName(building, floor, room) {
    return building + floor + '_' + room;
}

function buildBuildingNodeName(building, entrance = '01') {
    return 'P1_' + building + entrance;
}

export default {

    houseID: null,
    searchParams: {},

    /**
     * Returns the node corresponding to the given room or building.
     *
     * Returns an empty string if the room does not exist.
     *
     * @param roomOrBuilding the room or building
     * @returns {string} the node corresponding to the given room or building
     */
    roomNameToNode(roomOrBuilding) {
        let building;
        let floor;

        if (/^Ringen$/i.test(roomOrBuilding)) {
            return buildBuildingNodeName('R');
        } else if (/^alba\s?nova$/i.test(roomOrBuilding)) {
            return 'P1_Albanova';
        } else if (/^nymble$/i.test(roomOrBuilding)) {
            return 'P1_Nymble';
        }else if (/^biblioteket$/i.test(roomOrBuilding)) {
            return 'P1_Biblioteket';
        } else if (/^sing[\s-]?sing$/i.test(roomOrBuilding)) {
            return 'P1_F02'
        } else if (buildingRegex.test(roomOrBuilding)) {
            if (/k_1/i.test(roomOrBuilding)) {
                return buildBuildingNodeName('K', '01');
            } else if (/k_2/i.test(roomOrBuilding)) {
                return buildBuildingNodeName('K', '02');
            } else {
                return buildBuildingNodeName(roomOrBuilding.toUpperCase());
            }
        } else if (numberedRoomRegex.test(roomOrBuilding)) {
            roomOrBuilding = roomOrBuilding.toUpperCase();
            building = roomOrBuilding.substring(0, 1);
            floor = roomFloors.get(roomOrBuilding);
        } else {
            if (weirdNumberedRoomRegex.test(roomOrBuilding)) {
                roomOrBuilding = roomOrBuilding.toUpperCase();
            } else if (namedRoomRegex.test(roomOrBuilding)) {
                roomOrBuilding = roomOrBuilding.replace(/\s/g, '');
                roomOrBuilding = roomOrBuilding.substring(0, 1).toUpperCase() + roomOrBuilding.substring(1).toLowerCase();
            } else {
                return "";
            }
            building = namedRoomBuildings.get(roomOrBuilding);
            floor = roomFloors.get(roomOrBuilding);
        }
        if (roomFloors.has(roomOrBuilding)) {
            return buildRoomNodeName(building, floor, roomOrBuilding);
        } else {
            return "";
        }
    },
}


