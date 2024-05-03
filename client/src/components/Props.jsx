import { useState } from "react";

function useProps({ initialLayers = [], initialGlobals = {} }) {
  const createLayer = (id) => {
    const arraySizeBv = 2 + (id - 1) * 2;
    const arraySizeTv = 4 + (id - 1) * 2;
    const spikeValue = Math.random() * 3;
    const numObjectsBv = 3;
    const numObjectsTv = 13;
    const objectEdgeTopBv = -2.76142;
    const objectEdgeTopTv = 2.76142;
    const objectEdgeBottomBv = -2.76142;
    const objectEdgeBottomTv = 2.76142;
    const objectSizeBv = 1;
    const objectSizeTv = 3;
    const objectRepeatBv = 1;
    const objectRepeatTv = 4;
    const objectThicknessBv = -1;
    const objectThicknessTv = 1;
    const repeatGapBv = 12;
    const repeatGapTv = 24;

    return {
      id: id,
      color: {
        h: Math.floor(Math.random() * 360),
        s: Math.floor(Math.random() * 101),
        l: Math.floor(Math.random() * 101),
        a: 1,
      },
      spike: spikeValue,
      numObjects:
        Math.floor(Math.random() * (numObjectsTv - numObjectsBv + 1)) +
        numObjectsBv,
      repeatGap:
        Math.floor(Math.random() * (repeatGapTv - repeatGapBv + 1)) +
        repeatGapBv,
      objectThickness:
        Math.random() * (objectThicknessTv - objectThicknessBv) +
        objectThicknessBv,
      objectEdgeTop:
        Math.random() * (objectEdgeTopTv - objectEdgeTopBv) + objectEdgeTopBv,
      objectEdgeBottom:
        Math.random() * (objectEdgeBottomTv - objectEdgeBottomBv) +
        objectEdgeBottomBv,
      objectSize:
        Math.floor(Math.random() * (objectSizeTv - objectSizeBv + 1)) +
        objectSizeBv,
      objectRepeat:
        Math.floor(Math.random() * (objectRepeatTv - objectRepeatBv + 1)) +
        objectRepeatBv,
      arraySize: Math.random() * (arraySizeTv - arraySizeBv) + arraySizeBv,
      rotDir: 360,
    };
  };

  const createMultipleLayers = (v) => {
    return Array.from({ length: v }, (_, index) => createLayer(index + 1));
  };

  const isMobile = window.innerWidth <= 768;

  // const darkModePref = window.matchMedia("(prefers-color-scheme: dark)");

  // const initialGlobals = {
  //   isFill: true,
  //   isMobile: isMobile,
  //   isStroke: Math.random() < 0.25,
  //   strokeWidth: Math.random() * (3 - 1 + 1) + 1,
  //   isAnimated: true,
  //   slowAnimation: true,
  //   viewBoxSize: 500,
  // };

  const initialLayerCount = 4;

  // const initialLayers = createMultipleLayers(initialLayerCount);

  if (initialLayers.length === 0) {
    initialLayers = createMultipleLayers(initialLayerCount);
  }

  const [globals, setGlobals] = useState(
    Object.keys(initialGlobals).length > 0
      ? initialGlobals
      : {
          isFill: true,
          isMobile: isMobile,
          isStroke: Math.random() < 0.25,
          strokeWidth: Math.random() * (3 - 1 + 1) + 1,
          isAnimated: true,
          slowAnimation: true,
          viewBoxSize: 500,
        }
  );

  const [layers, setLayers] = useState(
    initialLayers.length > 0
      ? initialLayers
      : createMultipleLayers(initialLayerCount)
  );

  const [allLayers, setAllLayers] = useState([...initialLayers]);

  const updateGlobals = (id, changes) => {
    setGlobals({ ...globals, ...changes });
  };

  const updateLayer = (id, changes) => {
    const updatedLayers = layers.map((layer) =>
      layer.id === id ? structuredClone({ ...layer, ...changes }) : layer
    );
    setLayers(updatedLayers);

    // Use structuredClone when updating allLayers as well
    setAllLayers((allLayers) => {
      const layerIndex = allLayers.findIndex((layer) => layer.id === id);
      if (layerIndex !== -1) {
        const updatedAllLayers = structuredClone(allLayers);
        updatedAllLayers[layerIndex] = {
          ...updatedAllLayers[layerIndex],
          ...changes,
        };
        return updatedAllLayers;
      } else {
        return allLayers;
      }
    });
  };

  const addLayers = (newLayerCount) => {
    setLayers((currentLayers) => {
      const newLayers = structuredClone(currentLayers);
      let newId =
        currentLayers.length > 0
          ? currentLayers[currentLayers.length - 1].id + 1
          : 1;
      for (let i = currentLayers.length; i < newLayerCount; i++) {
        const existingLayer = allLayers.find((layer) => layer.id === newId);
        if (!existingLayer) {
          const newLayer = createLayer(newId);
          newLayers.push(newLayer);
          setAllLayers((prevAllLayers) => [
            ...prevAllLayers,
            structuredClone(newLayer),
          ]);
        } else {
          newLayers.push(structuredClone(existingLayer));
        }
        newId++;
      }
      return newLayers;
    });
  };

  const removeLayers = (newLayerCount) => {
    setLayers((prevLayers) => prevLayers.slice(0, newLayerCount));
  };

  // const resetLayers = () => {
  //   const newInitialLayers = createMultipleLayers(initialLayerCount);
  //   setLayers(newInitialLayers);
  //   setAllLayers([...newInitialLayers]);
  // };

  const changeLayerAmount = (newLayerCount) => {
    if (newLayerCount > layers.length) {
      addLayers(newLayerCount);
    } else if (newLayerCount < layers.length) {
      removeLayers(newLayerCount);
    }
  };

  const mobileStyle = isMobile
    ? {
        transform: `scale(${globals.viewBoxSize / window.innerWidth / 2})`,
        width: `${globals.viewBoxSize}px`,
        height: `${globals.viewBoxSize}px`,
      }
    : {
        width: `${globals.viewBoxSize}px`,
        height: `${globals.viewBoxSize}px`,
      };

  return {
    layers,
    globals,
    mobileStyle,
    updateLayer,
    updateGlobals,
    changeLayerAmount,
  };
}

export default useProps;
