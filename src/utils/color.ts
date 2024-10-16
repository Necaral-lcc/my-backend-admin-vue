import { colord } from "colord";

export const getHsl = (color: string) => colord(color).toHsl();

const colorPaletteNumbers = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
];

export const getColorPalette = (
  color: string,
  palette = colorPaletteNumbers
): [number, string][] => {
  const min = 10;
  const max = 90;
  const range = max - min;
  const sum = Math.min(...palette) + Math.max(...palette);
  const step = range / sum;
  const colorPalette: [number, string][] = palette.map(num => {
    const hsl = getHsl(color);
    hsl.l = step * (sum - num);
    return [num, colord(hsl).toHex()];
  });
  return colorPalette;
};

export const setDocumentColor = (
  color: string,
  prefix = "custom-color",
  palette = colorPaletteNumbers
): Record<string, string> => {
  const colorPalette: [string, string][] = getColorPalette(color, palette).map(
    color => [`--${prefix}-${color[0]}`, color[1]]
  );
  return Object.fromEntries(colorPalette);
};

export const setDocumentProperty = (props: Record<string, string>) => {
  Object.entries(props).forEach(prop => {
    document.documentElement.style.setProperty(prop[0], prop[1]);
  });
};
