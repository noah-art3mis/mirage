import { generatePlates } from './plates.ts';
import { getPermutations, filterColors } from './colors';

export function updateDocument() {
    const palette: string[] = getPalette();
    const gradientSize: number = getGradientSize();
    const contrast: number = getContrastThreshold();

    let colors = getPermutations(palette, gradientSize + 1);
    colors = filterColors(colors, contrast);
    generatePlates(colors);
}

function getPalette() {
    const palette = document.getElementById('palette') as HTMLInputElement;
    const parsedPalette = palette.value
        .split('\n')
        .map((color) => color.trim());
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

export function isShufflePlates() {
    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    return shufflePlates.checked;
}
