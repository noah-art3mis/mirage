import { fakeBook } from './mocks.ts';
import { shuffle } from './utils.ts';
import { isShufflePlates } from './dashboard.ts';
import { Color } from './color.ts';
import { PlateConfig } from './types.ts';

export function resetPlates() {
    var element = document.querySelector('.palette-plate-container');
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

export function generatePlates(palettes: Color[][], plateConfig: PlateConfig) {
    const plates = [];
    for (let i = 0; i < palettes.length; i++) {
        const plate = generatePlate(palettes[i], plateConfig);
        plate.addEventListener('click', (e) => updateSelected(e));
        plates.push(plate);
    }
    if (isShufflePlates()) {
        shuffle(plates);
    }
    plates.forEach((plate) => {
        document.querySelector('.palette-plate-container')?.appendChild(plate);
    });
}

function updateSelected(e: Event) {
    if (e.target instanceof HTMLDivElement) {
        if (e.target.classList.contains('plate')) {
            e.target.classList.toggle('selected');
        }
    }

    const textBox = document.getElementById('result-text') as HTMLElement;
    textBox.textContent = '';

    const selectedPlates = document.querySelectorAll(
        '.selected'
    ) as NodeListOf<HTMLDivElement>;

    for (let i = 0; i < selectedPlates.length; i++) {
        const color = selectedPlates[i].style.color;
        const bg = selectedPlates[i].style.backgroundImage;
        textBox.textContent += `\\* style ${i+1} *\\ \n--plate-text-color: ${color}\n--plate-bg-image: ${bg}\n\n`;
    }
    console.log(textBox.textContent);
}

function generatePlate(colors: Color[], config: PlateConfig): HTMLDivElement {
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
    plate.style.color = colors[0].toHex();

    if (colors.length === 2) {
        plate.style.backgroundColor = colors[1].toHex();
    } else {
        const otherColors = colors.slice(1);
        const transparent = otherColors.map((color) => {
            return new Color(
                color.r,
                color.g,
                color.b,
                config.noiseAmount
            ).toHex();
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
