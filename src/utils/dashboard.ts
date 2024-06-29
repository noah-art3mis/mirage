import { generatePlates } from './plates.ts';
import { filterColors } from './colors';
import { getPermutations } from './utils.ts';

export function updateDocument() {
    const palette: string[] = getPalette();
    const gradientSize: number = getGradientSize();
    const contrast: number = getContrastThreshold();
    const colorFormat: string = getColorFormat();

    let colors = getPermutations(palette, gradientSize + 1);
    colors = filterColors(colors, contrast);
    generatePlates(colors, colorFormat);
}

export function isShufflePlates() {
    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    return shufflePlates.checked;
}

function getPalette() {
    const palette = document.getElementById('palette') as HTMLInputElement;
    const parsedPalette = palette.value
        .split('\n')
        .map((color) => color.trim());

    // Check if all colors are valid
    for (let i = 0; i < parsedPalette.length; i++) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(parsedPalette[i])) {
            alert('Invalid color: ' + parsedPalette[i]);
        }
    }

    return parsedPalette;
}

function getGradientSize() {
    const gradientSize = document.getElementById(
        'gradientSize'
    ) as HTMLInputElement;
    const asnumber = parseInt(gradientSize.value);
    return asnumber;
}

function getContrastThreshold() {
    const contrastThreshold = document.getElementById(
        'contrastThreshold'
    ) as HTMLInputElement;
    const asnumber = parseFloat(contrastThreshold.value);
    return asnumber;
}

function getColorFormat() {
    const colorFormat = document.getElementById(
        'colorFormat'
    ) as HTMLInputElement;
    return colorFormat.value;
}
