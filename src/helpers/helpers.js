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

// CREATE MASKED CANVAS
export const createBrushCanvas = (sourceImg, maskImg, bounds) => {
  if (!bounds) {
    bounds = {
      left: 0,
      top: 0,
      right: sourceImg.width,
      bottom: sourceImg.height,
    };
  }

  //{ left: 55, top: 56, right: 334, bottom: 453 }

  const { top, right, bottom, left } = bounds;
  const outW = right - left;
  const outH = bottom - top;

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, outW, outH);

  ctx.drawImage(maskImg, left, top, outW, outH, 0, 0, outW, outH);
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(sourceImg, left, top, outW, outH, 0, 0, outW, outH);

  return canvas;
};

// CREATE BLANK CANVAS
