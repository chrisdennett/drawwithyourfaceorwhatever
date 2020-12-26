import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSampleImage } from "../hooks/useSampleImage";
import { saveCanvas, drawCanvas } from "../helpers/helpers";
import PhotoSelector from "./PhotoSelector";

export const BrushMaker = ({ sourceCanvas }) => {
  const [sourceImg, setSourceImg] = useState(useSampleImage("doug"));
  const canvasRef = useRef(null);

  useSampleImage("doug.png", setSourceImg);

  useEffect(() => {
    if (!sourceImg) return;
    if (!canvasRef || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = sourceImg.width;
    canvas.height = sourceImg.height;
    const ctx = canvas.getContext("2d");

    drawCanvas(ctx, sourceImg);
  }, [sourceImg]);

  const onSave = () => {
    console.log("call save bruch method");
  };

  return (
    <div>
      <h2>BRUSH MAKER</h2>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div>
        <PhotoSelector onPhotoSelected={setSourceImg} />
        <Butt onClick={onSave} style={{ opacity: sourceCanvas ? 1 : 0.3 }}>
          Save Canvas
        </Butt>
      </div>
    </div>
  );
};

const Butt = styled.button`
  cursor: pointer;
`;
