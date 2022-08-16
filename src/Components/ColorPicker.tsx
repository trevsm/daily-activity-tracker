import styled from "styled-components";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const StyledLabel = styled.label`
  pointer-events: all;
  width: 35px;
  height: 35px;

  position: absolute;
  left: 5px;
  bottom: 4px;

  margin-right: 10px;
  border-radius: 100%;
  display: block;
  padding: 3px;
  background-color: white;
  .inner,
  input {
    pointer-events: none;
  }
  input {
    opacity: 0;
  }
  .inner {
    height: 100%;
    border-radius: 100%;
  }
  input {
    font-size: 20px;
    border: 1px solid #e4e4e4;
    color: #434343;
    &:focus-visible {
      outline: none;
    }
  }
`;

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <StyledLabel className="color">
      <div style={{ background: value }} className="inner">
        <input
          type="color"
          list="presets"
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <datalist id="presets">
          <option value="#9e9e9e">Light-Grey</option>
          <option value="#333333">Dark-Grey</option>
          <option value="#5b6bff">Blue</option>
          <option value="#c876ff">Purple</option>
          <option value="#ff76a4">Red-Purple</option>
          <option value="#ff755d">Red</option>
          <option value="#ffaf5f">Orange</option>
          <option value="#fffa5d">Yellow</option>
          <option value="#c4ff5d">Yellow-Green</option>
          <option value="#5dff83">Green</option>
          <option value="#5dffd4">Green-Blue</option>
        </datalist>
      </div>
    </StyledLabel>
  );
}
