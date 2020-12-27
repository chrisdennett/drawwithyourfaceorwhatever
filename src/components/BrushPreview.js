import React, { useEffect } from "react";

export const BrushPreview = ({ brushCanvas }) => {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = brushCanvas.width;
    canvas.height = brushCanvas.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(brushCanvas, 0, 0);
  }, [canvasRef, brushCanvas]);

  return <canvas ref={canvasRef} />;
};
