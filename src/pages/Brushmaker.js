import React from "react";
import styled from "styled-components";
import { BrushPreview } from "../components/BrushPreview";
import PhotoSelector from "../components/PhotoSelector";
import { PhotoCanvas } from "../components/PhotoCanvas";
// import { MaskDrawingCanvas } from "../components/MaskDrawingCanvas";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";

export const BrushMaker = ({
  showPaintPage,
  brush,
  setSourceImg,
  sourceImg,
  maskImg,
  setMaskImg,
}) => {
  const clearMask = () =>
    setMaskImg((prev) => {
      const { width, height } = prev.canvas;
      return { canvas: getClearCanvas(width, height), data: prev.data + 1 };
    });

  return (
    <Page>
      <TopBar>
        <h1>Makeabrushfromyourfaceorwhatever...</h1>
        <button onClick={showPaintPage}>GetPainting</button>
        <button onClick={clearMask}>Clear</button>
        <PhotoSelector onPhotoSelected={setSourceImg} />
      </TopBar>

      {sourceImg && (
        <CanvasHolder
          style={{ width: sourceImg.width, height: sourceImg.height }}
        >
          <PhotoCanvas photo={sourceImg} />
          <ControlledDrawingCanvas
            sourceCanvas={maskImg}
            brushWidth={30}
            setSourceCanvas={setMaskImg}
          />
        </CanvasHolder>
      )}
      {brush && <BrushPreview brushCanvas={brush} />}
    </Page>
  );
};

const Page = styled.div`
  background: whitesmoke;
`;

const TopBar = styled.div`
  height: 160px;
  padding: 10px;
`;

const CanvasHolder = styled.div`
  position: relative;
  display: inline-block;

  canvas {
    position: absolute;
    border: 1px solid black;
  }
`;
