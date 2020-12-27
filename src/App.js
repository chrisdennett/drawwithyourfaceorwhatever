import React, { useState } from "react";
import styled from "styled-components";
import { useSampleImage } from "./hooks/useSampleImage";
import { BrushMaker } from "./pages/Brushmaker";
import { DrawingCanvas } from "./pages/DrawingCanvas";

// pages "paint" / "makeBrush"

const App = () => {
  const [currPage, setCurrPage] = useState("makeBrush");
  const [brush, setBrush] = useState(null);
  const [sourceImg, setSourceImg] = useState(null);
  const [maskImg, setMaskImg] = useState(null);

  useSampleImage("test-mask-transparent-bg.png", setMaskImg);
  useSampleImage("doug.png", setSourceImg);

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
            sourceImg={sourceImg}
            setSourceImg={setSourceImg}
            setMaskImg={setMaskImg}
            maskImg={maskImg}
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
  background: whitesmoke;

  canvas {
    border: 1px solid black;
  }
`;
