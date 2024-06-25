import {
    CONTRAST_THRESHOLD,
    GRADIENT_SIZE,
    PALETTE,
    SHUFFLE_PLATES,
} from './config.ts';
import { getPermutations, filterColorsGradient } from './colors.ts';
import { generatePlateWithColor } from './plates.ts';
import { copyTextToClipboard } from './utils.ts';
import { shuffle } from './utils.ts';

document.addEventListener('DOMContentLoaded', () => {
    setInitialValues();
    updateDocument();
    updateResult();

    document
        .querySelector('form')
        ?.addEventListener('submit', function (event) {
            event.preventDefault();
            updateDocument();
            updateResult();
        });

    document.getElementById('copy-button')?.addEventListener('click', (e) => {
        e.preventDefault();

        const result = document.querySelector('result-content')?.textContent;

        if (result) {
            copyTextToClipboard(result);
            displayMessage();
        } else {
            alert('No result to copy!');
        }
    });
});

function updateDocument() {
    const palette: string[] = getPalette();
    const gradientSize: number = getGradientSize();
    const contrast: number = getContrastThreshold();

    let colors = getPermutations(palette, gradientSize + 1);
    colors = filterColorsGradient(colors, contrast);
    generatePlatesWithColors(colors);
}

function updateResult() {
    const currentPalettes: string[][] = getCurrentPalettes();
    const formattedPalettes: string = formatPalettes(currentPalettes);
    const resultElement = document.querySelector(
        'result-content'
    ) as HTMLElement;
    resultElement.textContent = formattedPalettes;
}

function generatePlatesWithColors(colors: string[][]) {
    const plates = [];
    for (let i = 0; i < colors.length; i++) {
        const plate = generatePlateWithColor(colors[i]);
        plate.addEventListener('click', () => {
            plate.remove();
        });
        plates.push(plate);
    }
    if (isShufflePlates()) {
        shuffle(plates);
    }
    plates.forEach((plate) => {
        document.querySelector('.palette-plate-container')?.appendChild(plate);
    });
}

function getCurrentPalettes() {
    let palettes: string[][] = [];
    document.querySelectorAll('.plate').forEach((plate) => {
        const c: string = (plate as HTMLDivElement).style.color;
        let bg: string = (plate as HTMLDivElement).style.backgroundImage;

        if (!bg) {
            bg = (plate as HTMLDivElement).style.backgroundColor;
        }

        palettes.push([c, bg]);
    });
    return palettes;
}

function formatPalettes(palettes: string[][]) {
    let text: string = '';
    palettes.forEach((palette) => {
        const text_color: string = palette[0];
        const bg_color: string = palette[1];
        const item = `--c-1: ${text_color};\n--c-2: ${bg_color};\n\n`;
        text += item;
    });
    return text;
}

function displayMessage() {
    const message = document.getElementById('result-message');
    if (message) {
        message.style.display = 'block';
        setTimeout(() => {
            message.style.display = 'none';
        }, 1250);
    }
}

function setInitialValues() {
    const palette = document.getElementById('palette') as HTMLInputElement;
    palette.value = PALETTE;

    const gradientSize = document.getElementById(
        'gradientSize'
    ) as HTMLInputElement;
    gradientSize.value = GRADIENT_SIZE;

    const contrastThreshold = document.getElementById(
        'contrastThreshold'
    ) as HTMLInputElement;
    contrastThreshold.value = CONTRAST_THRESHOLD;

    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    shufflePlates.checked = SHUFFLE_PLATES;
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
function isShufflePlates() {
    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    return shufflePlates.checked;
}
