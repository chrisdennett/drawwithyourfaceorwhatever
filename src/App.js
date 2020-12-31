import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createBrushCanvas,
  createCanvasFromImage,
  getBlankCanvas,
  getTrimmedCanvas,
} from "./helpers/helpers";
import { BrushMaker } from "./pages/Brushmaker";
import { PaintingCanvas } from "./pages/PaintingCanvas";
import background from "./img/notebook-dark-bg.png";

const App = () => {
  const [currPage, setCurrPage] = useState("paint"); // "paint"/"makeBrush"
  const [brush, setBrush] = useState({ data: 0, canvas: null });
  const [brushImgObj, setBrushImgObj] = useState({ data: 0, canvas: null });
  const [maskImgObj, setMaskImgObj] = useState({ data: 0, canvas: null });
  const [painting, setPainting] = useState({ data: 0, canvas: null });
  const [paintBrushSize, setPaintBrushSize] = useState(80);
  const [maskBrushSize, setMaskBrushSize] = useState(30);

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

  // CREATE BRUSH CANVAS
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

  // DRAWING PAINTING TO SCREEN
  useEffect(() => {
    if (!painting.canvas) {
      setPainting((prev) => {
        return {
          canvas: getBlankCanvas(
            window.innerWidth - 60,
            window.innerHeight - 180
          ),
          data: prev.data + 1,
        };
      });
    }
  }, [painting.canvas]);

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

  const reducePaintBrushSize = () => setPaintBrushSize((prev) => prev - 1);
  const increasePaintBrushSize = () => setPaintBrushSize((prev) => prev + 1);
  const reduceMaskBrushSize = () => setMaskBrushSize((prev) => prev - 1);
  const increaseMaskBrushSize = () => setMaskBrushSize((prev) => prev + 1);

  return (
    <Page style={{ backgroundImage: `url(${background})` }}>
      <TopBar>
        <Tab onClick={showPaintPage} isSelected={currPage === "paint"}>
          paint-with-your-face-or-whatever
        </Tab>
        <Tab onClick={showMakeBrushPage} isSelected={currPage === "makeBrush"}>
          edit-brush-of-your-face-or-whatever
        </Tab>
      </TopBar>

      <main>
        {currPage === "paint" && (
          <PaintingCanvas
            reducePaintBrushSize={reducePaintBrushSize}
            increasePaintBrushSize={increasePaintBrushSize}
            painting={painting}
            onUpdate={onPaintingUpdate}
            brush={brush}
            showMakeBrushPage={showMakeBrushPage}
            brushSize={paintBrushSize}
            onBrushSizeChange={setPaintBrushSize}
          />
        )}

        {currPage === "makeBrush" && (
          <BrushMaker
            reduceMaskBrushSize={reduceMaskBrushSize}
            increaseMaskBrushSize={increaseMaskBrushSize}
            brushImgObj={brushImgObj}
            onUpdate={onBrushImgChange}
            maskImgObj={maskImgObj}
            onMaskUpdate={onMaskImgObjChange}
            showPaintPage={showPaintPage}
            brush={brush}
            maskBrushSize={maskBrushSize}
            onMaskBrushSizeChange={setMaskBrushSize}
          />
        )}
      </main>
    </Page>
  );
};

export default App;

const Page = styled.div`
  background: whitesmoke;
  min-height: 100vh;
`;

const TopBar = styled.div`
  height: 60px;
  display: flex;
`;

const Tab = styled.button`
  cursor: pointer;
  flex: 1;
  text-transform: uppercase;
  font-size: 130%;
  border: none;
  border-bottom: 1px solid #333;
  background: ${(props) => (props.isSelected ? "#333" : "whitesmoke")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  position: relative;
  border-radius: 0;
  outline: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  :after {
    display: ${(props) => (props.isSelected ? "block" : "none")};
    content: "";
    position: absolute;
    top: 58px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: 10px solid #333;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;
