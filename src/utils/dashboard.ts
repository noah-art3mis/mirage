import { generatePlates } from './plates.ts';
import { filterColors } from './color.ts';
import { getPermutations } from './utils.ts';
import { Color } from './color.ts';
import { PlateConfig } from './types.ts';

export function updateDocument(): void {
    const paletteStrings: string[] = getPaletteStrings();
    const gradientSize: number = getGradientSize();
    const contrast: number = getContrastThreshold();

    const colorsString: string[][] = getPermutations(
        paletteStrings,
        gradientSize + 1
    );

    const colors = colorsString.map((palette) =>
        palette.map((color) => Color.fromHex(color))
    );

    const colorsFiltered: Color[][] = filterColors(colors, contrast);

    const plateConfig: PlateConfig = {
        gradientSize: gradientSize,
        contrast: contrast,
        colorFormat: getColorFormat(),
        rotation: getGradientRotation(),
        noiseTexture: getNoiseTexture(),
        noiseAmount: getNoiseAmount(),
    };

    generatePlates(colorsFiltered, plateConfig);
}

export function isShufflePlates(): boolean {
    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    return shufflePlates.checked;
}

function getPaletteStrings(): string[] {
    const palette = document.getElementById('palette') as HTMLInputElement;
    const parsedPalette = palette.value
        .split('\n')
        .map((color) => color.trim());
    return parsedPalette;
}

function getGradientSize(): number {
    const gradientSize = document.getElementById(
        'gradientSize'
    ) as HTMLInputElement;
    const asnumber = parseInt(gradientSize.value);
    return asnumber;
}

function getContrastThreshold(): number {
    const contrastThreshold = document.getElementById(
        'contrastThreshold'
    ) as HTMLInputElement;
    const asnumber = parseFloat(contrastThreshold.value);
    return asnumber;
}

export function getColorFormat(): string {
    const colorFormat = document.getElementById(
        'colorFormat'
    ) as HTMLInputElement;
    return colorFormat.value;
}

export function getGradientRotation(): number {
    const gradientRotation = document.getElementById(
        'gradientRotation'
    ) as HTMLInputElement;
    const asnumber = parseInt(gradientRotation.value);
    return asnumber;
}

function getNoiseTexture(): string {
    const noiseTexture = document.getElementById(
        'noiseTexture'
    ) as HTMLInputElement;
    return noiseTexture.value;
}

function getNoiseAmount(): number {
    const noiseAmount = document.getElementById(
        'noiseAmount'
    ) as HTMLInputElement;
    const asnumber = parseInt(noiseAmount.value);
    return asnumber;
}

export function randomizeParameters(): void {
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

    const noiseTexture = document.getElementById(
        'noiseTexture'
    ) as HTMLInputElement;
    const rng = Math.floor(Math.random() * 5);
    if (rng === 0) {
        noiseTexture.value = 'bayer';
    } else if (rng === 1) {
        noiseTexture.value = 'blue';
    } else if (rng === 2) {
        noiseTexture.value = 'blurred';
    } else if (rng === 3) {
        noiseTexture.value = 'fft';
    } else if (rng === 4) {
        noiseTexture.value = 'n2';
    } else if (rng === 5) {
        noiseTexture.value = 'white';
    }

    const noiseAmount = document.getElementById(
        'noiseAmount'
    ) as HTMLInputElement;
    noiseAmount.value = Math.floor(Math.random() * 25).toString();
}
