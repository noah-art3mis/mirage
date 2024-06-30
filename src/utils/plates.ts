import { fakeBook } from './mocks.ts';
import { updateResult } from './result.ts';
import { shuffle } from './utils.ts';
import { isShufflePlates } from './dashboard.ts';

export function resetPlates() {
    var element = document.querySelector('.palette-plate-container');
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

export function generatePlates(plateConfig) {
    const colors = plateConfig.colors;

    const plates = [];
    for (let i = 0; i < colors.length; i++) {
        const plate = generatePlate(plateConfig);
        plate.addEventListener('click', () => {
            plate.remove();
            updateResult();
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

function generatePlate(config): HTMLDivElement {
    const colors = config.colors;

    //get content from mock randomly
    const pageIndex = Math.floor(Math.random() * fakeBook.pages.length);
    const sentenceIndex = Math.floor(
        Math.random() * fakeBook.pages[0].content.length
    );
    const content = fakeBook.pages[pageIndex].content[sentenceIndex];

    //create plate
    const plate = createPlate(fakeBook.author, fakeBook.title, content);
    plate.classList.add('palette-plate');

    //set colors
    plate.style.color = colors[0];

    if (colors.length === 2) {
        plate.style.backgroundColor = colors[1];
    } else {
        const otherColors = colors.slice(1);
        const transparent: string[] = [];
        otherColors.forEach((color) => {
            color = color + config.noiseAmountHex;
            transparent.push(color);
        });

        const gradient = `linear-gradient(${config.rotation}deg ${config.colorFormat}, ${transparent.join(', ')})`;

        const texture = `url('static/${config.noiseTexture}.png')`;
        plate.style.backgroundImage = `${gradient}, ${texture}`;
    }
    return plate;
}

function createPlate(_author: string, _title: string, _content: string) {
    const plate = document.createElement('div');
    plate.classList.add('plate');

    const plateBlock = document.createElement('div');
    plateBlock.classList.add('plate-block');
    plate.appendChild(plateBlock);

    const content = document.createElement('p');
    content.textContent = _content;
    content.classList.add('content');
    plateBlock.appendChild(content);

    const reference = document.createElement('div');
    reference.classList.add('reference');
    plateBlock.appendChild(reference);

    const author = document.createElement('p');
    author.textContent = _author;
    author.classList.add('author');
    reference.appendChild(author);

    const title = document.createElement('p');
    title.textContent = _title;
    title.classList.add('title');
    reference.appendChild(title);

    return plate;
}
