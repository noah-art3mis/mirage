import { rgbaToHex, gradientToHex } from './colors';
import { getColorFormat, getGradientRotation } from './dashboard';

export function copyResult() {
    const resultElement = document.getElementById('result-text') as HTMLElement;

    if (resultElement) {
        if (resultElement.textContent) {
            copyTextToClipboard(resultElement.textContent);
        }
        displayMessage();
    } else {
        alert('No result to copy!');
    }
}

function copyTextToClipboard(text: string) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log(text);
        })
        .catch((err) => {
            alert(`Failed to copy text: ${err}`);
        });
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

export function updateResult() {
    const currentPalettes: string[][] = getCurrentPalettes();
    const formattedPalettes: string = formatPalettes(currentPalettes);
    const resultElement = document.getElementById('result-text') as HTMLElement;
    resultElement.textContent = formattedPalettes;
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
    for (let i = 0; i < palettes.length; i++) {
        const textColorRgb = palettes[i][0];
        const textColorHex = rgbaToHex(textColorRgb);
        const bgColorRgb = palettes[i][1];
        const bgColorHex = gradientToHex(bgColorRgb);
        const item = `/* 0${i + 1} */
        TEXT:
        \t${textColorHex}
        BACKGROUND:
        \t${bgColorHex}
        ROTATION:
        \t${getGradientRotation()}
        COLOR SPACE:
        \t${getColorFormat()}\n\n`;
        text += item;
    }
    return text;
}
