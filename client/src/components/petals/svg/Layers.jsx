import PropTypes from "prop-types";
import "./Drawing.css";
import Layer from "./Layer";

const Layers = ({
  artworkId,
  layers,
  updateLayer,
  globals,
  updateGlobals,
  viewBoxSize,
}) => {
  const viewBoxCenter = viewBoxSize / 2;

  // layers group, number of layers between 1 and 4 here
  // group transform: scales each layer, translate moves each layer to center, rotate helps start objects from top center
  // layer rotDir rotates each layer alternating

  return (
    <g className="layers">
      {layers
        .map((layer, i) => {
          const arrayScale = (i + 1) * 1;

          return (
            <g
              className={`layer-${i + 1}`}
              key={i}
              transform={`scale(${arrayScale})
              translate(${viewBoxCenter / arrayScale} ${
                viewBoxCenter / arrayScale
              }) rotate(90, 0 , 0)`}
            >
              <Layer
                artworkId={artworkId}
                viewBoxSize={viewBoxSize}
                layer={{
                  ...layer,
                  rotDir: i % 2 === 0 ? -layer.rotDir : layer.rotDir,
                }}
                updateLayer={(id, changes) => updateLayer(id, changes)}
                globals={globals}
                updateGlobals={(id, changes) => updateGlobals(id, changes)}
                scale={arrayScale}
              />
            </g>
          );
        })
        .reverse()}
    </g>
  );
};

Layers.propTypes = {
  layers: PropTypes.array.isRequired,
  updateLayer: PropTypes.func,
  globals: PropTypes.object.isRequired,
  updateGlobals: PropTypes.func,
  viewBoxSize: PropTypes.number.isRequired,
  artworkId: PropTypes.number,
};

export default Layers;
