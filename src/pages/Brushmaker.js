import React, { useState } from "react";
import styled from "styled-components";
import { BrushPreview } from "../components/BrushPreview";
import PhotoSelector from "../components/PhotoSelector";
import { PhotoCanvas } from "../components/PhotoCanvas";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { useKeyPress } from "../hooks/useKeyPress";
import { MouseFollower } from "../components/MouseFollower";

export const BrushMaker = ({
  brushImgObj,
  onUpdate,
  maskImgObj,
  onMaskUpdate,
  brush,
  maskBrushSize,
  onMaskBrushSizeChange,
  increaseMaskBrushSize,
  reduceMaskBrushSize,
}) => {
  const [mousePos, setMousePos] = useState(null);

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

  useKeyPress("ArrowUp", () => increaseMaskBrushSize());
  useKeyPress("ArrowDown", () => reduceMaskBrushSize());

  const onMouseMove = (e) => {
    const pt = { x: e.clientX, y: e.clientY };
    setMousePos(pt);
  };

  return (
    <Page onMouseMove={onMouseMove}>
      <MouseFollower pos={mousePos} size={maskBrushSize} />

      <Controls>
        <ClearButton onClick={clearMask}>RESET</ClearButton>
        <PhotoSelector onPhotoSelected={onPhotoSelected} />
        <BrushSizeControl
          value={maskBrushSize}
          onChange={onMaskBrushSizeChange}
        />
      </Controls>

      <Content>
        {brushImgObj && (
          <CanvasHolder style={containerStyle}>
            <h3>Paint over photo or whatever</h3>
            <StyledPhotoCanvas photo={brushImgObj} />
            <StyledControlledDrawingCanvas
              brushSi
              sourceCanvas={maskImgObj}
              setSourceCanvas={onMaskUpdate}
              brushWidth={maskBrushSize}
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

const ClearButton = styled.button`
  margin: 0 15px;
  padding: 20px 10px;
  background: #b92525;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
`;

const CenteredHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Controls = styled.div`
  height: 80px;
  min-width: 400px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
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
