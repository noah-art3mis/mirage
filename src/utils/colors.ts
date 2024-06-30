import { isLowContrast } from './contrast.ts';

export function filterColors(
    colors: string[][],
    threshold: number
): string[][] {
    return colors.filter((colorArray) => {
        const mainColor = colorArray[0];
        const otherColors = colorArray.slice(1); // Get all elements except the first
        return !isLowContrast(mainColor, otherColors, threshold);
    });
}

export function hexToRgb(hex: string): number[] {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
        throw new Error('Invalid hex color');
    }

    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ];
}
export function rgbaToHex(rgba: string): string {
    const result = rgba.match(/\d+/g);
    if (result && (result.length === 3 || result.length === 4)) {
        const r = parseInt(result[0]);
        const g = parseInt(result[1]);
        const b = parseInt(result[2]);
        const a = result.length === 4 ? parseFloat(result[3]) : 1;

        // Function to convert a number to a 2-digit hex string
        const toHex = (value: number): string => {
            const hex = value.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        // Convert alpha value to a 2-digit hex string
        const toHexAlpha = (value: number): string => {
            const alpha = Math.round(value * 255);
            return toHex(alpha);
        };

        return '#' + toHex(r) + toHex(g) + toHex(b) + toHexAlpha(a);
    } else {
        throw new Error('Invalid RGBA format: ' + rgba);
    }
}

export function gradientToHex(gradient: string): string {
    let hexes = [];
    const rgbs = gradient.match(/rgba\((\d+), (\d+), (\d+), (\d+\.\d+)\)/g);

    if (!rgbs) {
        throw new Error('Invalid gradient format: ' + gradient);
    }

    for (const rgb of rgbs) {
        const hex = rgbaToHex(rgb);
        hexes.push(hex);
    }

    return hexes.join(',');
}
