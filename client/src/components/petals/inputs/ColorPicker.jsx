import "./ColorPicker.css";
import { HslaColorPicker } from "react-colorful";
import PropTypes from "prop-types";

const ColorPicker = ({ color, onValueChange, globals }) => {
  return (
    <div
      className="color_picker"
      style={{
        filter:
          globals.isFill || !globals.isStroke
            ? "none"
            : "saturate(0.5)  opacity(0.5) blur(10px)",
        pointerEvents: globals.isFill || !globals.isStroke ? "auto" : "none",
      }}
    >
      <HslaColorPicker color={color} onChange={(v) => onValueChange(v)} />
    </div>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.object.isRequired,
  onValueChange: PropTypes.func.isRequired,
  globals: PropTypes.object.isRequired,
};

export default ColorPicker;
