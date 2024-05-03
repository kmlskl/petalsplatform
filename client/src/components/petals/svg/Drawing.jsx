import PropTypes from "prop-types";
import "./Drawing.css";
import Layers from "./Layers";

const Drawing = ({
  artworkId,
  layers,
  updateLayer,
  globals,
  updateGlobals,
  viewBoxSize,
}) => {
  console.log(artworkId);
  // svg object
  return (
    <svg
      className="petals"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      width={viewBoxSize}
      height={viewBoxSize}
      mask="url(#circleMask)"
    >
      <Layers
        artworkId={artworkId}
        layers={layers}
        updateLayer={updateLayer}
        globals={globals}
        updateGlobals={updateGlobals}
        viewBoxSize={viewBoxSize}
      />

      {/* drawing layers
      {layers
        .map((layer, i) => {
          const arrayScale = (i + 1) * 1;

          return (
            <g key={i}>
              <Layer
                viewBoxSize={viewBoxSize}
                layer={{
                  ...layer,
                  rotDir: i % 2 === 0 ? -layer.rotDir : layer.rotDir,
                }}
                scale={arrayScale}
                updateLayer={(id, changes) => updateLayer(id, changes)}
                globals={globals}
                updateGlobals={(id, changes) => updateGlobals(id, changes)}
              />
            </g>
          );
        })
        .reverse()} */}

      <mask id="circleMask">
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={viewBoxSize / 2}
          fill="#fff"
        />
      </mask>
    </svg>
  );
};

Drawing.propTypes = {
  layers: PropTypes.array.isRequired,
  updateLayer: PropTypes.func,
  globals: PropTypes.object.isRequired,
  updateGlobals: PropTypes.func,
  viewBoxSize: PropTypes.number.isRequired,
  artworkId: PropTypes.number,
};

export default Drawing;
