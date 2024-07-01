export function filterColors(colors: Color[][], threshold: number): Color[][] {
    return colors.filter((colorArray) => {
        const mainColor = colorArray[0];
        const otherColors = colorArray.slice(1); // Get all elements except the first

        for (const otherColor of otherColors) {
            if (mainColor.isLowContrast(otherColor, threshold)) {
                return false;
            }
        }
        return true;
    });
}

export class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a: number = 255) {
        this.r = this.checkRange(r);
        this.g = this.checkRange(g);
        this.b = this.checkRange(b);
        this.a = this.checkRange(a);
    }

    private checkRange(value: number): number {
        if (typeof value !== 'number' || value < 0 || value > 255) {
            throw new Error('Value must be a number between 0 and 255');
        }
        return value;
    }

    static fromHex(hex: string): Color {
        const result =
            /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

        if (!result) {
            throw new Error('Invalid hex color');
        }

        const _r = parseInt(result[1], 16);
        const _g = parseInt(result[2], 16);
        const _b = parseInt(result[3], 16);
        const _a = result[4] ? parseInt(result[4], 16) : 255;

        return new Color(_r, _g, _b, _a);
    }

    toRgba(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
    }

    toHex(): string {
        const _r = this.r.toString(16).padStart(2, '0');
        const _g = this.g.toString(16).padStart(2, '0');
        const _b = this.b.toString(16).padStart(2, '0');
        const _a = this.a.toString(16).padStart(2, '0');
        return `#${_r}${_g}${_b}${_a}`;
    }

    isLowContrast(otherColor: Color, threshold: number): boolean {
        return Color.contrast(this, otherColor) < threshold;
    }

    private static contrast(color1: Color, color2: Color): number {
        const lum1 = Color.luminance(color1);
        const lum2 = Color.luminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    private static luminance(color: Color): number {
        const RED = 0.2126;
        const GREEN = 0.7152;
        const BLUE = 0.0722;
        const GAMMA = 2.4;

        const a = [color.r, color.g, color.b].map((v) => {
            v /= 255;
            return v <= 0.03928
                ? v / 12.92
                : Math.pow((v + 0.055) / 1.055, GAMMA);
        });
        return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
    }
}
