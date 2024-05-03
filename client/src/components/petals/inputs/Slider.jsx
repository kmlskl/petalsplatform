import PropTypes from "prop-types";
import "./Slider.css";

const Slider = ({
  onValueChange,
  value,
  max,
  min = 0,
  step,
  label,
  controllerIcons,
}) => {
  const bigIcon = controllerIcons.bigIcon;
  const smallIcon = controllerIcons.smallIcon;

  return (
    <div className={`slider-container slider-container-${label}`}>
      <img className={`small-${label}`} src={smallIcon} alt="Small Icon" />
      <label>
        <div className="hidden">{label}</div>
        <div className="input-container">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onValueChange(parseFloat(e.target.value))}
          />
        </div>
      </label>
      <img className={`big-${label}`} src={bigIcon} alt="Big Icon" />
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number,
  label: PropTypes.string.isRequired,
  controllerIcons: PropTypes.object.isRequired,
};

export default Slider;
