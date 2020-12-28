import React, { useEffect, useRef, useState } from "react";

export const ControlledDrawingCanvas = ({
  onUpdateCanvas,
  drawingCanvas,
  width = 200,
  height = 200,
  brushWidth = 10,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [point, setPoint] = useState(null);
  const displayCanvas = useRef(null);

  useEffect(() => {
    if (!displayCanvas || !displayCanvas.current || !drawingCanvas) return;

    const c = displayCanvas.current;
    const ctx = c.getContext("2d");
    c.width = width;
    c.height = height;
    // CLEAR
    ctx.beginPath();
    ctx.clearRect(0, 0, c.width, c.height);
    // DRAW
    ctx.drawImage(drawingCanvas, 0, 0);

    // eslint-disable-next-line
  }, [drawingCanvas]);

  const onMouseDown = (e) => {
    setIsDrawing(true);
    const newPt = getPointFromMouseEvent(e);
    setPoint(newPt);
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
    onUpdateCanvas(displayCanvas.current);
  };

  const drawLine = (from, to) => {
    if (!drawingCanvas) return;
    if (!from || !to) return;

    const c = drawingCanvas.current;
    const ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.strokeStyle = "0";
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushWidth;
    ctx.stroke();
  };

  return (
    <displayCanvas
      ref={displayCanvas}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
      onMouseUp={onMouseUp}
    />
  );
};
