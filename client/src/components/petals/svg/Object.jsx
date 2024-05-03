import PropTypes from "prop-types";

const Object = ({ layer, id }) => {
  return (
    <path
      id={id}
      d={`
          M ${10 + layer.objectThickness} 5
          C ${10 + layer.objectThickness} 7.76142 ${
        7.76142 - layer.objectEdgeBottom
      } ${10 - layer.spike} 5 10
          C ${2.23858 + layer.objectEdgeBottom} ${10 - layer.spike} ${
        0 - layer.objectThickness
      } 7.76142 ${0 - layer.objectThickness} 5
          C ${0 - layer.objectThickness} 2.23858 ${
        2.23858 + layer.objectEdgeTop
      } ${layer.spike} 5 0
          C ${7.76142 - layer.objectEdgeTop}  ${layer.spike} ${
        10 + layer.objectThickness
      } 2.23858 ${10 + layer.objectThickness} 5.0
          Z`}
    />
  );
};

Object.propTypes = {
  id: PropTypes.string.isRequired,
  layer: PropTypes.object.isRequired,
  globals: PropTypes.object.isRequired,
};

export default Object;
