import { useRouteLoaderData, Link, useLocation } from "react-router-dom";
import styles from "./Hero.module.css";
import { HiOutlineUserCircle } from "react-icons/hi2";

const AuthStatus = () => {
  let { user } = useRouteLoaderData("root");

  const location = useLocation();
  const { pathname } = location;

  const shouldExcludeButton =
    pathname.startsWith("/artwork/") &&
    (pathname.endsWith("/create") || pathname.endsWith("/edit"));

  return (
    <div className={styles.btnWrapper}>
      {user ? (
        <>
          {!shouldExcludeButton ? (
            <Link className={styles.button} to="/artwork/create">
              Create Your Own Petals
            </Link>
          ) : null}
          <Link className={styles.iconButton} to="/auth/profile">
            <HiOutlineUserCircle />
          </Link>
        </>
      ) : (
        <Link className={styles.button} to="/auth/login">
          Sign in
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;
