import React, { useEffect, useRef, useState } from "react";
import {
  drawLine,
  drawToCanvas,
  getPointFromMouseEvent,
} from "../helpers/helpers";

export const ControlledDrawingCanvas = ({
  sourceCanvas,
  setSourceCanvas,
  brushWidth = 10,
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

    drawLine(sourceCanvas.canvas, from, to, brushWidth);
    setSourceCanvas({ canvas: sourceCanvas.canvas, data: Date.now() });
    setPoint(newPt);
  };

  const onMouseUp = () => {
    setPoint((prev) => {
      drawLine(sourceCanvas.canvas, prev, prev, brushWidth);
      setSourceCanvas({ canvas: sourceCanvas.canvas, data: Date.now() });
      return null;
    });
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={displayCanvas}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
      onMouseUp={onMouseUp}
    />
  );
};
