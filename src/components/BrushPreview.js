import React, { useEffect } from "react";

export const BrushPreview = ({ brushCanvas }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !brushCanvas.canvas) return;

    const canvas = canvasRef.current;
    canvas.width = brushCanvas.canvas.width;
    canvas.height = brushCanvas.canvas.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(brushCanvas.canvas, 0, 0);
  }, [canvasRef, brushCanvas]);

  return <canvas ref={canvasRef} />;
};
