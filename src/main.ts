import { copyResult } from './utils/result.ts';
import { resetPlates } from './utils/plates.ts';
import { updateDocument } from './utils/dashboard.ts';
import { randomizeParameters } from './utils/dashboard.ts';

document.addEventListener('DOMContentLoaded', () => {
    updateDocument();

    document.querySelector('form')?.addEventListener('change', (e) => {
        e.preventDefault();
        resetPlates();
        updateDocument();
    });

    document.getElementById('default')?.addEventListener('click', () => {
        resetPlates();
        updateDocument();
    });

    document.getElementById('random')?.addEventListener('click', (e) => {
        e.preventDefault();
        resetPlates();
        randomizeParameters();
        updateDocument();
    });

    document.getElementById('copy-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        copyResult();
    });

    document.getElementById('btn-discard')?.addEventListener('click', (e) => {
        e.preventDefault();
        const result = document.getElementById('result-text') as HTMLElement;
        //add modal notification
        result.textContent = '';

        const selecteds = document.querySelectorAll(
            '.selected'
        ) as NodeListOf<HTMLDivElement>;
        selecteds.forEach((plate) => {
            plate.classList.remove('selected');
        });
    });
});
