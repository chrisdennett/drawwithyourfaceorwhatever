import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { paint } from "../helpers/helpers";

export const PaintingCanvas = ({
  onUpdateCanvas,
  painting,
  brush,
  showMakeBrushPage,
  brushSize = { w: 200, h: 300 },
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [point, setPoint] = useState(null);
  const [isSetup, setIsSetUp] = useState(false);

  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas || !canvas.current) return;
    if (isSetup) return;
    setupCanvas();

    if (painting) {
      const c = canvas.current;
      const ctx = c.getContext("2d");
      ctx.drawImage(painting, 0, 0);
    }

    setIsSetUp(true);

    // eslint-disable-next-line
  }, [canvas]);

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
    c.width = window.innerWidth - 20;
    c.height = window.innerHeight - 160;

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
    paint(ctx, brush, brushSize, to.x, to.y);
  };

  return (
    <div>
      <TopBar>
        <h1>Paintwithyourfaceorwhatever</h1>
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
  height: 160px;
`;
