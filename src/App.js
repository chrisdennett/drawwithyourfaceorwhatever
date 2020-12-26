import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CanvasSaver } from "./components/CanvasSaver";
import { DrawingCanvas } from "./components/DrawingCanvas";
import PhotoSelector from "./components/PhotoSelector";
import { useSampleImage } from "./hooks/useSampleImage";

const App = () => {
  const [brush, setBrush] = useState(null);
  const [sourceImg, setSourceImg] = useState(null);
  const [maskImg, setMaskImg] = useState(null);
  const canvasRef = React.useRef(null);

  useSampleImage("test-mask-transparent-bg.png", setMaskImg);
  useSampleImage("doug.png", setSourceImg);

  useEffect(() => {
    if (!sourceImg || !maskImg) return;
    if (!canvasRef || !canvasRef.current) return;

    const { brushCanvas, w2hRatio } = createBrushCanvas(sourceImg, maskImg);
    setBrush({ brushCanvas, w2hRatio });

    const brushW = 42;
    const brushH = brushW * w2hRatio;
    const brushSize = { w: brushW, h: brushH };

    const canvas = canvasRef.current;
    canvas.width = 42;
    canvas.height = brushH;

    const ctx = canvas.getContext("2d");
    paint(ctx, brushCanvas, 0, 0, brushSize);
  }, [sourceImg, maskImg]);

  const onUpdateCanvas = (canv) => {
    // console.log(canv);
  };

  return (
    <Page>
      <TopBar>
        <PhotoSelector onPhotoSelected={setSourceImg} />
        <CanvasSaver sourceCanvas={canvasRef.current} />
      </TopBar>
      <DrawingCanvas onUpdateCanvas={onUpdateCanvas} brush={brush} />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Page>
  );
};

export default App;

const paint = (ctx, brushCanvas, x, y, brushsize) => {
  ctx.drawImage(
    brushCanvas,
    0,
    0,
    brushCanvas.width,
    brushCanvas.height,
    x,
    y,
    brushsize.w,
    brushsize.h
  );
};

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const Page = styled.div`
  display: flex;
  background: whitesmoke;
  min-height: 100vh;
  align-items: center;
  justify-content: center;

  canvas {
    border: 1px solid black;
  }
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
