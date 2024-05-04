import PropTypes from "prop-types";
import styles from "./ArtworkCard.module.css";
import Drawing from "./petals/svg/Drawing";
import { useLocation } from "react-router-dom";

const ArtworkCard = ({ artworkId, layers, globals, owner }) => {
  // console.log("layers", layers);
  const viewBoxSize = 500;
  const location = useLocation();
  // console.log(artworkId);

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.svgPreview}>
          <Drawing
            artworkId={artworkId}
            layers={layers}
            globals={globals}
            viewBoxSize={viewBoxSize}
          />
        </div>
      </div>
      {location.pathname !== "/auth/profile" &&
        location.pathname !== `/artwork/${artworkId}` && (
          <p>
            <span>by </span>
            <span className={styles.bolditalic}>{owner.username}</span>
          </p>
        )}
    </article>
  );
};

ArtworkCard.propTypes = {
  // artwork: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  globals: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  artworkId: PropTypes.number,
};

export default ArtworkCard;
