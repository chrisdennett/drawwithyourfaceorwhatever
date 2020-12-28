import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createBrushCanvas, createCanvasFromImage } from "./helpers/helpers";
import { BrushMaker } from "./pages/Brushmaker";
import { PaintingCanvas } from "./pages/PaintingCanvas";

const App = () => {
  const [currPage, setCurrPage] = useState("makeBrush"); // pages "paint" / "makeBrush"
  const [brush, setBrush] = useState({ data: 0, canvas: null });
  const [sourceImg, setSourceImg] = useState({ data: 0, canvas: null });
  const [maskImg, setMaskImg] = useState({ data: 0, canvas: null });
  const [painting, setPainting] = useState({ data: 0, canvas: null });

  // LOAD SAMPLE IMAGE FOR BRUSH SOURCE
  useEffect(() => {
    if (!sourceImg.canvas) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const canvas = createCanvasFromImage(image);
        setSourceImg((prev) => {
          return { canvas, data: prev.data + 1 };
        });
      };
      image.src = "doug.png";
    }
  });

  // LOAD SAMPLE IMAGE FOR MASK
  useEffect(() => {
    if (!maskImg.canvas) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const canvas = createCanvasFromImage(image);
        setMaskImg((prev) => {
          return { canvas, data: prev.data + 1 };
        });
      };
      image.src = "test-mask-transparent-bg.png";
    }
  });

  useEffect(() => {
    if (!sourceImg.canvas || !maskImg.canvas) return;

    const brushCanvas = createBrushCanvas(sourceImg.canvas, maskImg.canvas);
    setBrush((prev) => {
      return { canvas: brushCanvas, data: prev.data + 1 };
    });
  }, [sourceImg.data, maskImg.data]);

  const showPaintPage = () => setCurrPage("paint");
  const showMakeBrushPage = () => setCurrPage("makeBrush");

  return (
    <Page>
      <main>
        {currPage === "paint" && (
          <PaintingCanvas
            painting={painting}
            onUpdateCanvas={setPainting}
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
