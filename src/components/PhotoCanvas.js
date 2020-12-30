import React, { useEffect, useRef } from "react";

export const PhotoCanvas = ({ photo, className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !photo.canvas) return;

    const canvas = canvasRef.current;
    canvas.width = photo.canvas.width;
    canvas.height = photo.canvas.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(photo.canvas, 0, 0);
  }, [canvasRef, photo]);

  return <canvas ref={canvasRef} className={className} />;
};
