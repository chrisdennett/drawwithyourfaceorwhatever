import React, { useState } from "react";
import styled from "styled-components";
import { useSampleImage } from "./hooks/useSampleImage";
import { BrushMaker } from "./pages/Brushmaker";
import { PaintingCanvas } from "./pages/PaintingCanvas";

const App = () => {
  const [currPage, setCurrPage] = useState("makeBrush"); // pages "paint" / "makeBrush"
  const [brush, setBrush] = useState(null);
  const [sourceImg, setSourceImg] = useState(null);
  const [maskImg, setMaskImg] = useState(null);
  const [painting, setPainting] = useState(null);

  useSampleImage("test-mask-transparent-bg.png", setMaskImg);
  useSampleImage("doug.png", setSourceImg);

  const onUpdateCanvas = (canv) => {
    setPainting(canv);
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
          <PaintingCanvas
            painting={painting}
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
