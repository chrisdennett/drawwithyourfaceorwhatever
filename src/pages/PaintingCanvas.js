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
  const clearPainting = () =>
    setPainting((prev) => {
      const { width, height } = prev.canvas;
      return { canvas: getClearCanvas(width, height), data: prev.data + 1 };
    });

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
