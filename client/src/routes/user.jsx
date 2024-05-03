import { getUserById } from "../services/user";
import { Link, useLoaderData } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";

const loader = async ({ params }) => {
  const user = await getUserById(params.id);
  return { user };
};

const User = () => {
  const { user } = useLoaderData();

  const artworks = user.artworks;
  console.log("user", user);

  return (
    <>
      <h2>{user.username}</h2>
      <p>Artwork lover since {user.createdAt}</p>

      <section>
        <h3>Artworks</h3>
        <ul>
          {artworks.map((artwork) => (
            <li key={artwork.id}>
              <Link to={`/artwork/${artwork.id}`}>
                <ArtworkCard
                  layers={artwork.layers}
                  globals={artwork.globals}
                  owner={artwork.username}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

User.loader = loader;

export default User;
