import React, { useEffect } from "react";
import styled from "styled-components";
import { createBrushCanvas } from "../helpers/helpers";
import { MaskDrawingCanvas } from "./MaskDrawingCanvas";
import { PhotoCanvas } from "./PhotoCanvas";

export const MaskMaker = ({ setBrush, sourceImg, maskImg, setMaskImg }) => {
  useEffect(() => {
    if (!sourceImg || !maskImg) return;
    const brushCanvas = createBrushCanvas(sourceImg, maskImg);
    setBrush(brushCanvas);
  }, [sourceImg, maskImg, setBrush]);

  if (!sourceImg) return null;

  return (
    <CanvasHolder style={{ width: sourceImg.width, height: sourceImg.height }}>
      <PhotoCanvas photo={sourceImg} />
      <MaskDrawingCanvas
        maskImg={maskImg}
        onUpdateCanvas={setMaskImg}
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
