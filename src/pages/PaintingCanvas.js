import React, { useState } from "react";
import styled from "styled-components";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { MouseFollower } from "../components/MouseFollower";
import PhotoSelector from "../components/PhotoSelector";
import { getBlankCanvas } from "../helpers/helpers";
import { useKeyPress } from "../hooks/useKeyPress";
import { saveAs } from "file-saver";

export const PaintingCanvas = ({
  painting,
  onUpdate,
  brush,
  brushSize,
  onBrushSizeChange,
  reducePaintBrushSize,
  increasePaintBrushSize,
}) => {
  const [mousePos, setMousePos] = useState(null);

  const clearPainting = () => {
    const w = painting.canvas.width;
    const h = painting.canvas.height;
    onUpdate(getBlankCanvas(w, h));
  };

  useKeyPress("ArrowUp", () => increasePaintBrushSize());
  useKeyPress("ArrowDown", () => reducePaintBrushSize());

  const onMouseMove = (e) => {
    const pt = { x: e.clientX, y: e.clientY };
    setMousePos(pt);
  };

  const onPhotoSelected = (img) => {
    console.log("img: ", img);
  };

  const saveImg = (img) => {
    const filename = "ipaintedwithmyfaceorwhatever";

    if (!painting.canvas) return;
    painting.canvas.toBlob(
      (blob) => {
        saveAs(blob, `${filename}.jpg`);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <Outer onMouseMove={onMouseMove}>
      <MouseFollower pos={mousePos} size={brushSize} />

      <Controls>
        <SaveButton onClick={saveImg}>SAVE IMAGE</SaveButton>
        <PhotoSelector onPhotoSelected={onPhotoSelected} />
        <ClearButton onClick={clearPainting}>CLEAR CANVAS</ClearButton>
        <BrushSizeControl value={brushSize} onChange={onBrushSizeChange} />
      </Controls>

      <Canvas
        sourceCanvas={painting}
        setSourceCanvas={onUpdate}
        brush={brush}
        brushWidth={brushSize}
      />
    </Outer>
  );
};

const SaveButton = styled.button`
  margin: 0 15px;
  padding: 20px 10px;
  background: #498e38;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
`;

const ClearButton = styled.button`
  margin: 0 15px 0 0;
  padding: 20px 10px;
  background: #b92525;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
`;

const Outer = styled.div`
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

const Canvas = styled(ControlledDrawingCanvas)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: crosshair;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
`;
