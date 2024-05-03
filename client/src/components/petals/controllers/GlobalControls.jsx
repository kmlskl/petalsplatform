import PropTypes from "prop-types";
import "./GlobalControls.css";
import Checkbox from "../inputs/Checkbox";
import Slider from "../inputs/Slider";
import Button from "../inputs/Button";

const GlobalControls = ({
  layers,
  globals,
  updateGlobals,
  changeLayerAmount,
}) => {
  const onGlobalChange = (property, value) => {
    updateGlobals(globals.id, { [property]: value });
  };

  const onSaveSvg = () => {
    const svg = document.querySelector(".petals");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const onSavePng = () => {
    const svg = document.querySelector(".petals");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const viewBox = svg.getAttribute("width");
    const viewBoxWidth = parseFloat(viewBox);
    const viewBoxHeight = parseFloat(viewBox);
    canvas.width = viewBoxWidth * 4;
    canvas.height = viewBoxHeight * 4;
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, viewBoxWidth * 4, viewBoxHeight * 4);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "image.png";
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const { length } = layers;
  const {
    isDarkMode,
    slowAnimation,
    isStroke,
    strokeWidth,
    isFill,
    isAnimated,
  } = globals;

  const controllerIcons = {
    isStroke: {
      trueIcon: "/images/strokeTrue.svg",
      falseIcon: "/images/strokeFalse.svg",
    },
    isFill: {
      trueIcon: "/images/fillTrue.svg",
      falseIcon: "/images/fillFalse.svg",
    },
    isAnimated: {
      trueIcon: "/images/animate.svg",
      falseIcon: "/images/animate.svg",
    },
    slowAnimation: {
      trueIcon: "/images/slowTrue.svg",
      falseIcon: "/images/slowFalse.svg",
    },

    strokeWidth: {
      bigIcon: "/images/strokeBig.svg",
      smallIcon: "/images/strokeSmall.svg",
    },
    numberOfLayers: {
      bigIcon: "/images/numLayersBig.svg",
      smallIcon: "/images/numLayersSmall.svg",
    },

    save: {
      svgIcon: "/images/saveSvg.svg",
      pngIcon: "/images/savePng.svg",
    },

    saveLight: {
      svgIcon: "/images/saveSvgLight.svg",
      pngIcon: "/images/savePngLight.svg",
    },

    isDarkMode: {
      trueIcon: "/images/darkModeTrue.svg",
      falseIcon: "/images/darkModeFalse.svg",
    },
  };

  return (
    <>
      <div className="sliders-container">
        {/* <div className="global-controller dark-mode">
          <Checkbox
            controllerIcons={controllerIcons.isDarkMode}
            label="darkMode"
            checked={isDarkMode}
            onValueChange={(v) => onGlobalChange("isDarkMode", v)}
          />
        </div> */}

        <div>
          <div className="global-controller">
            <Slider
              controllerIcons={controllerIcons.numberOfLayers}
              label="numLayers"
              min={1}
              max={4}
              step={1}
              value={length}
              onValueChange={(v) => changeLayerAmount(v)}
            />
            {isStroke && (
              <Slider
                controllerIcons={controllerIcons.strokeWidth}
                min={1}
                max={3}
                step={0.1}
                label="strokeWidth"
                value={strokeWidth}
                onValueChange={(v) => onGlobalChange("strokeWidth", v)}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div className="rightside"> */}
      <div className="knobs-container">
        <div>
          <div className="global-controller">
            <Checkbox
              controllerIcons={controllerIcons.isStroke}
              label="Stroke"
              checked={isStroke}
              onValueChange={(v) => onGlobalChange("isStroke", v)}
            />
          </div>

          {isStroke && (
            <div className="global-controller">
              <Checkbox
                controllerIcons={controllerIcons.isFill}
                label="Fill"
                checked={isFill}
                onValueChange={(v) => onGlobalChange("isFill", v)}
              />
            </div>
          )}
          <div className="global-controller">
            <Checkbox
              controllerIcons={controllerIcons.isAnimated}
              label="animate"
              checked={isAnimated}
              onValueChange={(v) => onGlobalChange("isAnimated", v)}
            />
          </div>

          {isAnimated && (
            <div className="global-controller">
              <Checkbox
                controllerIcons={controllerIcons.slowAnimation}
                label="Slow Animation"
                checked={slowAnimation}
                onValueChange={(v) => onGlobalChange("slowAnimation", v)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="buttons-container">
        <div className="save-buttons">
          <Button
            label="save-svg"
            saveTypeImg={
              isDarkMode
                ? controllerIcons.save.svgIcon
                : controllerIcons.save.svgIcon
            }
            globals={globals}
            onClick={(v) => onSaveSvg(v)}
          />
          <Button
            label="save-png"
            saveTypeImg={
              isDarkMode
                ? controllerIcons.save.pngIcon
                : controllerIcons.save.pngIcon
            }
            globals={globals}
            onClick={(v) => onSavePng(v)}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

GlobalControls.propTypes = {
  layers: PropTypes.array.isRequired,
  globals: PropTypes.object.isRequired,
  updateGlobals: PropTypes.func.isRequired,
  changeLayerAmount: PropTypes.func.isRequired,
};

export default GlobalControls;
