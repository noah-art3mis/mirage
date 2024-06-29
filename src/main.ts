import { updateResult, copyResult } from './utils/result.ts';
import { resetPlates } from './utils/plates.ts';
import { updateDocument } from './utils/dashboard.ts';
import { randomizeParameters } from './utils/dashboard.ts';

document.addEventListener('DOMContentLoaded', () => {
    updateDocument();
    updateResult();

    document.querySelector('form')?.addEventListener('change', (e) => {
        e.preventDefault();
        resetPlates();
        updateDocument();
        updateResult();
    });

    document.getElementById('default')?.addEventListener('click', () => {
        resetPlates();
        updateDocument();
        updateResult();
    });

    document.getElementById('random')?.addEventListener('click', (e) => {
        e.preventDefault();
        resetPlates();
        randomizeParameters();
        updateDocument();
        updateResult();
    });

    document.getElementById('copy-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        copyResult();
    });
});
