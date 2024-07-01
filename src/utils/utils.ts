export function shuffle<T>(array: T[]): T[] {
    // Fisher-Yates (Durstenfeld) shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

export function getPermutations(palette: string[], permSize: number): string[][] {
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
