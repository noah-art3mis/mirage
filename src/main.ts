import { updateResult, copyResult } from './utils/result.ts';
import { resetPlates } from './utils/plates.ts';
import { updateDocument } from './utils/dashboard.ts';

document.addEventListener('DOMContentLoaded', () => {
    setInitialValues();
    updateDocument();
    updateResult();

    document.querySelector('form')?.addEventListener('change', (e) => {
        e.preventDefault();
        resetPlates();
        updateDocument();
        updateResult();
    });

    document.getElementById('copy-button')?.addEventListener('click', (e) => {
        e.preventDefault();
        copyResult();
    });
});

function setInitialValues() {
    const palette = document.getElementById('palette') as HTMLInputElement;
    palette.value = '#C4B9B3\n#434343\n#657189';

    const gradientSize = document.getElementById(
        'gradientSize'
    ) as HTMLInputElement;
    gradientSize.value = '2';

    const contrastThreshold = document.getElementById(
        'contrastThreshold'
    ) as HTMLInputElement;
    contrastThreshold.value = '2.5';

    const shufflePlates = document.getElementById(
        'shufflePlates'
    ) as HTMLInputElement;
    shufflePlates.checked = false;
}
