# Mirage

Helps you pick colors for simulacrum plates.

Part of Semblance, which is part of AUTOMATON, the simulacrum automation package.

AUTOMATON:

-   [Apothecary](https://github.com/noah-art3mis/apothecary) (text extraction and cleanup)
-   [Mirage](https://github.com/noah-art3mis/mirage) (palette tool)
-   [Semblance](https://github.com/noah-art3mis/semblance) (image generation)

## How to

1.  get a palette.

    -   use hex codes
    -   For example, you can upload a book cover [here](https://color.adobe.com/create/image-gradient).

1.  set configs in `configs.ts`:

    -   PALETTE: your palette
    -   GRADIENT_SIZE: 1 for single color background, 2 for two colors, etc
    -   CONTRAST_THRESHOLD: plates with lower contrast are skipped (2 ~ 8 recommended)
        -   for higher gradient sizes (e.g. 3, 4), a lower threshold is recommended
    -   CSS_FORMAT: if true, generates results in css format
    -   SHUFFLE_PLATES: if true, shuffle plates

1.  open the client: `npm run dev -- --open`.

    -   every permutation is generated. low contrast ones are skipped according to `CONTRAST_THRESHOLD`.
    -   every time you reload the page, sentences are randomly assigned. if `SHUFFLE` is on, plates are shuffled.

1.  click the plates you don't want. they will be removed from the page.

1.  click `Get palette`
    -   results will be in the console. format depends on `CSS_FORMAT`

## palettes

    ksi

                '#C4B9B3',
                '#434343',
                '#657189'

                --c-1: rgb(196, 185, 179);
                --c-2: linear-gradient(0deg, rgb(67, 67, 67), rgb(67, 67, 67));


    fg

                '#CDC0BA',
                '#734C48',
                '#F2D0A7',
                '#9B95BF',
                '#37262C',
                '#836153',

                --c1: rgb(55, 38, 44);
                --c2: linear-gradient(
                180deg,
                rgb(242, 208, 167),
                rgb(242, 208, 167),
                rgb(155, 149, 191)
                );

## TODO

-   move configs to ui
-   select ones you want instead
-   convert output to hex
-   when only 2 colors results say 'background-image' but should be background-color
-   deploy
