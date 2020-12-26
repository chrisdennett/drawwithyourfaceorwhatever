import React, { useEffect, useRef, useState } from "react";

export const DrawingCanvas = ({
  onUpdateCanvas,
  brush,
  brushSize = { w: 42, h: 50 },
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [point, setPoint] = useState(null);
  const [isSetup, setIsSetUp] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas || !canvas.current) return;
    if (isSetup) return;
    setupCanvas();
    setIsSetUp(true);
  }, [canvas, isSetup, setIsSetUp]);

  const onMouseDown = (e) => {
    setIsDrawing(true);
    const newPt = getPointFromMouseEvent(e);
    setPoint(newPt);
  };

  const clearCanvas = () => {
    const c = canvas.current;
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
  };

  const setupCanvas = () => {
    if (isSetup) return;

    const c = canvas.current;
    c.width = window.innerWidth;
    c.height = window.innerHeight - 60;

    clearCanvas();
  };

  const onMouseMove = (e) => {
    if (!isDrawing) return;

    const newPt = { ...getPointFromMouseEvent(e), lineDrawn: true };
    const from = point ? point : newPt;
    const to = newPt;

    drawLine(from, to);
    setPoint(newPt);
  };

  const getPointFromMouseEvent = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    return { x, y, lineDrawn: false };
  };

  const onMouseUp = () => {
    setPoint((prev) => {
      drawLine(prev, prev);
      return null;
    });
    setIsDrawing(false);
    onUpdateCanvas(canvas.current);
  };

  const drawLine = (from, to) => {
    if (!canvas || !canvas.current) return;
    if (!from || !to) return;

    const c = canvas.current;
    const ctx = c.getContext("2d");
    paint(ctx, brush.brushCanvas, brushSize, to.x, to.y);
  };

  return (
    <div>
      <button onClick={clearCanvas}>CLEAR</button>
      <canvas
        ref={canvas}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseUp}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};

const paint = (ctx, brush, brushSize, x, y) => {
  const { width, height } = brush;
  const { w, h } = brushSize;
  const halfW = w / 2;
  const halfH = h / 2;

  ctx.drawImage(brush, 0, 0, width, height, x - halfW, y - halfH, w, h);
};
