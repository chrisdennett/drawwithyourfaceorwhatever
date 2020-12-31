import React from "react";
import { ImArrowDown2, ImArrowUp2 } from "react-icons/im";
import ReactSlider from "react-slider";
import styled from "styled-components";

export const BrushSizeControl = ({ value, onChange }) => {
  const onIncrease = () => onChange(value + 1);
  const onDecrease = () => onChange(value - 1);

  return (
    <Outer>
      <h3>BRUSH SIZE: </h3>
      <Holder>
        <button onClick={onDecrease}>
          <ImArrowDown2 />
        </button>
        <StyledSlider
          value={value}
          onChange={onChange}
          renderTrack={Track}
          renderThumb={Thumb}
          min={5}
          max={500}
        />
        <button onClick={onIncrease}>
          <ImArrowUp2 />
        </button>
      </Holder>
    </Outer>
  );
};

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  min-width: 300px;
  height: 25px;
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 5px 0;
    text-align: center;
  }

  button {
    margin: 0 5px;
    padding: 10px;
    background: #498e38;
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  }
`;

const Holder = styled.div`
  /* display: flex; */
  position: relative;
  max-width: 400px;
  display: flex;
  align-items: center;
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
  padding: 10px;
  margin-top: -10px;
  border-radius: 10px;
  cursor: grab;
`;

// TRACK
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${(props) =>
    props.index === 2 ? "#f00" : props.index === 1 ? "#ddd" : "#ddd"};
`;
