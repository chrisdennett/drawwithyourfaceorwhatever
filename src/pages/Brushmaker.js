import React from "react";
import styled from "styled-components";
import { BrushPreview } from "../components/BrushPreview";
import PhotoSelector from "../components/PhotoSelector";
import { PhotoCanvas } from "../components/PhotoCanvas";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";

export const BrushMaker = ({
  brushImgObj,
  onUpdate,
  maskImgObj,
  onMaskUpdate,
  showPaintPage,
  brush,
}) => {
  const clearMask = () => {
    const w = maskImgObj.canvas.width;
    const h = maskImgObj.canvas.height;
    onMaskUpdate(getClearCanvas(w, h));
  };

  const onPhotoSelected = (img) => {
    onUpdate(img);
    onMaskUpdate(getClearCanvas(img.width, img.height));
  };

  const containerStyle =
    brushImgObj && brushImgObj.canvas
      ? {
          width: brushImgObj.canvas.width,
          height: brushImgObj.canvas.height,
        }
      : {};

  return (
    <Page>
      <TopBar>
        <h1>Makeabrushfromyourfaceorwhatever...</h1>
        <button onClick={showPaintPage}>GetPainting</button>
        <button onClick={clearMask}>Clear</button>
        <PhotoSelector onPhotoSelected={onPhotoSelected} />
      </TopBar>

      <Content>
        {brushImgObj && (
          <CanvasHolder style={containerStyle}>
            <h3>Draw over photo or whatever</h3>
            <StyledPhotoCanvas photo={brushImgObj} />
            <StyledControlledDrawingCanvas
              sourceCanvas={maskImgObj}
              setSourceCanvas={onMaskUpdate}
              brushWidth={30}
            />
          </CanvasHolder>
        )}

        {brush && (
          <div>
            <h3>Brush preview or whatever</h3>
            <CenteredHolder style={containerStyle}>
              <BrushPreview brushCanvas={brush} />
            </CenteredHolder>
          </div>
        )}
      </Content>
    </Page>
  );
};

const CenteredHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const Page = styled.div`
  background: whitesmoke;
`;

const Content = styled.div`
  display: flex;
`;

const TopBar = styled.div`
  height: 160px;
  padding: 10px;
`;

const CanvasHolder = styled.div`
  position: relative;
  margin-right: 20px;
`;

const StyledControlledDrawingCanvas = styled(ControlledDrawingCanvas)`
  border: 1px solid black;
  position: absolute;
  z-index: 1;
`;

const StyledPhotoCanvas = styled(PhotoCanvas)`
  position: absolute;
  border: 1px solid black;
`;
