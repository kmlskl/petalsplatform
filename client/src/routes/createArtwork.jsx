import { Form, redirect } from "react-router-dom";
import styles from "./createArtwork.module.css";
import { createArtwork } from "../services/artwork";
import { getAuthData } from "../services/auth";
import PetalsApp from "../components/PetalsApp";
import useProps from "../components/Props";
import PropTypes from "prop-types";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  return null;
};

const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const layers = data.layers ? JSON.parse(data.layers) : null;
  const globals = data.globals ? JSON.parse(data.globals) : null;

  const payload = {
    globals: globals,
    layers: layers,
  };

  const response = await createArtwork(payload);
  const artworkId = response.data.id;
  return redirect(`/artwork/${artworkId}`);
};

const CreateArtwork = ({ artwork }) => {
  const {
    layers,
    globals,
    mobileStyle,
    updateLayer,
    updateGlobals,
    changeLayerAmount,
  } = useProps({
    initialLayers: [],
    initialGlobals: {},
  });

  const globalsForBackend = {
    isFill: globals.isFill,
    isStroke: globals.isStroke,
    strokeWidth: globals.strokeWidth,
    isAnimated: globals.isAnimated,
    slowAnimation: globals.slowAnimation,
    isMobile: globals.isMobile,
    viewBoxSize: globals.viewBoxSize,
  };

  const layersForBackend = layers.map((layer) => ({
    id: layer.id,
    color: {
      h: layer.color.h,
      s: layer.color.s,
      l: layer.color.l,
      a: layer.color.a,
    },
    spike: layer.spike,
    numObjects: layer.numObjects,
    repeatGap: layer.repeatGap,
    objectThickness: layer.objectThickness,
    objectEdgeTop: layer.objectEdgeTop,
    objectEdgeBottom: layer.objectEdgeBottom,
    objectSize: layer.objectSize,
    objectRepeat: layer.objectRepeat,
    arraySize: layer.arraySize,
    rotDir: layer.rotDir,
  }));

  const serializedLayers = JSON.stringify(layersForBackend);
  const serializedGlobals = JSON.stringify(globalsForBackend);

  const artworkId = artwork ? artwork.id : null;

  return (
    <Form method="POST">
      <div className={styles.formGroup}>
        <input type="hidden" name="layers" value={serializedLayers} />
        <input type="hidden" name="globals" value={serializedGlobals} />

        <input
          type="submit"
          className={styles.submit}
          value="Save To Your Profile"
        />
      </div>
      <PetalsApp
        artworkId={artworkId}
        layers={layers}
        globals={globals}
        mobileStyle={mobileStyle}
        updateLayer={updateLayer}
        updateGlobals={updateGlobals}
        changeLayerAmount={changeLayerAmount}
      />
    </Form>
  );
};

CreateArtwork.action = action;
CreateArtwork.loader = loader;

CreateArtwork.propTypes = {
  artwork: PropTypes.object,
};

export default CreateArtwork;
