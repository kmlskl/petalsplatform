import { Link, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { getAuthData, getMe } from "../../services/auth";
import ArtworkCard from "../../components/ArtworkCard";
import styles from "./profile.module.css";

const loader = async ({ request }) => {
  const { user } = getAuthData();
  if (!user) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }

  const profile = await getMe();
  return { profile };
};

const Profile = () => {
  const { profile } = useLoaderData();
  const fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;
  const artworks = profile.artworks;

  const handleSignOut = (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to sign out?")) {
      fetcher.submit(event.target, { method: "post", action: "/auth/logout" });
    }
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.ownerInfo}>
        Hi there, <span className={styles.bolditalic}>{profile.username}</span>
        ...
      </h2>
      <dl className={styles.myInfo}>
        <dt>Username</dt>
        <dd>{profile.username}</dd>
        <dt>Email</dt>
        <dd>{profile.email}</dd>
        <dt>Profile Actions</dt>
        <dd>
          <fetcher.Form
            method="post"
            action="/auth/logout"
            onSubmit={handleSignOut}
          >
            <button type="submit" disabled={isLoggingOut}>
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </fetcher.Form>
        </dd>
      </dl>
      <section>
        <h3>My artworks</h3>
        <ul className={` ${styles.list} `}>
          {artworks.map((artwork) => {
            // console.log(artwork.id, artwork.layers); // Add console log per artwork
            return (
              <li key={artwork.id}>
                <Link to={`/artwork/${artwork.id}`}>
                  <ArtworkCard
                    layers={artwork.layers}
                    globals={artwork.globals}
                    owner={profile}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

Profile.loader = loader;

export default Profile;
