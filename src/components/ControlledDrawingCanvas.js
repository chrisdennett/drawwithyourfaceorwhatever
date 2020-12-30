import React, { useEffect, useRef, useState } from "react";
import {
  drawBrush,
  drawLine,
  drawToCanvas,
  getPointFromMouseEvent,
} from "../helpers/helpers";

export const ControlledDrawingCanvas = ({
  sourceCanvas,
  setSourceCanvas,
  brushWidth = 10,
  brush,
  className,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [point, setPoint] = useState(null);
  const displayCanvas = useRef(null);

  useEffect(() => {
    if (!displayCanvas || !displayCanvas.current || !sourceCanvas.canvas)
      return;
    const c = displayCanvas.current;
    drawToCanvas(sourceCanvas.canvas, c);
  }, [displayCanvas, sourceCanvas]);

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

    if (brush) {
      drawBrush(sourceCanvas.canvas, brush, to, brushWidth);
    } else {
      drawLine(sourceCanvas.canvas, from, to, brushWidth);
    }

    setSourceCanvas(sourceCanvas.canvas);
    setPoint(newPt);
  };

  const onMouseUp = () => {
    setPoint((prev) => {
      if (brush) {
        drawBrush(sourceCanvas.canvas, brush, prev, brushWidth);
      } else {
        drawLine(sourceCanvas.canvas, prev, prev, brushWidth);
      }
      return null;
    });
    setSourceCanvas(sourceCanvas.canvas);
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={displayCanvas}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
      onMouseUp={onMouseUp}
      className={className}
    />
  );
};
