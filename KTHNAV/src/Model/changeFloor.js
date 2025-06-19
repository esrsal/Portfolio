import {getMaxFloor, getMinFloor} from './roomQueries.js'

import q1 from '/src/assets/Q/V1.svg';
import q2 from '/src/assets/Q/V2.svg';
import q3 from '/src/assets/Q/V3.svg';
import q4 from '/src/assets/Q/V4.svg';
import q5 from '/src/assets/Q/V5.svg';
import q6 from '/src/assets/Q/V6.svg';

import u2 from '/src/assets/U/V2.svg';
import u3 from '/src/assets/U/V3.svg';
import u4 from '/src/assets/U/V4.svg';
import u5 from '/src/assets/U/V5.svg';
import u6 from '/src/assets/U/V6.svg';

import d3 from '/src/assets/D/V3.svg';
import d4 from '/src/assets/D/V4.svg';
import d5 from '/src/assets/D/V5.svg';
import d6 from '/src/assets/D/V6.svg';

import f1 from '/src/assets/F/V1.svg';
import f2 from '/src/assets/F/V2.svg';
import f3 from '/src/assets/F/V3.svg';
import f4 from '/src/assets/F/V4.svg';
import f5 from '/src/assets/F/V5.svg';
import f6 from '/src/assets/F/V6.svg';

import v1 from '/src/assets/V/V1.svg';
import v2 from '/src/assets/V/V2.svg';
import v3 from '/src/assets/V/V3.svg';
import v4 from '/src/assets/V/V4.svg';
import v5 from '/src/assets/V/V5.svg';

import b1 from '/src/assets/B/V1.svg';
import b2 from '/src/assets/B/V2.svg';
import b3 from '/src/assets/B/V3.svg';

import r2 from '/src/assets/R/V2.svg';
import r3 from '/src/assets/R/V3.svg';

import m2 from '/src/assets/M/V2.svg';
import m3 from '/src/assets/M/V3.svg';
import m4 from '/src/assets/M/V4.svg';

import h1 from '/src/assets/H/V1.svg';
import h2 from '/src/assets/H/V2.svg';
import h3 from '/src/assets/H/V3.svg';
import h4 from '/src/assets/H/V4.svg';
import h5 from '/src/assets/H/V5.svg';

import W2 from '/src/assets/W/V2.svg';
import W3 from '/src/assets/W/V3.svg';
import W4 from '/src/assets/W/V4.svg';
import W5 from '/src/assets/W/V5.svg';

import k2 from '/src/assets/K/V2.svg';
import k3 from '/src/assets/K/V3.svg';
import k4 from '/src/assets/K/V4.svg';
import k5 from '/src/assets/K/V5.svg';
import k6 from '/src/assets/K/V6.svg';

// Define an object to map level identifiers to their SVG files
const svgMap = {
    Q1: q1,
    Q2: q2,
    Q3: q3,
    Q4: q4,
    Q5: q5,
    Q6: q6,

    U2: u2,
    U3: u3,
    U4: u4,
    U5: u5,
    U6: u6,

    D3: d3,
    D4: d4,
    D5: d5,
    D6: d6,

    F1: f1,
    F2: f2,
    F3: f3,
    F4: f4,
    F5: f5,
    F6: f6,

    R2: r2,
    R3: r3,

    V1: v1,
    V2: v2,
    V3: v3,
    V4: v4,
    V5: v5,

    B1: b1,
    B2: b2,
    B3: b3,

    M2: m2,
    M3: m3,
    M4: m4,

    H1: h1,
    H2: h2,
    H3: h3,
    H4: h4,
    H5: h5,

    W2: W2,
    W3: W3,
    W4: W4,
    W5: W5,

    K_12: k2,
    K_13: k3,
    K_14: k4,
    K_25: k5,
    K_26: k6

};

/**
 * Returns the SVG file for the given floor ID
 * @param floorId
 * @returns {*|null}
 */
export function findFloor(floorId) {
    if (floorId in svgMap) {
        return svgMap[floorId];
    } else {
        return null;
    }
}

export function changeFloorUpp(floor, building) {
    if (floor + 1 > getMaxFloor(building)) {
        return floor;
    }
    return floor + 1;
}

export function changeFloorDown(floor, building) {
    if (floor - 1 < getMinFloor(building)) {
        return floor;
    }
    return floor - 1;
}
