import React from "react";

/**
 * 
 * @param {string} fillColor - hex color or var color
 * @param {string} fillBackground - hex color or var color
 * @returns 
 */

export default function dotCircle({ fillColor, fillBackground }) {
    const size = 40;
    const scale = size / 40;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width={size - 2} height={size - 2} rx={(size - 2) / 2} fill={fillBackground} />
            <rect x="1" y="1" width={size - 2} height={size - 2} rx={(size - 2) / 2} stroke={fillColor} stroke-width="2" />
            <circle cx={20 * scale} cy={20 * scale} r={4.5 * scale} fill={fillColor} />
        </svg>
    )
}