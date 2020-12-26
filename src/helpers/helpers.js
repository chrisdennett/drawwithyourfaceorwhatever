import { saveAs } from "file-saver";

// SAVE CANVAS TO FILE
export const saveCanvas = (
  sourceCanvas,
  filename = "draw-with-your-face-or-whatever"
) => {
  if (!sourceCanvas) return;
  sourceCanvas.toBlob(
    (blob) => {
      saveAs(blob, `${filename}.jpg`);
    },
    "image/jpeg",
    0.95
  );
};

// DRAW SOURCE TO CANVAS
export const drawCanvas = (ctx, source) => {
  ctx.drawImage(source, 0, 0);
};

// PAINT BRUSH TO CANVAS
export const paint = (ctx, brush, brushSize, x, y) => {
  const { width, height } = brush;
  const { w, h } = brushSize;
  const halfW = w / 2;
  const halfH = h / 2;

  ctx.drawImage(brush, 0, 0, width, height, x - halfW, y - halfH, w, h);
};
