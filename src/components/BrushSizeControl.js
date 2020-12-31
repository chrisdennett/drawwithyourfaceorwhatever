import React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

export const BrushSizeControl = ({ value, onChange }) => {
  const onIncrease = () => onChange(value + 1);
  const onDecrease = () => onChange(value - 1);

  return (
    <Holder>
      <button onClick={onDecrease}>DOWN</button>
      <StyledSlider
        value={value}
        onChange={onChange}
        renderTrack={Track}
        renderThumb={Thumb}
        min={5}
        max={500}
      />
      <button onClick={onIncrease}>UP</button>
    </Holder>
  );
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  min-width: 300px;
  height: 25px;
`;

const Holder = styled.div`
  /* display: flex; */
  position: relative;
  max-width: 400px;
  display: flex;
  /* align-items: center; */
`;

// THUMB
const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 45px;
  text-align: center;
  border: none;
  background-color: #000;
  color: #fff;
  border-radius: 1px;
  cursor: grab;
`;

// TRACK
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#ddd" : "red"};
  /* border-radius: 999px; */
`;
