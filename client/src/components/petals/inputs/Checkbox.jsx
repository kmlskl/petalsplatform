import PropTypes from "prop-types";
import "./Checkbox.css";

const Checkbox = ({ onValueChange, checked, label, controllerIcons }) => {
  const rotationStyle = {
    transform: `rotate(${checked ? 45 : -45}deg)`,
    transition: "transform 0.3s ease-in-out",
  };

  const { trueIcon, falseIcon } = controllerIcons;

  return (
    <div className="checkbox-container">
      <div className="icons-container">
        <img className={`f-${label}`} src={falseIcon} alt="False Icon" />
        <img className={`t-${label}`} src={trueIcon} alt="True Icon" />
      </div>
      <div className="knob-container">
        <label
          className={label}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src="/images/knob.svg"
            alt="Checkbox"
            style={rotationStyle}
            className="checkbox-knob"
          />
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => {
              onValueChange(e.target.checked);
            }}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  controllerIcons: PropTypes.object.isRequired,
};

export default Checkbox;
