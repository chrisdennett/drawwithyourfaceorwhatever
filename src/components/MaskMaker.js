import React, { useEffect } from "react";
import styled from "styled-components";
import { MaskDrawingCanvas } from "./MaskDrawingCanvas";
import { PhotoCanvas } from "./PhotoCanvas";

export const MaskMaker = ({ setBrush, sourceImg, maskImg, setMaskImg }) => {
  useEffect(() => {
    if (!sourceImg || !maskImg) return;

    const brushCanvas = createBrushCanvas(sourceImg, maskImg);
    setBrush(brushCanvas);
  }, [sourceImg, maskImg, setBrush]);

  const onUpdateCanvas = (canv) => {
    const brushCanvas = createBrushCanvas(sourceImg, canv);
    setBrush(brushCanvas);
    setMaskImg(canv);
  };

  if (!sourceImg) return null;

  return (
    <CanvasHolder style={{ width: sourceImg.width, height: sourceImg.height }}>
      <PhotoCanvas photo={sourceImg} />
      <MaskDrawingCanvas
        maskImg={maskImg}
        onUpdateCanvas={onUpdateCanvas}
        width={sourceImg.width}
        height={sourceImg.height}
      />
    </CanvasHolder>
  );
};

const CanvasHolder = styled.div`
  position: relative;
  display: inline-block;

  canvas {
    position: absolute;
    border: 1px solid black;
  }
`;

//{ left: 55, top: 56, right: 334, bottom: 453 }
const createBrushCanvas = (sourceImg, maskImg, bounds) => {
  if (!bounds) {
    bounds = {
      left: 0,
      top: 0,
      right: sourceImg.width,
      bottom: sourceImg.height,
    };
  }
  console.log("maskImg: ", maskImg);
  const { top, right, bottom, left } = bounds;
  const outW = right - left;
  const outH = bottom - top;

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, outW, outH);

  ctx.drawImage(maskImg, left, top, outW, outH, 0, 0, outW, outH);
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(sourceImg, left, top, outW, outH, 0, 0, outW, outH);

  return canvas;
};
