# Mirage

Helps you pick colors for simulacrum plates.

Available at https://mirage-five.vercel.app/

Part of AUTOMATON, the simulacrum automation package.

## How to

1.  Configure parameters:

    -   `Palette` : your palette. For example, you can upload a book cover [here](https://color.adobe.com/create/image-gradient).
    -   `Gradient Size` : 1 for single color background, 2 for two color gradient, etc
    -   `Contrast Threshold` : plates with low contrast are skipped
        -   for higher gradient sizes, a lower threshold is recommended
    -   `Shuffle` : shuffle order of plates

1.  Click the plates you like and they will be added to the result text box.

1.  Click `Copy`. Paste the resulting CSS into [Facsimile](https://github.com/noah-art3mis/semblance).

## Examples

### KSI Palette

    '#C4B9B3', '#434343', '#657189'

    --c-1: rgb(196, 185, 179);
    --c-2: linear-gradient(0deg, rgb(67, 67, 67), rgb(67, 67, 67));

    --plate-text-color: rgb(196, 185, 179)
    --plate-bg-image: linear-gradient(285deg in hsl longer hue, rgb(101, 113, 137), rgb(67, 67, 67)), url("static/white.png")

### FG Palette

    '#CDC0BA', '#734C48', '#F2D0A7', '#9B95BF', '#37262C', '#836153'

    --c1: rgb(55, 38, 44);
    --c2: linear-gradient(180deg, rgb(242, 208, 167), rgb(242, 208, 167), rgb(155, 149, 191));

## TODO

-   fix: result persists after randomization (regex to check if plate is in the text)
-   fix: move palette to basic
-   fix: hide advanced
-   fix: palette placeholder doesnt break lines properly
-   fix: messing with parameters makes plates disappear (rare)
-   fix: need to press default twice for reset

## TODO (unlikely)

-   feat: other kinds of gradients
-   feat: add other kinds of none/noise/grain/dither/blur

    -   blur /_ overflow: hidden; filter: blur(8px); _/ https://stackoverflow.com/a/46002546
    -   base 64 dither https://codepen.io/DavidJAldred/pen/pVbQBJ
    -   base 64 https://stackoverflow.com/questions/4011113/can-you-add-noise-to-a-css-gradient
    -   gradient noise http://jollo.org/LNT/public/css-noise.html

-   chore: change branch name https://stackoverflow.com/questions/71951105/how-to-change-current-branch-in-git-from-master-to-main
