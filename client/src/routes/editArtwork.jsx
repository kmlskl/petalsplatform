import { Form, redirect, useLoaderData } from "react-router-dom";
import styles from "./createArtwork.module.css";
import { updateArtwork, getArtwork } from "../services/artwork";
import { getAuthData } from "../services/auth";
import PetalsApp from "../components/PetalsApp";
import useProps from "../components/Props";

const loader = async ({ request, params }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }
  const artwork = await getArtwork(params.id);
  return { artwork };
};

const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const layers = data.layers ? JSON.parse(data.layers) : null;
  const globals = data.globals ? JSON.parse(data.globals) : null;

  const payload = {
    globals: globals,
    layers: layers,
  };

  await updateArtwork(params.id, payload);
  return redirect(`/artwork/${params.id}`);
};

const EditArtwork = () => {
  const { artwork } = useLoaderData();

  const {
    layers,
    globals,
    mobileStyle,
    updateLayer,
    updateGlobals,
    changeLayerAmount,
  } = useProps({
    initialLayers: artwork.attributes.layers,
    initialGlobals: artwork.attributes.globals,
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

  return (
    <Form method="POST">
      <div className={styles.formGroup}>
        <input type="hidden" name="layers" value={serializedLayers} />
        <input type="hidden" name="globals" value={serializedGlobals} />

        <input
          type="submit"
          className={styles.submit}
          value="Save Changes to These Petals"
        />
      </div>
      <PetalsApp
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

EditArtwork.action = action;
EditArtwork.loader = loader;

export default EditArtwork;
