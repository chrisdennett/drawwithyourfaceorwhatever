import React, { useEffect, useRef } from "react";

export const PhotoCanvas = ({ photo }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef || !canvasRef.current || !photo) return;

    const canvas = canvasRef.current;
    canvas.width = photo.width;
    canvas.height = photo.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(photo, 0, 0);
  }, [canvasRef, photo]);

  return <canvas ref={canvasRef} />;
};
