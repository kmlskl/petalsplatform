import PropTypes from "prop-types";
import "./LayerArray.css";
import Object from "./Object";

const LayerArray = ({ layer, globals, scale }) => {
  const { id, objectRepeat, arraySize, objectSize, numObjects } = layer;
  const { h, s, l, a } = layer.color;
  const { isStroke, strokeWidth, isAnimated, slowAnimation, isFill } = globals;

  const objectCenter = 5;
  const effectiveDiameter = objectCenter * 2;
  const estimatedCircumference = numObjects * effectiveDiameter;
  const radius = estimatedCircumference / (2 * Math.PI);

  const objects = Array.from({ length: numObjects }).map((_, index) => {
    const angle = ((2 * Math.PI) / numObjects) * (index - 1);
    const rotation = angle * (180 / Math.PI);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, rotation };
  });

  const arrayScaleAdjustment = scale;
  const stroke = isStroke ? "#000000" : "none";

  // const animate = isAnimated ? layer.rotDir : 0;

  const animationName =
    layer.id % 2 === 1 ? "rotateLayer" : "rotateLayerReverse";

  const animationSpeed = slowAnimation ? "50" : "10";

  const animationStyle = isAnimated
    ? { animation: `${animationName} ${animationSpeed}s infinite linear` }
    : {};

  return (
    <g className="layer" style={animationStyle}>
      <defs>
        <Object
          id={`object-${id}`}
          layer={layer}
          // updateLayer={(id, changes) => updateLayer(id, changes)}
          globals={globals}
          // updateGlobals={(id, changes) => updateGlobals(id, changes)}
        />
      </defs>
      {/* <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0"
        to={`${animate}`}
        dur={`${animationSpeed}`}
        repeatCount="indefinite"
      /> */}
      {Array.from({ length: objectRepeat })
        .map((_, i) => {
          //  0.1 values here affects the scale and of the gap between the objects together, how did it even came about idk
          const scale = (i + 2) * 0.08 * arraySize + 0.7;
          const transparency = i * 0.1 + 0.26;
          const fillOpacity = isStroke ? 1 : 1 - transparency;
          const lightness =
            l - transparency * 20 < 0
              ? 0 + transparency * 20
              : l - transparency * 20;

          const strokeValue = isStroke ? strokeWidth / arrayScaleAdjustment : 0;

          // if fill is unchecked > only affects when stroke is checked, otherwise white transparent stuff looks off
          const fill =
            !isFill && isStroke
              ? "#FFFFFF"
              : isFill
              ? `hsla(${h}, ${s}%, ${lightness}%, ${a})`
              : `hsla(${h}, ${s}%, ${l}%, ${a})`;

          if (isStroke) {
            // Render with stroke
            return (
              <g key={`group-${i}`} className="repeat-array">
                <g>
                  {objects.map((object, objectIndex) => (
                    <g
                      className="scale-group-stroke"
                      key={`${i}-${objectIndex}`}
                      transform={`scale(${scale})`}
                    >
                      {/* stroke */}
                      <use
                        href={`#object-${layer.id}`}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokeValue / scale / objectSize}
                        transform={`translate(${object.x}, ${
                          object.y
                        }) rotate(${
                          object.rotation + 90
                        }, 0 ,0)  scale(${objectSize}) translate(-${objectCenter},-${objectCenter})`}
                      />
                    </g>
                  ))}
                </g>
                <g>
                  {objects.map((object, objectIndex) => (
                    <g
                      className="scale-group-fill"
                      key={`${i}-${objectIndex}`}
                      transform={`scale(${scale})`}
                    >
                      {/* object */}
                      <use
                        href={`#object-${layer.id}`}
                        fill={fill}
                        fillOpacity={fillOpacity}
                        transform={`translate(${object.x}, ${
                          object.y
                        }) rotate(${
                          object.rotation + 90
                        }, 0 ,0)  scale(${objectSize}) translate(-${objectCenter},-${objectCenter})`}
                      />
                    </g>
                  ))}
                </g>
              </g>
            );
          } else {
            // Render normally without stroke
            return (
              <g key={`group-${i}`} className="repeat-array">
                {objects.map((object, objectIndex) => (
                  <g key={`${i}-${objectIndex}`} transform={`scale(${scale})`}>
                    {/* object */}
                    <use
                      href={`#object-${layer.id}`}
                      fill={fill}
                      fillOpacity={fillOpacity}
                      transform={`translate(${object.x}, ${object.y}) rotate(${
                        object.rotation + 90
                      }, 0 ,0)  scale(${objectSize}) translate(-${objectCenter},-${objectCenter})`}
                    />
                  </g>
                ))}
              </g>
            );
          }
        })
        .reverse()}
    </g>
  );
};

// apparently in svg, transform are read from right to left, great.

LayerArray.propTypes = {
  layer: PropTypes.object.isRequired,
  globals: PropTypes.object.isRequired,
  scale: PropTypes.number.isRequired,
};

export default LayerArray;
