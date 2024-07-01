import { Color } from './color';
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
