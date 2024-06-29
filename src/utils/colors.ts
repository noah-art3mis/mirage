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

export function getPermutations(
    palette: string[],
    permSize: number
): string[][] {
    // if (permSize > palette.length || permSize === 1) {
    //     throw new Error('Invalid combination size');
    // }

    const permutations: string[][] = [];

    function generate(currentPerm: string[]) {
        // If the permutation reaches the specified size, save it
        if (currentPerm.length === permSize) {
            permutations.push([...currentPerm]);
            return;
        }

        // Continue adding elements to the permutation, including elements already in the permutation
        for (let i = 0; i < palette.length; i++) {
            currentPerm.push(palette[i]);
            generate(currentPerm);
            currentPerm.pop(); // Remove the last element to try the next option
        }
    }

    generate([]);
    return permutations;
}