import React from "react";
import styled from "styled-components";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { getClearCanvas } from "../helpers/helpers";

export const PaintingCanvas = ({
  painting,
  setPainting,
  brush,
  showMakeBrushPage,
}) => {
  const clearPainting = () => {
    const w = painting.canvas.width;
    const h = painting.canvas.height;
    setPainting(getClearCanvas(w, h));
  };

  return (
    <div>
      <TopBar>
        <h1>Paintwithyourfaceorwhatever</h1>
        <button onClick={clearPainting}>CLEAR</button>
        <button onClick={showMakeBrushPage}>Edit Brush</button>
      </TopBar>

      <ControlledDrawingCanvas
        sourceCanvas={painting}
        setSourceCanvas={setPainting}
        brush={brush}
        brushWidth={30}
      />
    </div>
  );
};

const TopBar = styled.div`
  height: 160px;
`;
