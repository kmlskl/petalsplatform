import PropTypes from "prop-types";
import "./ObjectControls.css";
import ObjectController from "./ObjectController";

const ObjectControls = ({
  artworkId,
  layers,
  updateLayer,
  globals,
  updateGlobals,
}) => {
  return (
    <div className="object-controls">
      {layers.map((layer, i) => (
        <ObjectController
          artworkId={artworkId}
          key={layer.id}
          i={i}
          layer={layer}
          globals={globals}
          updateLayer={(id, changes) => {
            updateLayer(id, changes);
          }}
          updateGlobals={(id, changes) => {
            updateGlobals(id, changes);
          }}
        />
      ))}
    </div>
  );
};

ObjectControls.propTypes = {
  layers: PropTypes.array.isRequired,
  updateLayer: PropTypes.func.isRequired,
  globals: PropTypes.object.isRequired,
  updateGlobals: PropTypes.func.isRequired,
  artworkId: PropTypes.number,
};

export default ObjectControls;
