import React, { useState } from "react";
// import { useHotkeys } from "react-hotkeys-hook";
import styled from "styled-components";
import { BrushSizeControl } from "../components/BrushSizeControl";
import { ControlledDrawingCanvas } from "../components/ControlledDrawingCanvas";
import { MouseFollower } from "../components/MouseFollower";
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
  const [mousePos, setMousePos] = useState(null);

  const clearPainting = () => {
    const w = painting.canvas.width;
    const h = painting.canvas.height;
    onUpdate(getClearCanvas(w, h));
  };

  useKeyPress("ArrowUp", () => increasePaintBrushSize());
  useKeyPress("ArrowDown", () => reducePaintBrushSize());

  const onMouseMove = (e) => {
    const pt = { x: e.clientX, y: e.clientY };
    setMousePos(pt);
  };

  return (
    <div onMouseMove={onMouseMove}>
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
    </div>
  );
};

const Controls = styled.div`
  height: 100px;
`;

const Canvas = styled(ControlledDrawingCanvas)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: crosshair;
`;
