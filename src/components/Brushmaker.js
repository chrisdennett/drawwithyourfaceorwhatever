import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { paint } from "../helpers/helpers";
import { useSampleImage } from "../hooks/useSampleImage";
import PhotoSelector from "./PhotoSelector";

export const BrushMaker = ({
  sourceCanvas,
  showPaintPage,
  setBrush,
  brush,
}) => {
  const [sourceImg, setSourceImg] = useState(null);
  const [maskImg, setMaskImg] = useState(null);
  const canvasRef = useRef(null);

  useSampleImage("test-mask-transparent-bg.png", setMaskImg);
  useSampleImage("doug.png", setSourceImg);

  useEffect(() => {
    if (!brush) return;
    if (!canvasRef || !canvasRef.current) return;

    console.log("brush: ", brush);

    const brushW = 42;
    const brushH = brushW * brush.w2hRatio;

    const canvas = canvasRef.current;
    canvas.width = 42;
    canvas.height = brushH;

    const ctx = canvas.getContext("2d");
    const { width, height } = brush.brushCanvas;
    ctx.drawImage(brush.brushCanvas, 0, 0, width, height, 0, 0, brushW, brushH);
  }, [brush, canvasRef]);

  useEffect(() => {
    if (!sourceImg || !maskImg) return;
    if (!canvasRef || !canvasRef.current) return;

    const { brushCanvas, w2hRatio } = createBrushCanvas(sourceImg, maskImg);
    setBrush({ brushCanvas, w2hRatio });
  }, [sourceImg, maskImg, setBrush]);

  const onSave = () => {
    console.log("call save bruch method");
  };

  return (
    <div>
      <TopBar>
        <h1>Drawwithyourfaceorwhatever</h1>
        <PhotoSelector onPhotoSelected={setSourceImg} />
        <button onClick={showPaintPage}>GetPainting</button>
      </TopBar>
      <h2>BRUSH MAKER</h2>
      <canvas ref={canvasRef} />
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

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 10px;
`;

const createBrushCanvas = (
  sourceImg,
  maskImg,
  bounds = { left: 55, top: 56, right: 334, bottom: 453 }
) => {
  const { top, right, bottom, left } = bounds;
  const outW = right - left;
  const outH = bottom - top;

  const canvas = document.createElement("canvas");
  canvas.width = outW; // get widest sprite
  canvas.height = outH; // add all sprites heights

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, outW, outH);

  ctx.drawImage(maskImg, left, top, outW, outH, 0, 0, outW, outH);
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(sourceImg, left, top, outW, outH, 0, 0, outW, outH);

  const w2hRatio = outH / outW;

  return { brushCanvas: canvas, w2hRatio };
};
