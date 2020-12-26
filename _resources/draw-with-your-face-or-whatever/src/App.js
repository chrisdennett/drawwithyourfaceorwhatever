import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CanvasSaver } from "./components/CanvasSaver";
import PhotoSelector from "./components/PhotoSelector";
import { useSampleImage } from "./hooks/useSampleImage";

const App = () => {
  const [sourceImg, setSourceImg] = useState(useSampleImage("doug"));
  const canvasRef = React.useRef(null);

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

  return (
    <Page>
      <div>
        <PhotoSelector onPhotoSelected={setSourceImg} />
        <CanvasSaver sourceCanvas={canvasRef.current} />
      </div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Page>
  );
};

export default App;

const drawCanvas = (ctx, source) => {
  ctx.drawImage(source, 0, 0);
};

const Page = styled.div`
  display: flex;
`;
