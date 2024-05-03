import "./PetalsApp.css";
import PropTypes from "prop-types";
import Drawing from "./petals/svg/Drawing";
import ObjectControls from "./petals/controllers/ObjectControls";
import GlobalControls from "./petals/controllers/GlobalControls";

const PetalsApp = ({
  artworkId,
  layers,
  globals,
  mobileStyle,
  updateLayer,
  updateGlobals,
  changeLayerAmount,
}) => {
  const viewBoxSize = 500;
  return (
    <>
      <div className="texture-background"></div>
      <div className="app">
        <div className="body-container">
          <div className="blur-container"></div>
          <div className="drawing-container">
            <div className="anim-wrapper">
              <div className="scale-wrapper" style={mobileStyle}>
                <Drawing
                  artworkId={artworkId}
                  layers={layers}
                  updateLayer={updateLayer}
                  globals={globals}
                  updateGlobals={updateGlobals}
                  viewBoxSize={viewBoxSize}
                />
              </div>
            </div>
          </div>

          <ObjectControls
            artworkId={artworkId}
            layers={layers}
            updateLayer={updateLayer}
            globals={globals}
            updateGlobals={updateGlobals}
          />

          <GlobalControls
            layers={layers}
            globals={globals}
            updateGlobals={updateGlobals}
            changeLayerAmount={changeLayerAmount}
          />
          <div className="footer">
            <p>2024 - kemal</p>
          </div>
        </div>
      </div>
    </>
  );
};

PetalsApp.propTypes = {
  layers: PropTypes.array,
  globals: PropTypes.object,
  mobileStyle: PropTypes.object,
  updateLayer: PropTypes.func,
  updateGlobals: PropTypes.func,
  changeLayerAmount: PropTypes.func,
  artworkId: PropTypes.number,
};

export default PetalsApp;
