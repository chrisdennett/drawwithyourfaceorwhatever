import React from "react";
import styled from "styled-components";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";

export const PaintingCanvas = ({
  painting,
  onUpdate,
  brush,
  showMakeBrushPage,
  brushSize,
  onBrushSizeChange,
}) => {
  const clearPainting = () => {
    const w = painting.canvas.width;
    const h = painting.canvas.height;
    onUpdate(getClearCanvas(w, h));
  };

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
