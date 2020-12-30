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

// DRAW ONE CANVAS TO ANOTHER
export const drawToCanvas = (sourceCanvas, targCanvas) => {
  const ctx = targCanvas.getContext("2d");
  targCanvas.width = sourceCanvas.width;
  targCanvas.height = sourceCanvas.height;

  // CLEAR
  ctx.beginPath();
  ctx.clearRect(0, 0, targCanvas.width, targCanvas.height);
  // DRAW
  ctx.drawImage(sourceCanvas, 0, 0);
};

export const drawLine = (canvas, from, to, lineWidth) => {
  if (!canvas) return;
  if (!from || !to) return;

  const ctx = canvas.getContext("2d");
  ctx.beginPath();

  ctx.strokeStyle = "0";
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

export const drawBrush = (canvas, brush, pos, brushSize) => {
  if (!brush || !pos || !canvas) return;

  const ctx = canvas.getContext("2d");
  const { width, height } = brush.canvas;
  const brushW = brushSize;
  const brushH = brushSize;

  const halfW = brushW / 2;
  const halfH = brushH / 2;

  ctx.drawImage(
    brush.canvas,
    0,
    0,
    width,
    height,
    pos.x - halfW,
    pos.y - halfH,
    brushW,
    brushH
  );
};

export const getPointFromMouseEvent = (e) => {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.

  return { x, y, lineDrawn: false };
};

export const createCanvasFromImage = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas;
};

export const getClearCanvas = (w, h) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  return canvas;
};
