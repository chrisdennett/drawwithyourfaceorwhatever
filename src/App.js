import React, { useState } from "react";
import styled from "styled-components";
import { BrushMaker } from "./components/Brushmaker";
import { DrawingCanvas } from "./components/DrawingCanvas";

// pages "paint" / "makeBrush"

const App = () => {
  const [currPage, setCurrPage] = useState("makeBrush");
  const [brush, setBrush] = useState(null);

  const onUpdateCanvas = (canv) => {
    // console.log(canv);
  };
  const showPaintPage = () => {
    setCurrPage("paint");
  };
  const showMakeBrushPage = () => {
    setCurrPage("makeBrush");
  };

  return (
    <Page>
      <main>
        {currPage === "paint" && (
          <DrawingCanvas
            onUpdateCanvas={onUpdateCanvas}
            brush={brush}
            showMakeBrushPage={showMakeBrushPage}
          />
        )}

        {currPage === "makeBrush" && (
          <BrushMaker
            showPaintPage={showPaintPage}
            setBrush={setBrush}
            brush={brush}
          />
        )}
      </main>
    </Page>
  );
};

export default App;

const Page = styled.div`
  display: flex;
  background: whitesmoke;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  canvas {
    border: 1px solid black;
  }
`;
