import React, { useState } from "react";
// import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { MouseFollower } from "../components/MouseFollower";
import { getBlankCanvas } from "../helpers/helpers";
import { useKeyPress } from "../hooks/useKeyPress";

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

  return (
    <Outer onMouseMove={onMouseMove}>
      <MouseFollower pos={mousePos} size={brushSize} />

      <Controls>
        <button onClick={clearPainting}>CLEAR</button>
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
  align-items: center;
  justify-content: center;
`;

const Canvas = styled(ControlledDrawingCanvas)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: crosshair;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
`;
