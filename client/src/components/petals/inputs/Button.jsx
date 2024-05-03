import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ label, onClick, saveTypeImg }) => {
  return (
    <button type="button" className="button" onClick={onClick}>
      <img className={`${label}`} src={saveTypeImg} alt="False Icon" />
      <span className="hidden">{label}</span>
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  saveTypeImg: PropTypes.string.isRequired,
  globals: PropTypes.object.isRequired,
};

export default Button;
