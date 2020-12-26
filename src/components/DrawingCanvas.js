import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { paint } from "../helpers/helpers";

export const DrawingCanvas = ({
  onUpdateCanvas,
  brush,
  showMakeBrushPage,
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
      <TopBar>
        <h1>Drawwithyourfaceorwhatever</h1>
        <button onClick={clearCanvas}>CLEAR</button>
        <button onClick={showMakeBrushPage}>Edit Brush</button>
      </TopBar>

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

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 10px;
`;
