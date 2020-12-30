import React from "react";
// import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";
import { useKeyPress } from "../hooks/useKeyPress";

export const PaintingCanvas = ({
  painting,
  onUpdate,
  brush,
  showMakeBrushPage,
  brushSize,
  onBrushSizeChange,
  reducePaintBrushSize,
  increasePaintBrushSize,
}) => {
  const clearPainting = () => {
    const w = painting.canvas.width;
    const h = painting.canvas.height;
    onUpdate(getClearCanvas(w, h));
  };

  useKeyPress("ArrowUp", () => increasePaintBrushSize());
  useKeyPress("ArrowDown", () => reducePaintBrushSize());

  return (
    <div>
      <TopBar>
        <h1>Paintwithyourfaceorwhatever</h1>
        <button onClick={clearPainting}>CLEAR</button>
        <button onClick={showMakeBrushPage}>Edit Brush</button>
        <BrushSizeControl value={brushSize} onChange={onBrushSizeChange} />
      </TopBar>

      <ControlledDrawingCanvas
        sourceCanvas={painting}
        setSourceCanvas={onUpdate}
        brush={brush}
        brushWidth={brushSize}
      />
    </div>
  );
};

const TopBar = styled.div`
  height: 160px;
`;
