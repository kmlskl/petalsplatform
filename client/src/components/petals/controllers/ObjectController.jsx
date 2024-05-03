import PropTypes from "prop-types";
import "./ObjectController.css";
import ColorPicker from "../inputs/ColorPicker";
import Slider from "../inputs/Slider";

const ObjectController = ({ artworkId, i, layer, updateLayer, globals }) => {
  const onLayerChange = (property, value) => {
    updateLayer(layer.id, { [property]: value });
  };

  const {
    color,
    objectSize,
    objectRepeat,
    arraySize,
    objectThickness,
    objectEdgeTop,
    objectEdgeBottom,
    numObjects,
    spike,
  } = layer;

  const fill = (color) => {
    const { h, s, l, a } = color;

    if (globals.isStroke && !globals.isFill) {
      return { h, s: 0, l: 100, a: 1 };
    }

    return { h, s, l, a };
  };

  const { h, s, l, a } = fill(color);

  const stroke = globals.isStroke ? "#000000" : "none";

  const controllerIcons = {
    objectSize: {
      bigIcon: "/images/sizeBig.svg",
      smallIcon: "/images/sizeSmall.svg",
    },
    objectRepeat: {
      bigIcon: "/images/repeatBig.svg",
      smallIcon: "/images/repeatSmall.svg",
    },
    arraySize: {
      bigIcon: "/images/arraySizeBig.svg",
      smallIcon: "/images/arraySizeSmall.svg",
    },
    objectThickness: {
      bigIcon: "/images/thicknessBig.svg",
      smallIcon: "/images/thicknessSmall.svg",
    },
    objectEdgeTop: {
      bigIcon: "/images/topBig.svg",
      smallIcon: "/images/topSmall.svg",
    },
    objectEdgeBottom: {
      bigIcon: "/images/bottomBig.svg",
      smallIcon: "/images/bottomSmall.svg",
    },
    numObjects: {
      bigIcon: "/images/numObjBig.svg",
      smallIcon: "/images/numObjSmall.svg",
    },
    spike: {
      bigIcon: "/images/spikeBig.svg",
      smallIcon: "/images/sizeSmall.svg",
    },
  };

  return (
    <>
      <div className="object-controller">
        <svg
          className={`petal-representation-${layer.id}`}
          viewBox={`0 0 120 120`}
          width="120"
          height="120"
          key={i}
        >
          <defs>
            <filter
              id={`drop-shadow-${layer.id}`}
              x="-50%"
              y="-50%"
              width="230%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
              <feFlood
                floodColor={`hsla(${h}, ${s}%, ${l}%, ${a})`}
                floodOpacity="0.3"
                result="offsetColor"
              />
              <feComposite
                in="offsetColor"
                in2="offsetBlur"
                operator="in"
                result="offsetBlur"
              />
              <feMerge>
                <feMergeNode in="offsetBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="object-blur"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1"
                result="blur"
              />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4" />
              </feComponentTransfer>
              <feColorMatrix type="saturate" values="2" />
            </filter>
          </defs>
          <use
            href={`#object-${layer.id}${artworkId ? `-${artworkId}` : ""}`}
            fill={`hsla(${h}, ${s}%, ${l}%, ${a - 0.2})`}
            fillOpacity={layer.fillOpacity}
            transform={` translate(60, 60) scale( ${
              objectSize * 2.4
            }) translate(-5, -5) `}
            filter={`url(#object-blur)`}
          />
          <use
            href={`#object-${layer.id}${artworkId ? `-${artworkId}` : ""}`}
            fill={`hsla(${h}, ${s}%, ${l}%, ${a})`}
            fillOpacity={layer.fillOpacity}
            transform={` translate(60, 60) scale( ${
              objectSize * 2.4
            }) translate(-5, -5) `}
            stroke={stroke}
            strokeWidth={globals.strokeWidth / (objectSize * 4.8)}
          />
        </svg>

        <ColorPicker
          color={color}
          onValueChange={(v) => onLayerChange("color", v)}
          globals={globals}
        />

        <Slider
          controllerIcons={controllerIcons.objectSize}
          min={1}
          max={3}
          step={0.1}
          label="objectSize"
          value={objectSize}
          onValueChange={(v) => onLayerChange("objectSize", v)}
        />
        <Slider
          controllerIcons={controllerIcons.objectRepeat}
          min={1}
          max={7}
          label="objectRepeat"
          value={objectRepeat}
          onValueChange={(v) => onLayerChange("objectRepeat", v)}
        />

        <Slider
          controllerIcons={controllerIcons.objectThickness}
          min={-1}
          max={1}
          step={0.1}
          label="objectThickness"
          value={objectThickness}
          onValueChange={(v) => onLayerChange("objectThickness", v)}
        />

        <Slider
          controllerIcons={controllerIcons.spike}
          min={0}
          max={3}
          step={0.1}
          label="spike"
          value={spike}
          onValueChange={(v) => onLayerChange("spike", v)}
        />

        <Slider
          controllerIcons={controllerIcons.objectEdgeTop}
          min={-2.76142}
          max={2.76142}
          step={0.1}
          label="objectEdgeTop"
          value={objectEdgeTop}
          onValueChange={(v) => onLayerChange("objectEdgeTop", v)}
        />
        <Slider
          controllerIcons={controllerIcons.objectEdgeBottom}
          min={-2.76142}
          max={2.76142}
          step={0.1}
          label="objectEdgeBottom"
          value={objectEdgeBottom}
          onValueChange={(v) => onLayerChange("objectEdgeBottom", v)}
        />
        <Slider
          controllerIcons={controllerIcons.arraySize}
          min={2 + i * 2}
          max={4 + i * 2}
          step={0.1}
          label="arraySize"
          value={arraySize}
          onValueChange={(v) => onLayerChange("arraySize", v)}
        />
        <Slider
          controllerIcons={controllerIcons.numObjects}
          min={3}
          max={13}
          label="numObjects"
          value={numObjects}
          onValueChange={(v) => onLayerChange("numObjects", v)}
        />
      </div>
    </>
  );
};

ObjectController.propTypes = {
  layer: PropTypes.object.isRequired,
  updateLayer: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  globals: PropTypes.object.isRequired,
  artworkId: PropTypes.number,
};

export default ObjectController;
