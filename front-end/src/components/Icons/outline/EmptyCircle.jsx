import React from "react";

/**
 * 
 * @param {string} fillColor - hex color or var color
 * @param {string} fillBackground - hex color or var color
 * @returns 
 */

export default function EmptyCircle({ fillColor, fillBackground }) {
    const size = 40;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width={size - 2} height={size - 2} rx={(size - 2) / 2} fill={fillColor} />
            <rect x="1" y="1" width={size - 2} height={size - 2} rx={(size - 2) / 2} stroke={fillBackground} stroke-width="2" />
        </svg>

    )
}