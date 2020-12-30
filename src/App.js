import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createBrushCanvas,
  createCanvasFromImage,
  getClearCanvas,
  getTrimmedCanvas,
} from "./helpers/helpers";
import { BrushMaker } from "./pages/Brushmaker";
import { PaintingCanvas } from "./pages/PaintingCanvas";

const App = () => {
  const [currPage, setCurrPage] = useState("paint"); // pages "paint" / "makeBrush"
  const [brush, setBrush] = useState({ data: 0, canvas: null });
  const [brushImgObj, setBrushImgObj] = useState({ data: 0, canvas: null });
  const [maskImgObj, setMaskImgObj] = useState({ data: 0, canvas: null });
  const [painting, setPainting] = useState({ data: 0, canvas: null });

  // LOAD SAMPLE IMAGE FOR BRUSH SOURCE
  useEffect(() => {
    if (!brushImgObj.canvas) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const canvas = createCanvasFromImage(image);
        setBrushImgObj((prev) => {
          return { canvas, data: prev.data + 1 };
        });
      };
      image.src = "doug.png";
    }
  });

  // LOAD SAMPLE IMAGE FOR MASK
  useEffect(() => {
    if (!maskImgObj.canvas) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const canvas = createCanvasFromImage(image);
        setMaskImgObj((prev) => {
          return { canvas, data: prev.data + 1 };
        });
      };
      image.src = "test-mask-transparent-bg.png";
    }
  });

  useEffect(() => {
    if (!brushImgObj.canvas || !maskImgObj.canvas) return;

    const brushCanvas = createBrushCanvas(
      brushImgObj.canvas,
      maskImgObj.canvas
    );
    const trimmedCanvas = getTrimmedCanvas(brushCanvas);

    setBrush((prev) => {
      return { canvas: trimmedCanvas, data: prev.data + 1 };
    });
  }, [brushImgObj, maskImgObj]);

  useEffect(() => {
    if (!painting.canvas) {
      setPainting((prev) => {
        return {
          canvas: getClearCanvas(window.innerWidth, window.innerHeight - 160),
          data: prev.data + 1,
        };
      });
    }
  }, []);

  const showPaintPage = () => setCurrPage("paint");
  const showMakeBrushPage = () => setCurrPage("makeBrush");

  const onBrushImgChange = (canvas) => {
    setBrushImgObj((prev) => {
      return { canvas: canvas, data: prev.data + 1 };
    });
  };

  const onMaskImgObjChange = (canvas) => {
    setMaskImgObj((prev) => {
      return { canvas: canvas, data: prev.data + 1 };
    });
  };

  const onPaintingUpdate = (canvas) => {
    setPainting((prev) => {
      return { canvas: canvas, data: prev.data + 1 };
    });
  };

  return (
    <Page>
      <main>
        {currPage === "paint" && (
          <PaintingCanvas
            painting={painting}
            onUpdate={onPaintingUpdate}
            brush={brush}
            showMakeBrushPage={showMakeBrushPage}
          />
        )}

        {currPage === "makeBrush" && (
          <BrushMaker
            brushImgObj={brushImgObj}
            onUpdate={onBrushImgChange}
            maskImgObj={maskImgObj}
            onMaskUpdate={onMaskImgObjChange}
            showPaintPage={showPaintPage}
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
