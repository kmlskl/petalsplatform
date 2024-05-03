import { getArtwork, deleteArtwork } from "../services/artwork";
import { getAuthData } from "../services/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import styles from "./artworkDetail.module.css";

const loader = async ({ params }) => {
  const id = params.id;
  const artwork = await getArtwork(id);
  return { artwork };
};

const ArtworkDetail = () => {
  const { artwork } = useLoaderData();
  const { user } = getAuthData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await deleteArtwork(artwork.id);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete artwork", error);
      }
    }
  };

  const isOwner = user && user.id === artwork.owner.data.id;

  return (
    <div>
      <h2 className={styles.ownerInfo}>
        {isOwner ? (
          <span>
            These petals were created by{" "}
            <span className={styles.bolditalic}>you</span>
          </span>
        ) : (
          <span>
            Petals by{" "}
            <span className={styles.bolditalic}>
              {artwork.owner &&
                artwork.owner.data &&
                artwork.owner.data.attributes.username}
            </span>
          </span>
        )}
      </h2>
      <div className={styles.detailContainer}>
        {" "}
        <div className={styles.info}>
          <div className={styles.artwork}>
            <ArtworkCard
              artworkId={artwork.id}
              layers={artwork.attributes.layers}
              globals={artwork.attributes.globals}
              owner={artwork.owner.data.attributes}
            />
          </div>

          {/* <dl>
          <dt>Creator</dt>
          <dd>
            {artwork.owner.data && artwork.owner.data.attributes.username}
          </dd>
        </dl> */}
        </div>
        {isOwner ? (
          <div className={styles.buttons}>
            <a href={`/artwork/${artwork.id}/edit`}>
              <button className={styles.editButton}>Edit</button>
            </a>
            <button onClick={handleDelete} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ) : (
          <a href={`/artwork/${artwork.id}/create`}>
            <button className={styles.editButton}>
              Create New Petals From This
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

ArtworkDetail.loader = loader;

export default ArtworkDetail;
