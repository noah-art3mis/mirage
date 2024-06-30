# Mirage

Helps you pick colors for simulacrum plates.

Access at https://mirage-five.vercel.app/

Part of AUTOMATON, the simulacrum automation package.

AUTOMATON:

-   [Apothecary](https://github.com/noah-art3mis/apothecary) (text extraction and cleanup)
-   [Mirage](https://github.com/noah-art3mis/mirage) (palette tool)
-   [Semblance](https://github.com/noah-art3mis/semblance) (image generation)

## How to

1.  Configure parameters:

    -   `Palette` : your palette. For example, you can upload a book cover [here](https://color.adobe.com/create/image-gradient).
    -   `Gradient Size` : 1 for single color background, 2 for two color gradient, etc
    -   `Contrast Threshold` : plates with low contrast are skipped
        -   for higher gradient sizes, a lower threshold is recommended
    -   `Shuffle` : shuffle order of plates

1.  Click the plates you don't want and they will be removed from the list.

    -   Plates are re-generated every time you change the parameters.
    -   ⚠️ If you have selected plates you like, you will lose them if you make changes to the parameters.

1.  Click `Copy`. Paste the CSS into your [Semblance](https://github.com/noah-art3mis/semblance) stylesheet.

## Examples

### KSI Palette

    '#C4B9B3', '#434343', '#657189'

    --c-1: rgb(196, 185, 179);
    --c-2: linear-gradient(0deg, rgb(67, 67, 67), rgb(67, 67, 67));

### FG Palette

    '#CDC0BA', '#734C48', '#F2D0A7', '#9B95BF', '#37262C', '#836153'

    --c1: rgb(55, 38, 44);
    --c2: linear-gradient(180deg, rgb(242, 208, 167), rgb(242, 208, 167), rgb(155, 149, 191));

## TODO

-   feat: select liked instead of removing disliked
    -   feat: discard button
-   feat: noise textures
-   when only 2 colors results say 'background-image' but should be background-color
-   chore: change branch name https://stackoverflow.com/questions/71951105/how-to-change-current-branch-in-git-from-master-to-main
-   fix: palette placeholder doesnt break lines properly
-   fix: messing with parameters makes plates disappear (rare)
-   fix: need to press default twice for reset
-   fix: the format back

-   feat: other kinds of gradients
-   feat: add none/noise/grain/dither/blur

    -   blur /_ overflow: hidden; filter: blur(8px); _/ https://stackoverflow.com/a/46002546
    -   base 64 dither https://codepen.io/DavidJAldred/pen/pVbQBJ
    -   base 64 https://stackoverflow.com/questions/4011113/can-you-add-noise-to-a-css-gradient
    -   gradient noise http://jollo.org/LNT/public/css-noise.html
