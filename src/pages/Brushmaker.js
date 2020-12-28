import React from "react";
import styled from "styled-components";
import { MaskMaker } from "../components/MaskMaker";
import { BrushPreview } from "../components/BrushPreview";
import PhotoSelector from "../components/PhotoSelector";

export const BrushMaker = ({
  showPaintPage,
  brush,
  setBrush,
  setSourceImg,
  sourceImg,
  maskImg,
  setMaskImg,
}) => {
  const clearMask = () => setMaskImg(null);

  return (
    <Page>
      <TopBar>
        <h1>Makeabrushfromyourfaceorwhatever...</h1>
        <button onClick={showPaintPage}>GetPainting</button>
        <button onClick={clearMask}>Clear</button>
        <PhotoSelector onPhotoSelected={setSourceImg} />
      </TopBar>
      <MaskMaker
        setBrush={setBrush}
        sourceImg={sourceImg}
        maskImg={maskImg}
        setMaskImg={setMaskImg}
      />
      {brush && <BrushPreview brushCanvas={brush} />}
    </Page>
  );
};

const Page = styled.div`
  background: whitesmoke;
`;

const TopBar = styled.div`
  height: 160px;
  padding: 10px;
`;
