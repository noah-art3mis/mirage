export type Book = {
    author: string;
    title: string;
    id: string;
    pages: Array<Page>;
};

export type Page = {
    number: string;
    content: Array<string>;
};

export type PlateConfig = {
    gradientSize: number;
    contrast: number;
    colorFormat: string;
    rotation: number;
    noiseTexture: string;
    noiseAmount: number;
};
