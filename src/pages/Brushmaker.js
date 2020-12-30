import React from "react";
import styled from "styled-components";
import { BrushPreview } from "../components/BrushPreview";
import PhotoSelector from "../components/PhotoSelector";
import { PhotoCanvas } from "../components/PhotoCanvas";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";

export const BrushMaker = ({
  brushImgObj,
  setBrushImgObj,
  maskImgObj,
  setMaskImgObj,
  showPaintPage,
  brush,
}) => {
  const clearMask = () => {
    const w = maskImgObj.canvas.width;
    const h = maskImgObj.canvas.height;
    setMaskImgObj(getClearCanvas(w, h));
  };

  const onPhotoSelected = (img) => {
    setBrushImgObj(img);
    setMaskImgObj(getClearCanvas(img.width, img.height));
  };

  return (
    <Page>
      <TopBar>
        <h1>Makeabrushfromyourfaceorwhatever...</h1>
        <button onClick={showPaintPage}>GetPainting</button>
        <button onClick={clearMask}>Clear</button>
        <PhotoSelector onPhotoSelected={onPhotoSelected} />
      </TopBar>

      {brushImgObj && (
        <CanvasHolder
          style={{ width: brushImgObj.width, height: brushImgObj.height }}
        >
          <PhotoCanvas photo={brushImgObj} />
          <ControlledDrawingCanvas
            sourceCanvas={maskImgObj}
            setSourceCanvas={setMaskImgObj}
            brushWidth={30}
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
