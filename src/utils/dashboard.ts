import { generatePlates } from './plates.ts';
import { filterColors } from './colors';
import { getPermutations } from './utils.ts';

export function updateDocument() {
    const palette: string[] = getPalette();
    const gradientSize: number = getGradientSize();
    const contrast: number = getContrastThreshold();
    const colorFormat: string = getColorFormat();
    const rotation: number = getGradientRotation();
    const noiseTexture: string = getNoiseTexture();
    const noiseAmountHex: string = getNoiseAmountHex();

    
    let colors = getPermutations(palette, gradientSize + 1);
    colors = filterColors(colors, contrast);

    const plateConfig = {
        colors: colors,
        gradientSize: gradientSize,
        contrast: contrast,
        colorFormat: colorFormat,
        rotation: rotation,
        noiseTexture: noiseTexture,
        noiseAmountHex: noiseAmountHex,
    };
    
    generatePlates(plateConfig);
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

export function getColorFormat() {
    const colorFormat = document.getElementById(
        'colorFormat'
    ) as HTMLInputElement;
    return colorFormat.value;
}

export function getGradientRotation() {
    const gradientRotation = document.getElementById(
        'gradientRotation'
    ) as HTMLInputElement;
    const asnumber = parseInt(gradientRotation.value);
    return asnumber;
}

export function randomizeParameters() {
    const gradientSize = document.getElementById(
        'gradientSize'
    ) as HTMLInputElement;
    const randomSize = Math.floor(Math.random() * 2) + 2;
    gradientSize.value = randomSize.toString();

    const contrastThreshold = document.getElementById(
        'contrastThreshold'
    ) as HTMLInputElement;
    const randomContrast = Math.random() * 4 + 1;
    contrastThreshold.value = randomContrast.toString();

    const colorFormat = document.getElementById(
        'colorFormat'
    ) as HTMLInputElement;
    const randomColorFormat = Math.floor(Math.random() * 3);
    if (randomColorFormat === 0) {
        colorFormat.value = '';
    } else if (randomColorFormat === 1) {
        colorFormat.value = 'in lch';
    } else if (randomColorFormat === 2) {
        colorFormat.value = 'in hsl shorter hue';
    } else if (randomColorFormat === 3) {
        colorFormat.value = 'in hsl longer hue';
    }

    const rotation = document.getElementById(
        'gradientRotation'
    ) as HTMLInputElement;
    const randomRotation = Math.floor(Math.random() * 360);
    rotation.value = randomRotation.toString();
}

function getNoiseTexture() {
    const noiseTexture = document.getElementById(
        'noiseTexture'
    ) as HTMLInputElement;
    return noiseTexture.value;
}

function getNoiseAmountHex() {
    const noiseAmount = document.getElementById(
        'noiseAmount'
    ) as HTMLInputElement;
    const asnumber = parseInt(noiseAmount.value);
    return asnumber.toString(16).padStart(2, '0');
}
